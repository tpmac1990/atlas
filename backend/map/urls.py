from django.urls import path, re_path
from django.views.generic import TemplateView
from .views import *

urlpatterns = [
    path('', TemplateView.as_view(template_name="index.html")),
    path('attribution', TemplateView.as_view(template_name="index.html")),
    path('detail', TemplateView.as_view(template_name="index.html")),
    path('detail/holder', TemplateView.as_view(template_name="index.html")),
    # path('detail/holder/9389', TemplateView.as_view(template_name="index.html")),
    re_path(r'^detail/holder/(?P<id>\d+)/$', TemplateView.as_view(template_name="index.html")),
    path('detail/site', TemplateView.as_view(template_name="index.html")),
    re_path(r'^detail/site/[^\/]+$', TemplateView.as_view(template_name="index.html")),
    path('detail/title', TemplateView.as_view(template_name="index.html")),
    re_path(r'^detail/title/[^\/]+$', TemplateView.as_view(template_name="index.html")),

    # r'^.*$' = accepts everything
    
    # re_path(r'detail/[^\/]+$', TemplateView.as_view(template_name="index.html")),

    path('spatial-query/', SpatialQueryViewSet.as_view()),
    path('filter-data/', FilterViewSet.as_view()),
    path('test_id/', TestIDViewSet.as_view()),
    path('popup-query/', PopupViewSet.as_view()),
    path('data-by-indexes/', DataByIndexesViewSet.as_view()),
    # path('detail-search/',DetailViewSet.as_view()),
    path('detail-holder/<str:pk>/',DetailHolderViewSet.as_view()),
    path('detail-title/<str:pk>/',DetailTitleViewSet.as_view()),
    path('detail-site/<str:pk>/',DetailSiteViewSet.as_view()),

    path('holders-list/',HolderListViewSet.as_view()),
    
]

