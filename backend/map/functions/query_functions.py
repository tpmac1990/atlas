from django.contrib.gis.geos import Polygon, Point
# from .query_dictionaries import getDatasetQueryDic, getCheckboxQueryDic
from .load_functions import getJSON
import functools 
from django.db.models import Q
import json
import datetime
import os
from django.apps import apps


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


def getDataList(p,datasets):
    # p['priDatasetName']: Tenement or Occurrence
    # checkboxQueryDic = getCheckboxQueryDic(p['priDatasetName'])

    configs = getJSON(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),"configs","model_query_configs.json"))

    qs = datasets['relDataset'] if p['relatedFilterOpen'] else datasets['priDataset']
    
    # If name ends with related, then it needs to query the related dataset and therefore lookup the related model & query in the configs file.
    name = p['name']
    if name.endswith("related"):
        lookup_name = name.replace("related","") # remove "related" from the name to get the correct key to lookup
        query_group = configs[p['relDatasetName']][name]
    else:
        lookup_name = name
        query_group = configs[p['priDatasetName']][name]

    model = apps.get_model('map', query_group['model'])
    query = query_group['query']
    values = tuple(query_group['values'])
    order_by = query_group['order_by']

    # get the list of values which will be displayed as checkboxes in the filter on the frontend.
    vals = list(model.objects.filter(**{query: qs}).values(*values).distinct().order_by(order_by))

    # vals = list(checkboxQueryDic[p['name']](qs))

    data = json.dumps(vals)

    return data



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
    elif val in ['lodgedate, startdate', 'enddate']:
        if fsdv != '':
            ds = fsdv.split('-')
            return datetime.date(int(ds[0]),int(ds[2]),int(ds[2]))
    else:
        if len(fsdv) != 0:
            return fsdv
    return None



def filterData(p):

    configs = getJSON(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),"configs","dataset_query_configs.json"))
    # priDic = configs
    # priDic = getDatasetQueryDic(p['priDatasetName'])
    filterSelectionDic = p['filterSelectionDic']

    if not p['isSpatialQuery']:
        del filterSelectionDic[p['name']] # delete the key value pair. 

    # if p['filterType'] == 'Filter':
    #     priDataset = runFilterQuery(p['priDatasetName'],'primary',p['priDataset'],priDic,filterSelectionDic)
    # else:
    #     circle = createBuffer(p['filterSelectionDic'], p['priDatasetName'], p['priIDFieldName'], p['priDataset']) 
    #     priDataset = p['priDataset'].filter(**{p['priGeomQuery']: circle})
    #     priDataset = runFilterQuery(p['priDatasetName'],'primary',priDataset,priDic,filterSelectionDic)

    priDataset = runFilterQuery(p['priDatasetName'],'primary',p['priDataset'],configs,filterSelectionDic)

    # p['isSpatialQuery']: if true then the aim is to return the spatial model to plot of the map
    # priDataset['count']: counts the number of features(rows) in the preimary dataset. There is no point continuing if there is no data.
    # p['relatedFilterOpen']): true if the related filter is open in the filter.
    # p['includeRelatedData']: has the box been checked in the filter to include the related data in the search.
    if ((p['isSpatialQuery'] and priDataset['count']>0) or p['relatedFilterOpen']) and p['includeRelatedData']:
        # relDic = getDatasetQueryDic(p['relDatasetName'])
        relDataset = p['relDataset'].filter(functools.reduce(lambda x, y: x | y, [Q(**{p['relGeomQuery']: getattr(geom, p['priGeomField'])}) for geom in priDataset['data']]))
        relDataset = runFilterQuery(p['relDatasetName'],'related',relDataset,configs,filterSelectionDic)
    else:
        # if p['isSpatialQuery'] and priDataset['count'] == 0 and p['filterType'] != 'Buffer':
        if p['isSpatialQuery'] and priDataset['count'] == 0:
            priDataset = {'data': {}}
            relDataset = {'data': {}}
        else:
            relDataset = {'data': {}}

    return {
        'priDataset': priDataset['data'], 
        'relDataset': relDataset['data']
        }
