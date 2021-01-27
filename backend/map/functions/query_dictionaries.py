# from map.models import *


# def getCheckboxQueryDic(datasetName):
#     dic = {
#         'ausstate': lambda qs: State.objects.filter(state_tenement__in=qs).values('pk','name').distinct().order_by('name'),
#         'region': lambda qs: GovernmentRegion.objects.filter(govregion_tenement__in=qs).values('pk','name').distinct().order_by('name'),
#         'local': lambda qs: LocalGovernment.objects.filter(localgov_tenement__in=qs).values('pk','name').distinct().order_by('name'),
#         'province': lambda qs: GeologicalProvince.objects.filter(geoprovince_tenement__in=qs).values('pk','name').distinct().order_by('name'),
#         'typesimple': lambda qs: TenTypeSimp.objects.filter(simple_tentype__typ_tenement__in=qs).values('pk','name').distinct().order_by('name'),
#         'typedetail': lambda qs: TenType.objects.filter(typ_tenement__in=qs).values('pk','fname').distinct().order_by('fname'),
#         'statussimple': lambda qs: TenStatusSimp.objects.filter(simple_tenstatus__status_tenement__in=qs).values('pk','name').distinct().order_by('name'),
#         'statusdetail': lambda qs: TenStatus.objects.filter(status_tenement__in=qs).values('pk','original').distinct().order_by('original'),
#         'givenids': lambda qs: TenOriginalID.objects.filter(oid_tenement__in=qs).values('pk').distinct().order_by('pk'),
#         'newids': lambda qs: qs.values('ind').distinct().order_by('ind'),
#         'typesimplerelated': lambda qs: OccTypeSimp.objects.filter(simple_occtype__typ_occurrence__in=qs).values('pk','name').distinct().order_by('name'),
#         'typedetailrelated': lambda qs: OccType.objects.filter(typ_occurrence__in=qs).values('pk','original').distinct().order_by('original'),
#         'statussimplerelated': lambda qs: OccStatusSimp.objects.filter(simple_occstatus__status_occurrence__in=qs).values('pk','name').distinct().order_by('name'),
#         'statusdetailrelated': lambda qs: OccStatus.objects.filter(status_occurrence__in=qs).values('pk','original').distinct().order_by('original'),
#         'materialcategory': lambda qs: MaterialCategory.objects.filter(category_material__majmat_tenement__in=qs).values('pk','name').distinct().order_by('name'),
#         'materialname': lambda qs: Material.objects.filter(majmat_tenement__in=qs).values('pk','name').distinct().order_by('name'),
#         'materialcategoryrelated': lambda qs: MaterialCategory.objects.filter(category_material__majmat_occurrence__in=qs).values('pk','name').distinct().order_by('name'),
#         'materialnamerelated': lambda qs: Material.objects.filter(majmat_occurrence__in=qs).values('pk','name').distinct().order_by('name'),
#         'occurrencename': lambda qs: OccName.objects.filter(name_occurrence__in=qs).values('pk','name').distinct().order_by('name'),
#         'holdertype': lambda qs: HolderType.objects.filter(typ_holder__name_tenholder__holder_tenement__in=qs).values('pk','original').distinct().order_by('original'),
#         'holderposition': lambda qs: HolderPosition.objects.filter(position_tenholder__holder_tenement__in=qs).values('pk','name').distinct().order_by('name'),
#         'holdername': lambda qs: Holder.objects.filter(name_tenholder__holder_tenement__in=qs).values('pk','name').distinct().order_by('name'),
#     }
#     if datasetName == "Occurrence":
#         changeDic = {
#             'ausstate': lambda qs: State.objects.filter(state_occurrence__in=qs).values('pk','name').distinct().order_by('name'),
#             'region': lambda qs: GovernmentRegion.objects.filter(govregion_occurrence__in=qs).values('pk','name').distinct().order_by('name'),
#             'local': lambda qs: LocalGovernment.objects.filter(localgov_occurrence__in=qs).values('pk','name').distinct().order_by('name'),
#             'province': lambda qs: GeologicalProvince.objects.filter(geoprovince_occurrence__in=qs).values('pk','name').distinct().order_by('name'),
#             'typesimple': lambda qs: OccTypeSimp.objects.filter(simple_occtype__typ_occurrence__in=qs).values('pk','name').distinct().order_by('name'),
#             'typedetail': lambda qs: OccType.objects.filter(typ_occurrence__in=qs).values('pk','original').distinct().order_by('original'),
#             'statussimple': lambda qs: OccStatusSimp.objects.filter(simple_occstatus__status_occurrence__in=qs).values('pk','name').distinct().order_by('name'),
#             'statusdetail': lambda qs: OccStatus.objects.filter(status_occurrence__in=qs).values('pk','original').distinct().order_by('original'),
#             'givenids': lambda qs: OccOriginalID.objects.filter(oid_occurrence__in=qs).values('pk').distinct().order_by('pk'),
#             # 'newids': lambda qs: qs.values('ind').distinct().order_by('ind'),
#             'typesimplerelated': lambda qs: TenTypeSimp.objects.filter(simple_tentype__typ_tenement__in=qs).values('pk','name').distinct().order_by('name'),
#             'typedetailrelated': lambda qs: TenType.objects.filter(typ_tenement__in=qs).values('pk','fname').distinct().order_by('fname'),
#             'statussimplerelated': lambda qs: TenStatusSimp.objects.filter(simple_tenstatus__status_tenement__in=qs).values('pk','name').distinct().order_by('name'),
#             'statusdetailrelated': lambda qs: TenStatus.objects.filter(status_tenement__in=qs).values('pk','original').distinct().order_by('original'),
#             'materialcategory': lambda qs: MaterialCategory.objects.filter(category_material__majmat_occurrence__in=qs).values('pk','name').distinct().order_by('name'),
#             'materialname': lambda qs: Material.objects.filter(majmat_occurrence__in=qs).values('pk','name').distinct().order_by('name'),
#             'materialcategoryrelated': lambda qs: MaterialCategory.objects.filter(category_material__majmat_tenement__in=qs).values('pk','name').distinct().order_by('name'),
#             'materialnamerelated': lambda qs: Material.objects.filter(majmat_tenement__in=qs).values('pk','name').distinct().order_by('name'),
#         }
#         for item in changeDic:
#             dic[item] = changeDic[item]

