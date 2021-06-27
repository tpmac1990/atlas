from django.contrib.gis.geos import Polygon, Point, MultiPolygon
from django.contrib.gis.db.models import Extent, Union
from .load_functions import getJSON
# from gp.serializers import TitleBriefSerializer, SiteBriefSerializer ??? circular import. needs fix
# from .get_popup_data import getSerializedCoreData
import functools 
from django.db.models import Q
import json
import datetime
import os
from django.apps import apps
from gp.models import OccStatus, OccType, OccSize, GeologicalProvince, Material, TenStatus, TenType, Holder
# OccOriginalID, TenOriginalID, OccName
import time

def time_past(start,end):
    hours, rem = divmod(end-start, 3600)
    minutes, seconds = divmod(rem, 60)
    return "{:0>2}:{:0>2}:{:05.2f}".format(int(hours),int(minutes),seconds)

def run_filter_query(dataname,filtertype,dataset,dic,filterSelectionDic):
    ''' filters the given dataset, either title or site, for each of the selected values in the filter.
        count: the number of fields filtered for
        filterSelectionDic: dictionary holding all the values to filter for
     '''
    count = 0
    for val in filterSelectionDic:
        if val in dic.keys() and dataname in dic[val]['dataset'] and filtertype in dic[val]['use']:
            queryValue = getQueryValue(val, filterSelectionDic)
            if queryValue != None:
                count += 1
                queryString = dic[val]['query']
                dataset = dataset.filter(**{queryString: queryValue})
    # if dataset.count() > 0:
    #     dataset = dataset.order_by('ind')
    return {'data': dataset, 'count': count}


# Queries the db and returns a list of all the remaining options. Generally used for the checkbox options in the filter
def getDataList(p,datasets):

    # configs = getJSON(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),"configs","model_query_configs.json"))
    configs = getJSON("gp/configs/model_query_configs.json")

    qs = datasets['relDataset'] if p['relatedFilterOpen'] else datasets['priDataset']
    
    # If name ends with related, then it needs to query the related dataset and therefore lookup the related model & query in the configs file.
    name = p['name']
    if name.endswith("related"):
        lookup_name = name.replace("related","") # remove "related" from the name to get the correct key to lookup
        query_group = configs[p['relDatasetName']][lookup_name]
    else:
        lookup_name = name
        query_group = configs[p['priDatasetName']][lookup_name]

    model = apps.get_model('gp', query_group['model'])
    query = query_group['query']
    values = tuple(query_group['values'])
    order_by = query_group['order_by']

    # get the list of values which will be displayed as checkboxes in the filter on the frontend.
    # objs = model.objects.filter(**{query: qs}).distinct().order_by(order_by)

    objs = model.objects.filter(**{query: qs})

    objs = objs.filter(**{'%s__icontains'%(order_by): p['filter']})

    objs = objs.distinct().order_by(order_by)
    has_more = is_there_more_data(objs,p['limit'])
    objs = infinite_filter(objs,p['limit'],p['offset'])
    vals = list(objs.values_list(*values))

    if len(values) == 1:
        vals = [[x[0],x[0]] for x in vals]

    data = { 'data': vals, 'has_more': has_more }

    return data


def getTableData(request):
    ''' get the data for the table. This manages the global filter, column filters, sorting and the infinity scroll '''

    ind_lst = request.GET.get('ind_lst').split(',')
    datagroup = request.GET.get('datagroup')
    offset = request.GET.get('offset')
    limit = request.GET.get('limit')
    globalfilter = request.GET.get('globalfilter')
    colfilters = json.loads(request.GET.get('colfilters'))

    sortfield = request.GET.get('field')
    asc = True if request.GET.get('asc') == 'true' else False

    # query strings used for the global filter
    searchable_fields = {
        'Tenement': ['ind','oid__code','lodgedate','startdate','enddate','state__name','govregion__name','geoprovince__name','shore__name',
                    'majmat__name','minmat__name','typ__fname','typ__simple__name','status__original','status__simple__name',
                    'holder__name','holder__child_parent__name__name'],
        'Occurrence': ['ind','oid__code','status__original','size__name','state__name','govregion__name','geoprovince__name','name__name',
                    'typ__original','typ__simple__name','status__original','status__simple__name','majmat__name','minmat__name']
    }

    model = apps.get_model('gp', datagroup)

    objs = model.objects.filter(ind__in=ind_lst)

    # column filter
    for key in colfilters:
        if colfilters[key] != '':
            objs = objs.filter(**{"%s__icontains"%(key): colfilters[key]})

    # global filter
    if globalfilter != '':
        query_q = Q()
        for field in searchable_fields[datagroup]:
            query_q |= Q(**{"%s__icontains"%(field): globalfilter})
        objs = objs.filter(query_q)
    
    # sorting
    if sortfield != '':
        search = sortfield if asc else "-%s"%(sortfield)
        objs = objs.order_by(search)

    has_more = is_there_more_data(objs,int(limit))
    objs = infinite_filter(objs,limit,offset)

    return (objs, has_more)



