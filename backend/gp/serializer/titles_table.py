from rest_framework import serializers
from gp.models import TenType, TenStatus, Tenement, Parent



class TitleTypeSerializer(serializers.ModelSerializer):
    
    simple = serializers.SerializerMethodField()

    def get_simple(self,obj):
        return obj.simple.name

    class Meta:
        model = TenType
        fields = ["fname","simple"]


class TitleStatusSerializer(serializers.ModelSerializer):
    simple = serializers.SerializerMethodField()

    def get_simple(self,obj):
        return obj.simple.name

    class Meta:
        model = TenStatus
        fields = ["original","simple"]
        # fields = ["_id","original","simple"]


class TitleTableSerializer(serializers.ModelSerializer):
    state = serializers.SerializerMethodField()
    shore = serializers.SerializerMethodField()
    govregion = serializers.SerializerMethodField()
    geoprovince = serializers.SerializerMethodField()
    holder = serializers.SerializerMethodField()
    parent = serializers.SerializerMethodField()
    majmat = serializers.SerializerMethodField()
    minmat = serializers.SerializerMethodField()
    typ = TitleTypeSerializer()
    status = TitleStatusSerializer()
    oid = serializers.SerializerMethodField()

    def get_oid(self,obj):
        return '; '.join([x.code for x in obj.oid.all()])

    def get_state(self,obj):
        return obj.state.name

    def get_shore(self,obj):
        return obj.shore.name

    def get_govregion(self,obj):
        return '; '.join([x.name for x in obj.govregion.all()])

    def get_geoprovince(self,obj):
        return '; '.join([x.name for x in obj.geoprovince.all()])

    def get_holder(self,obj):
        return '; '.join([x.name for x in obj.holder.all()])

    def get_parent(self,obj):
        return '; '.join([x.name.name for x in Parent.objects.filter(child__in=obj.holder.all())])

    def get_majmat(self,obj):
        return '; '.join([x.name for x in obj.majmat.all()])

    def get_minmat(self,obj):
        return '; '.join([x.name for x in obj.minmat.all()])


    class Meta:
        model = Tenement
        fields = ["ind","lodgedate","startdate","enddate","typ","status","state","shore","govregion","geoprovince","holder","parent","oid","majmat","minmat"]