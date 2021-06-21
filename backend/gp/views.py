# from rest_framework import viewsets, permissions 
from rest_framework.views import APIView
from django.http import HttpResponse
from .functions import (validID, filter_data_checkbox_list, filter_data_map, getDataList, 
                        get_extent, getTableData, is_there_more_data, infinite_filter, setParamsCheckboxList, setParamsMapData,
                        create_instance, copy_and_update_instance, multi_column_create_instance, add_changes_to_change_table,
                        set_instance_and_update, update_title_materials_and_record_changes)

# from .serializers import (SiteSerializer, HolderListSerializer, TitleBriefSerializer, 
#                             SiteBriefSerializer, SitePlainSerializer, OccNameSerializer, OidSerializer, TitlePlainSerializer,
#                             OidTitleSerializer, TenHolderPlainSerializer, 
#                             HolderAndTypeSerializer, KeepPostedSerializer, FeedbackSerializer)
from .serializer import (TitlePopupSerializer, SitePopupSerializer, serialize_and_combine, 
                        HolderDetailSerializer, ListedHolderSerializer, ParentHolderSerializer,
                        TitleDetailSerializer, SiteDetailSerializer, OccNameSerializer, SiteWriteSerializer, OidSerializer,
                        OccurrenceChangeSerializer, TitleTableSerializer, SiteTableSerializer,
                        OidTitleSerializer, TitleUpdateSerializer, TenHolderWriteSerializer, ParentWriteSerializer, ChildWriteSerializer,
                        TenementChangeSerializer, OccurrenceChangeSerializer, HolderChangeSerializer, HolderAndTypeSerializer,
                        OidWriteSerializer, OccNameWriteSerializer, OidWriteTitleSerializer)
from rest_framework import status  
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Holder, Tenement, Occurrence, OccName, TenHolder, Parent
import json
from django.apps import apps
from rest_framework.parsers import JSONParser
import time

def time_past(start,end):
    hours, rem = divmod(end-start, 3600)
    minutes, seconds = divmod(rem, 60)
    return "{:0>2}:{:0>2}:{:05.2f}".format(int(hours),int(minutes),seconds)


class TestIDViewSet(APIView):

    def post(self, request):
        datasetName = request.data['filterDataset']
        key = request.data['id']
        result = validID(key, datasetName)
        return HttpResponse(result)


# class PopupViewSet(APIView):

#     def post(self, request): 
#         datasetName = request.data['type']
#         pk = request.data['pk']
#         serializer = getPopupData(datasetName, pk)
#         return HttpResponse(serializer)

class PopupViewSet(APIView):
    ''' handles the data for the the popups when the user clicks on with a point or polygon 
    '''

    def get(self, request, pk): 
        dataset = request.GET.get('dataset')
        objs = apps.get_model('gp', dataset).objects.get(pk=pk)
        if dataset == 'Tenement':
            s = TitlePopupSerializer(objs,many=False)
        else:
            s = SitePopupSerializer(objs,many=False)
        return Response(s.data)


class SpatialQueryViewSet(APIView):
    ''' queries the selected dataset for all the selected fields in the filter and returns the geospatial data to 
        plot on the map 
    '''

    def post(self, request):
        params = setParamsMapData(request.data)
        datasets = filter_data_map(params)
        datasets['extent'] = get_extent(params,datasets) # gets the extent of the primary dataset for zooming purposes.
        data = serialize_and_combine(params,datasets,request.data['offset'])
        return Response(data)


class FilterViewSet(APIView):

    def post(self, request): 
        params = setParamsCheckboxList(request.data)
        dataset = filter_data_checkbox_list(params)
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
            holder = Holder.objects.get(pk=pk)
            serializer = HolderDetailSerializer(holder,many=False)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class DetailTitleViewSet(APIView):

    def get(self, request, pk):
        try:
            title = Tenement.objects.get(pk=pk)
            serializer = TitleDetailSerializer(title,many=False)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class DetailSiteViewSet(APIView):

    def get(self, request, pk):
        try:
            site = Occurrence.objects.get(ind=pk)
            serializer = SiteDetailSerializer(site,many=False)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class DropdownDataViewSet(APIView):

    def get(self, request, pk):
        try:
            key = request.GET.get('key')
            label = request.GET.get('label')
            lst = apps.get_model('gp', pk).objects.all().order_by(label).values_list(key,label)
            return Response(lst)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)



# # delete this
# class SiteEditViewSet(APIView):

