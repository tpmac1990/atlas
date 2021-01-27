from django.urls import path
from django.views.generic import TemplateView
from .views import *

urlpatterns = [
    path('', TemplateView.as_view(template_name="index.html")),
    path('spatial-query/', SpatialQueryViewSet.as_view()),
    path('filter-data/', FilterViewSet.as_view()),
    path('test_id/', TestIDViewSet.as_view()),
    path('popup-query/', PopupViewSet.as_view()),
]

