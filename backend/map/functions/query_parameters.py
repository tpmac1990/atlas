from map.models import Tenement, Occurrence

def setParams(data,spatialQuery):
    # print(data['offset'])
    dic = {
        'name': data['name'],
        'filterSelectionDic': data['input']['input'],
        'includeRelatedData': data['input']['includeRelated'],
        'relatedFilterOpen': data['input']['relatedOpen'],
        'priDatasetName': data['dataset'],
        'geomField': 'geom',
        'IDFieldName': 'ind',
        'geomQuery': 'geom__intersects',
        'fields': ('pk',),
        'isSpatialQuery': spatialQuery,
        'offset': data['offset'],
        'limit': data['limit'],
        'filter': data['filter']
    }
    if dic['priDatasetName'] == 'Tenement':
        dic['priDataset'] = Tenement.objects.all()
        dic['relDataset'] = Occurrence.objects.all()
        dic['relDatasetName'] = 'Occurrence'
    else:
        dic['priDataset'] = Occurrence.objects.all()
        dic['relDataset'] = Tenement.objects.all()
        dic['relDatasetName'] = 'Tenement'

    return(dic)
