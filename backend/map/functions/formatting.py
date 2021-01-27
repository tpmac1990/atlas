from django.core.serializers import serialize
import json

def serializeToGeoJSON(dataset,geomField,fields):
    return serialize(
                'geojson',  
                dataset,
                geometry_field=geomField,
                use_natural_foreign_keys=True, 
                use_natural_primary_keys=True,
                fields=fields,
                srid= 4202
    )


def serializeAndCombine(p,datasets):
    primarySerializer = serializeToGeoJSON(datasets['priDataset'],p['priGeomField'],p['fields'])
    relatedSerializer = serializeToGeoJSON(datasets['relDataset'],p['relGeomField'],p['fields'])
    serializer = {
        "primarySerializer": primarySerializer,
        "relatedSerializer": relatedSerializer,
    }
    serializedData = json.dumps(serializer)
    return serializedData