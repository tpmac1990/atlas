from map.models import Tenement, Occurrence
from django.core.serializers import serialize

def getPopupData(datasetName, pk):
        if datasetName == 'Tenement':
            dataset = Tenement
            # query = 'ind'
            fields = ('typ', 'status', 'lodgedate', 'startdate', 'enddate', 'oid', 'holder', 'majmat')
        else:
            dataset = Occurrence
            # query = 'ind'
            fields = ('typ', 'status', 'name', 'oid', 'majmat')

        obj = dataset.objects.get(**{'ind': pk})
        serializer = serialize('json', [obj], use_natural_foreign_keys=True, fields=fields)
        return serializer[1:-1]