def infinite_filter(objs,limit,offset):
    return objs[int(offset): int(offset) + int(limit)]

def is_there_more_data(objs,offset):
    if offset > objs[0:offset].count():
        return False
    return True


def createBuffer(lat,lng,radius):
    return Point(lng, lat).buffer(int(radius) / 40000 * 360)


def getQueryValue(val, filterSelectionDic):
    fsdv = filterSelectionDic[val]
    if val == 'rectangle':
        if fsdv['NELng'] != '':
            coords = fsdv
            return Polygon.from_bbox((coords['SWLng'], coords['SWLat'], coords['NELng'], coords['NELat']))
    elif val == 'buffer':
        if fsdv['valid']:
            return createBuffer(fsdv['Lat'],fsdv['Lng'],fsdv['radius'])
    elif val in ['lodgefromdate', 'lodgetodate', 'startfromdate', 'starttodate', 'endfromdate', 'endtodate']:
        if fsdv != '':
            ds = fsdv.split('-')
            return datetime.date(int(ds[0]),int(ds[1]),int(ds[2]))
    else:
        if len(fsdv) != 0:
            return fsdv
    return None


def filter_data_map(p):
    ''' Filters the selected dataset, either 'Tenement' or 'Occurrence' for the options selected in the frontend filter '''

    configs = getJSON(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),"configs","dataset_query_configs.json"))
    filterSelectionDic = p['filterSelectionDic']

    # filters the primary dataset for all options selected in the filter. 
    priDataset = run_filter_query(p['priDatasetName'],'primary',p['priDataset'],configs,filterSelectionDic)
    # print(priDataset)
    # slice the data to limit the data returned. only for the spatial query.
    total_count = priDataset['data'].count()
    priDataset['data'] = infinite_filter(priDataset['data'],p['limit'],p['offset'])
    has_more = is_there_more_data(priDataset['data'],p['limit'])

    # if p['append_to'] == 'related':
    #     # print(p['prioffset'])
    #     priDataset['data'] = priDataset['data'][0: int(p['prioffset'])]
    #     pri_has_more = True
    # else:
    #     priDataset['data'] = infinite_filter(priDataset['data'],p['prilimit'],p['prioffset'])
    #     pri_has_more = is_there_more_data(priDataset['data'],p['prilimit'])

    # print(priDataset['data'])
    # p['isSpatialQuery']: if true then the aim is to return the spatial model to plot of the map
    # priDataset['count']: counts the number of features(rows) in the primary dataset. Not used here as even if there are 0 filters applied in the primary
    #       dataset, I still want to show the related data if selected 
    # p['relatedFilterOpen']): true if the related filter is open in the filter.
    # p['includeRelatedData']: has the box been checked in the filter to include the related data in the search.
    # p['append_to'] != 'related': only looking to add the next offset to the primary dataset or looking for all the data.
    # if (((p['isSpatialQuery'] and priDataset['count']>0) or p['relatedFilterOpen']) and p['includeRelatedData']):
    if ((p['isSpatialQuery'] or p['relatedFilterOpen']) and p['includeRelatedData']):
        # relDataset = p['relDataset'].filter(functools.reduce(lambda x, y: x | y, [Q(**{p['geomQuery']: getattr(geom, p['geomField'])}) for geom in priDataset['data']]))
        relDataset = p['relDataset'].filter(**{p['geomQuery']: priDataset['data']}).distinct()        
        relDataset = run_filter_query(p['relDatasetName'],'related',relDataset,configs,filterSelectionDic)
        # rel_total_count = relDataset['data'].count()

        # relDataset['data'] = infinite_filter(relDataset['data'],p['rellimit'],p['reloffset'])
        # rel_has_more = is_there_more_data(relDataset['data'],p['rellimit'])
    else:
        # if priDataset['count'] == 0: # dropped this as it resulted in an error when nothing except the datagroup were filtered for
        #     priDataset = {'data': {}}
        #     total_count = 0
        #     has_more = False
        relDataset = {'data': {}}
        # rel_total_count = 0

    # # clear the data that isn't required for adding data
    # if p['append_to'] == 'related':
    #     priDataset['data'] = {}
    # elif p['append_to'] == 'primary':
    #     relDataset['data'] = {}

    # not all the related point data is being accessed. it could be something to do with the related offset changing when it isn't supposed to.
    data = {
        'priDataset': priDataset['data'], 
        'relDataset': relDataset['data'], 
        'totalCount': total_count,
        'hasMore': has_more,
        }

    return data


