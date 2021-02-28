# from rest_framework import viewsets, permissions 
from rest_framework.views import APIView
from django.http import HttpResponse
from .functions import *
from .serializers import HolderSerializer, TitleSerializer, SiteSerializer, HolderListSerializer, TitleBriefSerializer, SiteBriefSerializer
from rest_framework import status  
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Holder, Tenement, Occurrence
import json
from django.apps import apps


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
        datasets = getExtent(datasets) # gets the extent of the primary dataset for zooming purposes on submit.
        serializedData = serializeAndCombine(params,datasets)
        response = getSpatialResponse(params,serializedData)
        return response


class FilterViewSet(APIView):

    def post(self, request): 
        params = setParams(request.data,False)
        dataset = filterData(params)
        data = getDataList(params,dataset)
        return Response(data)

        # response = getListResponse(params,data)
        # return HttpResponse(data)



class HolderListViewSet(APIView):
    def get(self, request): 
        holder = Holder.objects.all()
        serializer = HolderListSerializer(holder,many=True)
        return Response(serializer.data)



class DetailHolderViewSet(APIView):

    def get(self, request, pk):
        try:
            holder = Holder.objects.get(id=pk)
            serializer = HolderSerializer(holder,many=False)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class DetailTitleViewSet(APIView):

    def get(self, request, pk):
        try:
            title = Tenement.objects.get(ind=pk)
            serializer = TitleSerializer(title,many=False)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class DetailSiteViewSet(APIView):

    def get(self, request, pk):
        try:
            site = Occurrence.objects.get(ind=pk)
            serializer = SiteSerializer(site,many=False)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        
class DataByIndexesViewSet(APIView):

    def get(self, request, pk=None):
        # ind_lst = self.kwargs.get('ind_lst') # works the same as below
        ind_lst = request.GET.get('ind_lst').split(',')
        datagroup = request.GET.get('datagroup')
        try:
            model = apps.get_model('map', datagroup)
            objs = model.objects.filter(ind__in=ind_lst)
            if datagroup == 'Tenement':
                serializer = TitleBriefSerializer(objs,many=True)
            else:
                serializer = SiteBriefSerializer(objs,many=True)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


        