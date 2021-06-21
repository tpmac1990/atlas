from gp.models import Tenement, Occurrence
import json

# tests if the gplore id entered on the frontend is a valid id from either the Tenement or Occurrence dataset.
def validID(key,datasetName):
    dataset = Tenement if datasetName == 'Tenement' else Occurrence

    try:
        ds = dataset.objects.get(**{'ind': key})
        center = ds.geom.centroid
        result = {"success":True,"lat":center.y,"lng":center.x}
    except:
        result = {"success":False,"lat":None,"lng":None}

    return json.dumps(result)
