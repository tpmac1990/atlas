# from gp.models import Tenement, Occurrence
# from django.core.serializers import serialize

# def getPopupData(datasetName, pk):
#     if datasetName == 'Tenement':
#         dataset = Tenement
#         fields = ('typ', 'status', 'lodgedate', 'startdate', 'enddate', 'oid', 'holder', 'majmat')
#     else:
#         dataset = Occurrence
#         fields = ('typ', 'status', 'name', 'oid', 'majmat')

#     obj = dataset.objects.get(**{'ind': pk})
#     serializer = serialize('json', [obj], use_natural_foreign_keys=True, fields=fields)
#     return serializer[1:-1]


# def getSerializedCoreData(datasetName,query_string,value):
#     if datasetName == 'Tenement':
#         dataset = Tenement
#         fields = ('typ', 'status', 'lodgedate', 'startdate', 'enddate', 'oid', 'holder', 'majmat')
#     else:
#         dataset = Occurrence
#         fields = ('typ', 'status', 'name', 'oid', 'majmat')

#     try:
#         obj = dataset.objects.get(**{query_string: value})
#         serializer = serialize('json', [obj], use_natural_foreign_keys=True, fields=fields)
#         msg = "VALUE_FOUND"
#     except:
#         serializer = []
#         msg = "VALUE_NOT_FOUND"

#     return [serializer[1:-1],msg]