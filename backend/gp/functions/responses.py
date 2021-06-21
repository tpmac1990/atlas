# from django.http import HttpResponse


# def getSpatialResponse(p,data):
#     response = HttpResponse(data)
#     # size = len(data)
#     # if p['priDatasetName'] == 'Tenement':
#     #     maxSize = 3000000
#     # else:
#     #     if p['includeRelatedData']:
#     #         maxSize = 3000000
#     #     else:
#     #         maxSize = 150000

#     # if size < maxSize and size > 300:
#     #     response = HttpResponse(data)
#     # else:
#     #     response = HttpResponse("size of the data is %s" %(size), status=503) # this message is not being used yet
        
#     return response


# def getListResponse(p,data):
#     size = len(data)
#     if size < 60000:
#         response = HttpResponse(data)
#     else:
#         response = HttpResponse("size of the data is %s" %(size), status=503) # this message is not being used yet
        
#     return response


