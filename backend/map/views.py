# from rest_framework import viewsets, permissions 
from rest_framework.views import APIView
from django.http import HttpResponse
from .functions import *


class TestIDViewSet(APIView):

    def post(self, request):
        datasetName = request.data['filterDataset']
        key = request.data['id']
        result = validID(key, datasetName)
        return HttpResponse(result)


class PopupViewSet(APIView):

    def post(self, request): 
        datasetName = request.data['type']
        pk = request.data['pk']
        serializer = getPopupData(datasetName, pk)
        return HttpResponse(serializer)


class SpatialQueryViewSet(APIView):

    def post(self, request):
        params = setParams(request.data,True)
        datasets = filterData(params)
        serializedData = serializeAndCombine(params,datasets)
        response = getSpatialResponse(params,serializedData)
        return response


class FilterViewSet(APIView):

    def post(self, request): 
        params = setParams(request.data,False)
        dataset = filterData(params)
        data = getDataList(params,dataset)
        response = getListResponse(params,data)
        return response