#     def get(self, request, pk):
#         try:
#             site = Occurrence.objects.get(ind=pk)
#             serializer = SiteSerializer(site,many=False)
#             return Response(serializer.data)
#         except:
#             return Response(status=status.HTTP_404_NOT_FOUND)

        
class DataByIndexesViewSet(APIView):
    ''' This gets the data from either the Tenement or Occurrence dataset to display in the table. A list of 'ind' values are passed in for 
        which the dataset is filtered for. Passing is a list of 'ind' values allows me to create a table from either the 'Holder' detail view
        or from the data displayed on the map.
    ''' 

    def get(self, request, pk=None):
        datagroup = request.GET.get('datagroup')
        try:
            objs, has_more = getTableData(request)
            s = TitleTableSerializer(objs,many=True) if datagroup == 'Tenement' else SiteTableSerializer(objs,many=True)
            return Response({'data': s.data, 'has_more': has_more})
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class SiteGroupViewSet(APIView):
    ''' gets the list of data to be displayed in the infinity dropdown components
    '''

    def get(self, request, pk=None):
        # func_start = time.time()

        value = request.GET.get('value')
        model_name = request.GET.get('model')
        key = request.GET.get('key')
        label = request.GET.get('label')
        offset = int(request.GET.get('offset'))
        limit = int(request.GET.get('limit'))
        clientmax = int(request.GET.get('clientmax'))

        model = apps.get_model('gp', model_name)

        objs = model.objects.all()
        is_serverside = objs.count() <= clientmax
        # # exclude the edit instances from the search
        # if model_name == 'Occurrence' or model_name == 'Tenement':
        #     objs = objs.exclude(ind__icontains='#')
        # objs = objs.filter(**{'%s__icontains'%(label): value}).distinct().order_by(label)
        objs = objs.filter(**{'%s__icontains'%(label): value})

        # print(time_past(func_start,time.time()))

        if is_serverside:
            lst = objs.distinct().order_by(label).values_list(key,label)
            has_more = False
            client_dropdown = True
        else:
            has_more = is_there_more_data(objs,offset)
            objs = objs.distinct().order_by(label)
            objs = infinite_filter(objs,limit,offset)
            lst = objs.values_list(key,label)
            client_dropdown = False
        # print(time_past(func_start,time.time()))
        # lst = list(map(list, lst))
        # lst = [list(ele) for ele in lst]
        # print(time_past(func_start,time.time()))
        result = { 'data': lst, 'client_dropdown': client_dropdown, 'has_more': has_more }
        # print([lst])
        # print(time_past(func_start,time.time()))
        return Response(result)

        # try:
        #     objs = Occurrence.objects.get(ind=pk)
        #     serializer = SiteSerializer(site,many=False)
        #     return Response(serializer.data)
        # except:
        #     return Response(status=status.HTTP_404_NOT_FOUND)


# class TitleGroupViewSet(APIView):

#     def get(self, request, pk=None):
#         value = request.GET.get('value')
#         model_name = request.GET.get('model')
#         key = request.GET.get('key')
#         label = request.GET.get('label')
#         offset = int(request.GET.get('offset'))
#         limit = int(request.GET.get('limit'))
#         clientmax = int(request.GET.get('clientmax'))

#         model = apps.get_model('gp', model_name)

#         objs = model.objects.all()
#         is_serverside = objs.count() <= clientmax
#         objs = objs.filter(**{'%s__icontains'%(label): value}).distinct().order_by(label)

#         if is_serverside:
#             lst = objs.values_list(key,label)
#             has_more = False
#             client_dropdown = True
#         else:
#             has_more = is_there_more_data(objs,limit)
#             objs = infinite_filter(objs,limit,offset)
#             lst = objs.values_list(key,label)
#             client_dropdown = False

#         result = { 'data': lst, 'client_dropdown': client_dropdown, 'has_more': has_more }
#         return Response(result)


class CreateHolderViewSet(APIView):
    ''' create a new Holder instance. This is called from the Holder-detail component '''

    def post(self, request, pk=None):
        request.data['_id'] = Holder.objects.latest('_id')._id + 1
        request.data['user_name'] = 'user'
        s = HolderAndTypeSerializer(data=request.data)
        if s.is_valid():
            new_entry = s.save()
        else:
            print(s.errors)

        return Response('Is done')


class EditSiteViewSet(APIView):
    ''' manages the editing of data for the site dataset '''

    def post(self, request, pk):
        data = request.data
        # creates necessary model instances. returning data to make code more verbose
        arr = [{'field': 'name', 'serializer': OccNameWriteSerializer},{'field': 'oid', 'serializer': OidWriteSerializer}]
        data = create_instance(arr=arr, data=data)
        # update the title material fields
        update_title_materials_and_record_changes(pk=pk,data=data)
        # copy current instance, makes updates and saves with a temp # ind
        transfer_arr = ['geom','occurrence_tenement','state','localgov','govregion']
        copy_and_update_instance(data_set=data['set'],model=Occurrence,pk=pk,serializer=SiteWriteSerializer,transfer_arr=transfer_arr,pop_arr=[])
        # Add 'Add' & 'Remove' values to the OccurrenceChange table
        field_dic = {'typ':'typeval', 'status':'statusval', 'geoprovince': 'geoprovinceval', 'oid':'oidval', 'name':'nameval', 'majmat':'majmatval', 'minmat':'minmatval', 'size':'sizeval'}
        add_changes_to_change_table(pk=pk,data=data,field_dic=field_dic,serializer=OccurrenceChangeSerializer)

        return Response(pk)