#     return dic





# # This dictionary is used when filtering either the Tenement or Occurrence dataset for the remaining options in the filter groups or 
# #   to generate the data to display on the map.
# def getDatasetQueryDic(datasetName):
#     dic = {
#         'ausstate': {'query': 'state__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence']},
#         'region': {'query': 'govregion__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence']},
#         'local': {'query': 'localgov__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence']},
#         'province': {'query': 'geoprovince__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence']},
#         'rectangle': {'query': 'geom__intersects', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence']},
#         'buffer': {'query': 'geom__intersects', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence']},
#         'typesimple': {'query': 'typ__simple__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence']},
#         'typedetail': {'query': 'typ__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence']},
#         'statussimple': {'query': 'status__simple__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence']},
#         'statusdetail': {'query': 'status__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence']},
#         'lodgedate': {'query': 'lodgedate__gte', 'use': ['primary','related'], 'dataset': ['Tenement']},
#         'startdate': {'query': 'startdate__gte', 'use': ['primary','related'], 'dataset': ['Tenement']},
#         'enddate': {'query': 'enddate__gte', 'use': ['primary','related'], 'dataset': 'Tenement'},
#         'givenids': {'query': 'oid__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence']},
#         'newids': {'query': 'ind__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence']},
#         'typesimplerelated': {'query': 'typ__simple__in', 'use': ['related'], 'dataset': ['Tenement', 'Occurrence']},
#         'typedetailrelated': {'query': 'typ__in', 'use': ['related'], 'dataset': ['Tenement', 'Occurrence']},
#         'statussimplerelated': {'query': 'status__simple__in', 'use': ['related'], 'dataset': ['Tenement', 'Occurrence']},
#         'statusdetailrelated': {'query': 'status__in', 'use': ['related'], 'dataset': ['Tenement', 'Occurrence']},
#         'materialcategory': {'query': 'majmat__category__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence']},
#         'materialname': {'query': 'majmat__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence']},
#         'materialcategoryrelated': {'query': 'majmat__category__in', 'use': ['related'], 'dataset': ['Tenement', 'Occurrence']},
#         'materialnamerelated': {'query': 'majmat__in', 'use': ['related'], 'dataset': ['Tenement', 'Occurrence']},
#         'occurrencename': {'query': 'name__in', 'use': ['primary'], 'dataset': ['Occurrence']},
#         'holdertype': {'query': 'holder__name__typ__in', 'use': ['primary','related'], 'dataset': ['Tenement']},
#         'holderposition': {'query': 'holder__position__in', 'use': ['primary','related'], 'dataset': ['Tenement']},
#         'holdername': {'query': 'holder__name__in', 'use': ['primary','related'], 'dataset': ['Tenement']},
#     }
#     # # change the necessary query strings if the Occurrence is the selected dataset
#     # if datasetName == "Occurrence":
#     #     dic['rectangle']['query'] = 'geom__intersects'
#     #     dic['buffer']['query'] = 'geom__intersects'
#     #     dic['newids']['query'] = 'ind__in'
        
