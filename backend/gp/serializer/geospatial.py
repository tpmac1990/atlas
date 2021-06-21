from django.core.serializers import serialize
import json

def serialize_to_geo_json(dataset,geomField,fields):
    return serialize(
                'geojson',  
                dataset,
                geometry_field=geomField,
                use_natural_foreign_keys=True, 
                use_natural_primary_keys=True,
                fields=fields,
                srid= 4202
    )


def serialize_and_combine(p,datasets,offset):
    primarySerializer = serialize_to_geo_json(datasets['priDataset'],p['geomField'],p['fields'])
    relatedSerializer = serialize_to_geo_json(datasets['relDataset'],p['geomField'],p['fields'])
    # print(primarySerializer)
    serializer = {
        "primarySerializer": primarySerializer,
        "relatedSerializer": relatedSerializer,
        "extent": datasets['extent']
    }
    if p['isSpatialQuery']:
        serializer['totalCount'] = datasets['totalCount']
        serializer['hasMore'] = datasets['hasMore']
        serializer['priDataset'] = datasets['priDataset'].count() + offset
        serializer['relDataset'] = 0 if datasets['relDataset'] == {} else datasets['relDataset'].count()
        # serializer['relTotalCount'] = datasets['relTotalCount']
        # serializer['relHasMore'] = datasets['relHasMore']

    return serializer

    # serializedData = json.dumps(serializer)
    # return serializedData