def filter_data_checkbox_list(p):

    configs = getJSON(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),"configs","dataset_query_configs.json"))
    filterSelectionDic = p['filterSelectionDic']

    if not p['isSpatialQuery']:
        del filterSelectionDic[p['name']] # delete the key value pair. 

    # filters the primary dataset for all options selected in the filter. 
    priDataset = run_filter_query(p['priDatasetName'],'primary',p['priDataset'],configs,filterSelectionDic)

    # slice the data to limit the data returned. only for the spatial query.
    if p['isSpatialQuery']:
        pri_total_count = priDataset['data'].count()
        pri_has_more = is_there_more_data(priDataset['data'],p['limit'])
        priDataset['data'] = infinite_filter(priDataset['data'],p['limit'],p['offset'])

    # p['isSpatialQuery']: if true then the aim is to return the spatial model to plot of the map
    # priDataset['count']: counts the number of features(rows) in the preimary dataset. There is no point continuing if there is no data.
    # p['relatedFilterOpen']): true if the related filter is open in the filter.
    # p['includeRelatedData']: has the box been checked in the filter to include the related data in the search.
    if ((p['isSpatialQuery'] and priDataset['count']>0) or p['relatedFilterOpen']) and p['includeRelatedData']:
        # relDataset = p['relDataset'].filter(functools.reduce(lambda x, y: x | y, [Q(**{p['geomQuery']: getattr(geom, p['geomField'])}) for geom in priDataset['data']]))
        # relDataset = run_filter_query(p['relDatasetName'],'related',relDataset,configs,filterSelectionDic)
        relDataset = p['relDataset'].filter(**{p['geomQuery']: priDataset['data']}).distinct()        
        relDataset = run_filter_query(p['relDatasetName'],'related',relDataset,configs,filterSelectionDic)
        if p['isSpatialQuery']:
            rel_total_count = relDataset['data'].count()
            rel_has_more = is_there_more_data(relDataset['data'],p['limit'])
            relDataset['data'] = infinite_filter(relDataset['data'],p['limit'],p['offset'])
    else:
        if p['isSpatialQuery'] and priDataset['count'] == 0:
            priDataset = {'data': {}}
            if p['isSpatialQuery']:
                pri_total_count = 0
                pri_has_more = False
        relDataset = {'data': {}}
        if p['isSpatialQuery']:
            rel_total_count = 0
            rel_has_more = False
            
    data = {
        'priDataset': priDataset['data'], 
        'relDataset': relDataset['data'],
        }
    
    if p['isSpatialQuery']:
        data['priTotalCount'] = pri_total_count
        data['priHasMore'] = pri_has_more
        data['relTotalCount'] = rel_total_count
        data['relHasMore'] = rel_has_more

    return data


# def filter_data(p):

#     configs = getJSON(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),"configs","dataset_query_configs.json"))
#     filterSelectionDic = p['filterSelectionDic']

#     if not p['isSpatialQuery']:
#         del filterSelectionDic[p['name']] # delete the key value pair. 

#     # filters the primary dataset for all options selected in the filter. 
#     priDataset = run_filter_query(p['priDatasetName'],'primary',p['priDataset'],configs,filterSelectionDic)

#     # slice the data to limit the data returned. only for the spatial query.
#     if p['isSpatialQuery']:
#         pri_total_count = priDataset['data'].count()
#         pri_has_more = is_there_more_data(priDataset['data'],p['limit'])
#         priDataset['data'] = infinite_filter(priDataset['data'],p['limit'],p['offset'])