#     return dic






# # def getDatasetQueryDic(datasetName):
# #     dic = {
# #         'ausstate': {'query': 'state__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence'], 'direction': ['Filter']},
# #         'region': {'query': 'govregion__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence'], 'direction': ['Filter']},
# #         'local': {'query': 'localgov__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence'], 'direction': ['Filter']},
# #         'province': {'query': 'geoprovince__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence'], 'direction': ['Filter']},
# #         'rectangle': {'query': 'geom__intersects', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence'], 'direction': ['Filter']},
# #         'buffer': {'query': 'geom__intersects', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence'], 'direction': ['Filter']},
# #         'typesimple': {'query': 'typ__simple__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence'], 'direction': ['Filter', 'Buffer']},
# #         'typedetail': {'query': 'typ__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence'], 'direction': ['Filter', 'Buffer']},
# #         'statussimple': {'query': 'status__simple__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence'], 'direction': ['Filter', 'Buffer']},
# #         'statusdetail': {'query': 'status__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence'], 'direction': ['Filter', 'Buffer']},
# #         'lodgedate': {'query': 'lodgedate__gte', 'use': ['primary','related'], 'dataset': ['Tenement'], 'direction': ['Filter', 'Buffer']},
# #         'startdate': {'query': 'startdate__gte', 'use': ['primary','related'], 'dataset': ['Tenement'], 'direction': ['Filter', 'Buffer']},
# #         'enddate': {'query': 'enddate__gte', 'use': ['primary','related'], 'dataset': 'Tenement', 'direction': ['Filter', 'Buffer']},
# #         'givenids': {'query': 'oid__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence'], 'direction': ['Filter']},
# #         'newids': {'query': 'ind__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence'], 'direction': ['Filter']},
# #         'typesimplerelated': {'query': 'typ__simple__in', 'use': ['related'], 'dataset': ['Tenement', 'Occurrence'], 'direction': ['Filter', 'Buffer']},
# #         'typedetailrelated': {'query': 'typ__in', 'use': ['related'], 'dataset': ['Tenement', 'Occurrence'], 'direction': ['Filter', 'Buffer']},
# #         'statussimplerelated': {'query': 'status__simple__in', 'use': ['related'], 'dataset': ['Tenement', 'Occurrence'], 'direction': ['Filter', 'Buffer']},
# #         'statusdetailrelated': {'query': 'status__in', 'use': ['related'], 'dataset': ['Tenement', 'Occurrence'], 'direction': ['Filter', 'Buffer']},
# #         'materialcategory': {'query': 'majmat__category__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence'], 'direction': ['Filter', 'Buffer']},
# #         'materialname': {'query': 'majmat__in', 'use': ['primary'], 'dataset': ['Tenement', 'Occurrence'], 'direction': ['Filter', 'Buffer']},
# #         'materialcategoryrelated': {'query': 'majmat__category__in', 'use': ['related'], 'dataset': ['Tenement', 'Occurrence'], 'direction': ['Filter', 'Buffer']},
# #         'materialnamerelated': {'query': 'majmat__in', 'use': ['related'], 'dataset': ['Tenement', 'Occurrence'], 'direction': ['Filter', 'Buffer']},
# #         'occurrencename': {'query': 'name__in', 'use': ['primary'], 'dataset': ['Occurrence'], 'direction': ['Filter']},
# #         'holdertype': {'query': 'holder__name__typ__in', 'use': ['primary','related'], 'dataset': ['Tenement'], 'direction': ['Filter', 'Buffer']},
# #         'holderposition': {'query': 'holder__position__in', 'use': ['primary','related'], 'dataset': ['Tenement'], 'direction': ['Filter', 'Buffer']},
# #         'holdername': {'query': 'holder__name__in', 'use': ['primary','related'], 'dataset': ['Tenement'], 'direction': ['Filter', 'Buffer']},
# #     }
# #     # # change the necessary query strings if the Occurrence is the selected dataset
# #     # if datasetName == "Occurrence":
# #     #     dic['rectangle']['query'] = 'geom__intersects'
# #     #     dic['buffer']['query'] = 'geom__intersects'
# #     #     dic['newids']['query'] = 'ind__in'
        
# #     return dic