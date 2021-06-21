# from django.core.serializers import serialize
# import json

# def serializeToGeoJSON(dataset,geomField,fields):
#     return serialize(
#                 'geojson',  
#                 dataset,
#                 geometry_field=geomField,
#                 use_natural_foreign_keys=True, 
#                 use_natural_primary_keys=True,
#                 fields=fields,
#                 srid= 4202
#     )


# def serializeAndCombine(p,datasets):
#     primarySerializer = serializeToGeoJSON(datasets['priDataset'],p['geomField'],p['fields'])
#     relatedSerializer = serializeToGeoJSON(datasets['relDataset'],p['geomField'],p['fields'])
#     serializer = {
#         "primarySerializer": primarySerializer,
#         "relatedSerializer": relatedSerializer,
#         "extent": datasets['extent']
#     }
#     if p['isSpatialQuery']:
#         serializer['totalCount'] = datasets['totalCount']
#         serializer['hasMore'] = datasets['hasMore']
#         # serializer['relTotalCount'] = datasets['relTotalCount']
#         # serializer['relHasMore'] = datasets['relHasMore']

#     serializedData = json.dumps(serializer)
#     return serializedData


