# from rest_framework import serializers
# from gp.models import *


# class TitleTypeASerializer(serializers.ModelSerializer):
    
#     simple = serializers.SerializerMethodField()

#     def get_simple(self,obj):
#         return obj.simple.name

#     class Meta:
#         model = TenType
#         fields = ["fname","simple"]


# class TitleStatusASerializer(serializers.ModelSerializer):
#     simple = serializers.SerializerMethodField()

#     def get_simple(self,obj):
#         return obj.simple.name

#     class Meta:
#         model = TenType
#         fields = ["id","original","simple"]


# class SiteStatusASerializer(serializers.ModelSerializer):
#     simple = serializers.SerializerMethodField()

#     def get_simple(self,obj):
#         return obj.simple.name

#     class Meta:
#         model = OccStatus
#         fields = ["id","original","simple"]

