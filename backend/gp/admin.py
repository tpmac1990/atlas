from django.contrib.gis import admin
# from .models import Tenement, Occurrence
from django.apps import apps
from django.contrib.admin.sites import AlreadyRegistered
from leaflet.admin import LeafletGeoAdmin



app_models = apps.get_app_config('gp').get_models()
for model in app_models:
    try:
        admin.site.register(model)
    except AlreadyRegistered:
        pass
