from rest_framework import serializers
from gp.models import Tenement, Occurrence
# from .generic import TitleTypeASerializer, TitleStatusASerializer, SiteStatusASerializer

def slice_long_string(string):
    if len(string) > 33:
        return "%s ..." %(string[0:33])
    else:
        return string


class TitlePopupSerializer(serializers.ModelSerializer):
    holder = serializers.SerializerMethodField()
    majmat = serializers.SerializerMethodField()
    typ = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    oid = serializers.SerializerMethodField()

    def get_oid(self,obj):
        return slice_long_string('; '.join([x.code for x in obj.oid.all()]))

    def get_holder(self,obj):
        return slice_long_string('; '.join([x.name for x in obj.holder.all()]))

    def get_majmat(self,obj):
        return slice_long_string('; '.join([x.name for x in obj.majmat.all()]))

    def get_typ(self,obj):
        return slice_long_string(obj.typ.fname)

    def get_status(self,obj):
        return slice_long_string(obj.status.original)


    class Meta:
        model = Tenement
        fields = ["ind","lodgedate","startdate","enddate","typ","status","holder","oid","majmat"]



class SitePopupSerializer(serializers.ModelSerializer):
    majmat = serializers.SerializerMethodField()
    typdetail = serializers.SerializerMethodField()
    typsimple = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    size = serializers.SerializerMethodField()
    oid = serializers.SerializerMethodField()

    def get_oid(self,obj):
        return slice_long_string('; '.join([x.code for x in obj.oid.all()]))

    def get_typdetail(self,obj):
        return slice_long_string('; '.join([x.original for x in obj.typ.all()]))

    def get_typsimple(self,obj):
        return slice_long_string('; '.join([x.simple.name for x in obj.typ.all()]))

    def get_majmat(self,obj):
        return slice_long_string('; '.join([x.name for x in obj.majmat.all()]))

    def get_name(self,obj):
        return slice_long_string('; '.join([x.name for x in obj.name.all()]))

    def get_size(self,obj):
        return slice_long_string(obj.size.name)

    def get_status(self,obj):
        return slice_long_string(obj.status.original)

    class Meta:
        model = Occurrence
        fields = ["ind","typdetail","typsimple","status","name","size","oid","majmat"]