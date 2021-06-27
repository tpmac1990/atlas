from rest_framework import serializers
from gp.models import OccStatus, Occurrence


class SiteStatusSerializer(serializers.ModelSerializer):
    simple = serializers.SerializerMethodField()

    def get_simple(self,obj):
        return obj.simple.name

    class Meta:
        model = OccStatus
        fields = ["original","simple"]


class SiteTableSerializer(serializers.ModelSerializer):
    state = serializers.SerializerMethodField()
    majmat = serializers.SerializerMethodField()
    minmat = serializers.SerializerMethodField()
    typdetail = serializers.SerializerMethodField()
    typsimple = serializers.SerializerMethodField()
    status = SiteStatusSerializer()
    localgov = serializers.SerializerMethodField()
    govregion = serializers.SerializerMethodField()
    geoprovince = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    size = serializers.SerializerMethodField()
    oid = serializers.SerializerMethodField()

    def get_oid(self,obj):
        return '; '.join([x.code for x in obj.oid.all()])

    def get_typdetail(self,obj):
        return '; '.join([x.original for x in obj.typ.all()])

    def get_typsimple(self,obj):
        return '; '.join([x.simple.name for x in obj.typ.all()])

    def get_state(self,obj):
        return obj.state.name

    def get_govregion(self,obj):
        return obj.govregion.name if obj.govregion else ''

    def get_localgov(self,obj):
        return obj.localgov.name if obj.localgov else ''

    def get_geoprovince(self,obj):
        return '; '.join([x.name for x in obj.geoprovince.all()]) if obj.geoprovince else ''

    def get_majmat(self,obj):
        return '; '.join([x.name for x in obj.majmat.all()])

    def get_minmat(self,obj):
        return '; '.join([x.name for x in obj.minmat.all()])

    def get_name(self,obj):
        return '; '.join([x.name for x in obj.name.all()])

    def get_size(self,obj):
        return obj.size.name

    class Meta:
        model = Occurrence
        # fields = ["ind","state","typdetail","majmat","minmat","typsimple","status","name","size","oid","govregion","localgov"]
        fields = ["ind","typdetail","typsimple","status","name","size","state","localgov","govregion","geoprovince","oid","majmat","minmat"]