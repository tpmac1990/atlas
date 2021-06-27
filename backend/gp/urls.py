from django.urls import path, re_path
from django.views.generic import TemplateView
from .views import *
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name="index.html")),
    # path('404/', TemplateView.as_view(template_name="index.html")),
    # path('503/', TemplateView.as_view(template_name="index.html")),
    re_path(r'^404/(.*?)', TemplateView.as_view(template_name="index.html")),
    re_path(r'^503/(.*?)', TemplateView.as_view(template_name="index.html")),
    path('attribution', TemplateView.as_view(template_name="index.html")),
    path('detail/', TemplateView.as_view(template_name="index.html")),
    path('detail/holder/', TemplateView.as_view(template_name="index.html")),
    path('stayposted/', TemplateView.as_view(template_name="index.html")),
    path('feedback/', TemplateView.as_view(template_name="index.html")),
    path('contact/', TemplateView.as_view(template_name="index.html")),
    path('contact/home/', TemplateView.as_view(template_name="index.html")),
    path('contact/feedback/', TemplateView.as_view(template_name="index.html")),
    path('contact/join-mail-list/', TemplateView.as_view(template_name="index.html")),
    path('contact/contact-info/', TemplateView.as_view(template_name="index.html")),
    # path('detail/holder/9389', TemplateView.as_view(template_name="index.html")),
    re_path(r'^detail/holder/(?P<id>\d+)/$', TemplateView.as_view(template_name="index.html")),
    # re_path(r'^detail/holder/[^\/]+$', TemplateView.as_view(template_name="index.html")),
    path('detail/site/', TemplateView.as_view(template_name="index.html")),
    re_path(r'^detail/site/[^\/]+/$', TemplateView.as_view(template_name="index.html")),
    path('detail/title/', TemplateView.as_view(template_name="index.html")),
    re_path(r'^detail/title/[^\/]+/$', TemplateView.as_view(template_name="index.html")),
    path('detail/home/', TemplateView.as_view(template_name="index.html")),

    # path('detail/site', TemplateView.as_view(template_name="index.html")),
    # re_path(r'^detail/site/[^\/]+$', TemplateView.as_view(template_name="index.html")),
    re_path(r'^detail/site/edit/[^\/]+/$', TemplateView.as_view(template_name="index.html")),
    re_path(r'^detail/title/edit/[^\/]+/$', TemplateView.as_view(template_name="index.html")),
    re_path(r'^detail/holder/edit/(?P<id>\d+)/$', TemplateView.as_view(template_name="index.html")),

    # r'^.*$' = accepts everything
    
    # re_path(r'detail/[^\/]+$', TemplateView.as_view(template_name="index.html")),

    path('spatial-query/', SpatialQueryViewSet.as_view()),
    path('filter-data/', FilterViewSet.as_view()),
    path('test_id/', TestIDViewSet.as_view()),
    # path('popup-query/', PopupViewSet.as_view()),
    path('map-popup/<str:pk>/',PopupViewSet.as_view()),
    path('data-by-indexes/', DataByIndexesViewSet.as_view()),
    # path('detail-search/',DetailViewSet.as_view()),
    path('detail-holder/<str:pk>/',DetailHolderViewSet.as_view()),
    
    path('detail-title/<str:pk>/',DetailTitleViewSet.as_view()),
    path('detail-site/<str:pk>/',DetailSiteViewSet.as_view()),

    # path('site-edit/<str:pk>/',SiteEditViewSet.as_view()),
    path('dropdown-data/<str:pk>/',DropdownDataViewSet.as_view()), # pk is the model name

    path('holders-list/',HolderListViewSet.as_view()),

    path('site-group/',SiteGroupViewSet.as_view()),
    # path('title-group/',SiteGroupViewSet.as_view()),
    
    path('edit-site/<str:pk>/',EditSiteViewSet.as_view()),
    path('edit-title/<str:pk>/',EditTitleViewSet.as_view()),
    path('edit-holder/<str:pk>/',EditHolderViewSet.as_view()),

    # creates a holder using a name and type. passed from the holder detail
    path('create-holder/',CreateHolderViewSet.as_view()),

    path('create-feedback/',CreateFeedbackViewSet.as_view()),
    path('create-keep-posted/',CreateKeepPostedViewSet.as_view()),   
]