class EditTitleViewSet(APIView):
    ''' manages the editing of data for the title dataset '''

    def post(self, request, pk):
        data = request.data
        # print(data)
        # creates necessary model instances
        arr = [{'field': 'oid', 'serializer': OidWriteTitleSerializer}]
        data = create_instance(arr=arr, data=data)
        # copy current instance, makes updates and saves with a temp # ind
        transfer_arr = ['geom','lodgedate','startdate','enddate','localgov','govregion','occurrence','shore','state']
        copy_and_update_instance(data_set=data['set'],model=Tenement,pk=pk,serializer=TitleUpdateSerializer,transfer_arr=transfer_arr,pop_arr=['holder'])
        # Adds instances for the multi column edit holder group. Also deletes all instances in the remove list, This only works for 'holder'
        arr = [{'name': 'holder', 'serializer': TenHolderWriteSerializer}]          
        multi_column_create_instance(arr=arr,data=data,pk=pk)
        # Add 'Add' & 'Remove' values to the TenementChange table
        # field_dic = {'typ': 'typeval', 'status': 'statusval', 'geoprovince': 'geoprovinceval', 'majmat': 'majmatval', 'minmat': 'minmatval', 'holder': 'holderval', 'oid': 'oidval'}
        # data['add']['oid'] = data['add']['oid'] + [x['code'] for x in data['create']['oid']]
        field_dic = {'typ': 'typeval', 'status': 'statusval', 'geoprovince': 'geoprovinceval', 'holder': 'holderval', 'oid': 'oidval'}
        add_changes_to_change_table(pk=pk,data=data,field_dic=field_dic,serializer=TenementChangeSerializer)

        return Response(pk)


class EditHolderViewSet(APIView):
    ''' manages the editing of data for a title holder '''

    def post(self, request, pk):
        data = request.data
        # creates necessary model instances
        arr = [{ 'field': 'listed_simple', 'serializer': ListedHolderSerializer }]
        data = create_instance(arr=arr, data=data)
        # set the listed tickers and update necessary fields on user change
        holder = Holder.objects.get(pk=pk)
        set_instance_and_update(data_set=data['set'],obj=holder)
        # update fields that have multiple inputs. e.g. parent has a holder and a percent owned
        arr = [{'name': 'parent_company', 'serializer': ParentWriteSerializer},{'name': 'subsidiaries', 'serializer': ChildWriteSerializer}]
        multi_column_create_instance(arr=arr,data=data,pk=pk)
        # Add 'Add' & 'Remove' values to the HolderChange table
        # data['add']['listed_simple'] = data['set']['listed_simple'] # could be improved. Required to apply the 'add' row to the change table
        field_dic = {'parent_company':'parentval', 'subsidiaries':'childval', 'listed_simple':'listedval'}
        add_changes_to_change_table(pk=pk,data=data,field_dic=field_dic,serializer=HolderChangeSerializer)

        return Response(holder.name)
        # return Response('Saved Successfully as ')


        # # adds multiple instances for a multi column edit where table setup requires all previous instances with the pk to be removed and then re-set.
        # arr = [{'name': 'parent_company','model': Parent,'serializer': ParentHolderSerializer,'drop': 'child','mapping': [{'serializer': 'name', 'lookup': 'name'}, {'serializer': 'child', 'lookup': 'pk'}, {'serializer': 'percown', 'lookup': 'percown'}]},
        #         {'name': 'subsidiaries','model': Parent,'serializer': ParentHolderSerializer,'drop': 'name','mapping': [{'serializer': 'name', 'lookup': 'pk'}, {'serializer': 'child', 'lookup': 'name'}, {'serializer': 'percown', 'lookup': 'percown'}]}]
        # multi_column_drop_all_readd_instances(pk=pk,arr=arr,data=data)



class CreateFeedbackViewSet(APIView):

    def post(self, request, pk=None):
        data = request.data
        s = FeedbackSerializer(data=data)
        if s.is_valid():
            s.save()
        return Response('Feedback Saved Successfully as')

class CreateKeepPostedViewSet(APIView):

    def post(self, request, pk=None):
        data = request.data
        s = KeepPostedSerializer(data=data)
        if s.is_valid():
            s.save()
        return Response('Add to email list')