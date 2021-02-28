from django.contrib.gis.geos import Polygon, Point
from django.contrib.gis.db.models import Extent, Union
from .load_functions import getJSON
# from .get_popup_data import getSerializedCoreData
import functools 
from django.db.models import Q
import json
import datetime
import os
from django.apps import apps
# from map.models import Holder


def runFilterQuery(dataname,filtertype,dataset,dic,filterSelectionDic):
    count = 0
    for val in filterSelectionDic:
        if val in dic.keys() and dataname in dic[val]['dataset'] and filtertype in dic[val]['use']:
            queryValue = getQueryValue(val, filterSelectionDic)
            if queryValue != None:
                count += 1
                queryString = dic[val]['query']
                dataset = dataset.filter(**{queryString: queryValue})
    return {'data': dataset, 'count': count}


# Queries the db and returns a list of all the remaining options. Generally used for the checkbox options in the filter
def getDataList(p,datasets):

    # configs = getJSON(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),"configs","model_query_configs.json"))
    configs = getJSON("map/configs/model_query_configs.json")

    qs = datasets['relDataset'] if p['relatedFilterOpen'] else datasets['priDataset']
    
    # If name ends with related, then it needs to query the related dataset and therefore lookup the related model & query in the configs file.
    name = p['name']
    if name.endswith("related"):
        lookup_name = name.replace("related","") # remove "related" from the name to get the correct key to lookup
        query_group = configs[p['relDatasetName']][lookup_name]
    else:
        lookup_name = name
        query_group = configs[p['priDatasetName']][lookup_name]

    model = apps.get_model('map', query_group['model'])
    query = query_group['query']
    values = tuple(query_group['values'])
    order_by = query_group['order_by']

    # get the list of values which will be displayed as checkboxes in the filter on the frontend.
    # objs = model.objects.filter(**{query: qs}).distinct().order_by(order_by)
    # print(p['filter'])
    # print(query_group['model'])
    # print(query)
    objs = model.objects.filter(**{query: qs})
    # print('%s__icontains'%(order_by))
    # print(objs.count())
    objs = objs.filter(**{'%s__icontains'%(order_by): p['filter']})
    # objs = objs.filter(name__icontains='hill')
    # print(objs.count())
    objs = objs.distinct().order_by(order_by)
    has_more = is_there_more_data(objs,p['limit'])
    objs = infinite_filter(objs,p['limit'],p['offset'])
    vals = list(objs.values_list(*values))

    if len(values) == 1:
        vals = [[x[0],x[0]] for x in vals]

    # data = json.dumps({ 'data': vals, 'has_more': has_more }) # changed HttpResponse to Response which removed the need for this
    data = { 'data': vals, 'has_more': has_more }

    return data


def infinite_filter(objs,limit,offset):
    return objs[int(offset): int(offset) + int(limit)]

def is_there_more_data(objs,offset):
    if int(offset) > objs.count():
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
    elif val in ['lodgedate, startdate', 'enddate', 'fromdate', 'todate']:
        if fsdv != '':
            ds = fsdv.split('-')
            return datetime.date(int(ds[0]),int(ds[2]),int(ds[2]))
    else:
        if len(fsdv) != 0:
            return fsdv
    return None


def filterData(p):

    configs = getJSON(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),"configs","dataset_query_configs.json"))
    filterSelectionDic = p['filterSelectionDic']

    if not p['isSpatialQuery']:
        del filterSelectionDic[p['name']] # delete the key value pair. 


    # filters the primary dataset for all options selected in the filter. 
    priDataset = runFilterQuery(p['priDatasetName'],'primary',p['priDataset'],configs,filterSelectionDic)

    # p['isSpatialQuery']: if true then the aim is to return the spatial model to plot of the map
    # priDataset['count']: counts the number of features(rows) in the preimary dataset. There is no point continuing if there is no data.
    # p['relatedFilterOpen']): true if the related filter is open in the filter.
    # p['includeRelatedData']: has the box been checked in the filter to include the related data in the search.
    if ((p['isSpatialQuery'] and priDataset['count']>0) or p['relatedFilterOpen']) and p['includeRelatedData']:
        relDataset = p['relDataset'].filter(functools.reduce(lambda x, y: x | y, [Q(**{p['geomQuery']: getattr(geom, p['geomField'])}) for geom in priDataset['data']]))
        relDataset = runFilterQuery(p['relDatasetName'],'related',relDataset,configs,filterSelectionDic)
    else:
        if p['isSpatialQuery'] and priDataset['count'] == 0:
            priDataset = {'data': {}}
            relDataset = {'data': {}}
        else:
            relDataset = {'data': {}}

    return {
        'priDataset': priDataset['data'], 
        'relDataset': relDataset['data']
        }


# Get the extent of the primary dataset. This will allow me to zoom on submit.
# Much easier to do it here than in leaflet.
def getExtent(datasets):
    extent = {}
    extent['NELng'], extent['NELat'], extent['SWLng'], extent['SWLat'] = datasets['priDataset'].aggregate(Extent('geom'), Union('geom'))['geom__extent']
    datasets['extent'] = extent
    return datasets




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
