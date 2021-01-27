from map.models import Tenement, Occurrence
import json

def validID(key,datasetName):
    dataset = Tenement if datasetName == 'Tenement' else Occurrence
    # if datasetName == 'Tenement':
    #     dataset = Tenement
    # else:
    #     dataset = Occurrence

    try:
        ds = dataset.objects.get(**{'ind': key})
        center = ds.geom.centroid
        result = {"success":True,"lat":center.y,"lng":center.x}
    except:
        result = {"success":False,"lat":None,"lng":None}

    return json.dumps(result)