#     # p['isSpatialQuery']: if true then the aim is to return the spatial model to plot of the map
#     # priDataset['count']: counts the number of features(rows) in the preimary dataset. There is no point continuing if there is no data.
#     # p['relatedFilterOpen']): true if the related filter is open in the filter.
#     # p['includeRelatedData']: has the box been checked in the filter to include the related data in the search.
#     if ((p['isSpatialQuery'] and priDataset['count']>0) or p['relatedFilterOpen']) and p['includeRelatedData']:
#         relDataset = p['relDataset'].filter(functools.reduce(lambda x, y: x | y, [Q(**{p['geomQuery']: getattr(geom, p['geomField'])}) for geom in priDataset['data']]))
#         relDataset = run_filter_query(p['relDatasetName'],'related',relDataset,configs,filterSelectionDic)
#         if p['isSpatialQuery']:
#             rel_total_count = relDataset['data'].count()
#             rel_has_more = is_there_more_data(relDataset['data'],p['limit'])
#             relDataset['data'] = infinite_filter(relDataset['data'],p['limit'],p['offset'])
#     else:
#         if p['isSpatialQuery'] and priDataset['count'] == 0:
#             priDataset = {'data': {}}
#             if p['isSpatialQuery']:
#                 pri_total_count = 0
#                 pri_has_more = False
#         relDataset = {'data': {}}
#         if p['isSpatialQuery']:
#             rel_total_count = 0
#             rel_has_more = False
            
#     data = {
#         'priDataset': priDataset['data'], 
#         'relDataset': relDataset['data'],
#         }
    
#     if p['isSpatialQuery']:
#         data['priTotalCount'] = pri_total_count
#         data['priHasMore'] = pri_has_more
#         data['relTotalCount'] = rel_total_count
#         data['relHasMore'] = rel_has_more

#     return data


# Get the extent of the primary dataset. This will allow me to zoom on submit.
# Much easier to do it here than in leaflet.
def get_extent(params,datasets):
    # Union('geom'): causes an error if the dataset has been previously sliced
    ce = params['current_extent']

    # if params['append_to'] == 'related': # extent only changes when creating new data or appending to the primary dataset
    #     extent = ce
    # else:

    # this will prevent an error if there is no data to get the extent of
    extent = {} if ce == None else ce
    if datasets['priDataset'].count() != 0:
        extent['NELng'], extent['NELat'], extent['SWLng'], extent['SWLat'] = datasets['priDataset'].aggregate(Extent('geom'))['geom__extent']


    # if adding to existing data then the extent need to account for the existing data.
    if ce:
        poly_1 = Polygon(((extent['NELng'],extent['NELat']),(extent['NELng'],extent['SWLat']),(extent['SWLng'],extent['SWLat']),(extent['SWLng'],extent['NELat']),(extent['NELng'],extent['NELat'])))
        poly_2 = Polygon(((ce['NELng'],ce['NELat']),(ce['NELng'],ce['SWLat']),(ce['SWLng'],ce['SWLat']),(ce['SWLng'],ce['NELat']),(ce['NELng'],ce['NELat'])))
        extent['NELng'], extent['NELat'], extent['SWLng'], extent['SWLat'] = MultiPolygon(poly_1,poly_2).extent

    return extent


# get the data for the Title, site of company request. Firstly, check if the values are valid
def getDetailData(data):
    datagroup = data['datagroup']
    value = data['value']

    if not datagroup in ["Site ID", "Title ID", "Company Name"]:
        msg = "NO_DATAGROUP"
        data = []
    else:
        if datagroup in ["Site ID","Title ID"]:
            if len(value) != 7:
                msg = "INVALID_VALUE_LENGTH"
                data = []
            else:
                dataset = "Occurrence" if datagroup == "Site ID" else "Tenement"
                result = getSerializedCoreData(dataset,"ind",value)

        elif datagroup == "Company Name":
            result = getDataByCompany(value)
            # print("hello")


    return datagroup


# def sites_dropdown_data():

# def getDataByCompany(name):
#     try:
#         holder = Holder.objects.get(name=name)
#         success = True
#     except:
#         success = False

#     if success:
#         # lst = []
#         # for x in holder.name_tenholder.all():
#         #     for y in x.holder_tenement.all()[0].occurrence.all():
#         #         lst.append(y.ind)
#         # print(len(lst))
#         titles = holder.name_tenholder.holder_tenement.all()
#         print(titles)
        
#         dic = {
#             "name": name,
#             "parents": [{"name": x.name.name, "percown": x.percown} for x in holder.child_holderrelation.all()],
#             "subsidiaries": [{"name": x.child.name, "percown": x.percown} for x in holder.name_holderrelation.all()],
#             "listed": [{"ticker": x.ticker, "exchange": x.exchange.code, "country": x.exchange.country} for x in holder.listed.all()],
#             "companytype": holder.typ.original,
#             "titlescount": len(holder.name_tenholder.all()),
#         }
#         print(dic)

#     return "fail"




