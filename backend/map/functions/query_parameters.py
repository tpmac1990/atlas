from map.models import Tenement, Occurrence

def setParams(data,spatialQuery):
    dic = {
        'name': data['name'],
        'filterSelectionDic': data['input']['input'],
        'includeRelatedData': data['input']['includeRelated'],
        'relatedFilterOpen': data['input']['relatedOpen'],
        'priDatasetName': data['dataset'],
        # 'filterType': data['direction'],
        'fields': ('pk',),
        'isSpatialQuery': spatialQuery,
    }
    if dic['priDatasetName'] == 'Tenement':
        dic['priDataset'] = Tenement.objects.all()
        dic['relDataset'] = Occurrence.objects.all()
        dic['relDatasetName'] = 'Occurrence'
    else:
        dic['priDataset'] = Occurrence.objects.all()
        dic['relDataset'] = Tenement.objects.all()
        dic['relDatasetName'] = 'Tenement'
    dic['priGeomField'] = 'geom'
    dic['relGeomField'] = 'geom'
    dic['priIDFieldName'] = 'ind'
    dic['priGeomQuery'] = '%s__intersects' %(dic['priGeomField'])
    dic['relGeomQuery'] = '%s__intersects' %(dic['relGeomField'])

    return(dic)
