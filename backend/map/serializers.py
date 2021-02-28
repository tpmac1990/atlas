from rest_framework import serializers
from .models import *


class HolderTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HolderType
        fields = ["original"]

class ExchangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exchange
        fields = "__all__"

class ListedSerializer(serializers.ModelSerializer):
    exchange = ExchangeSerializer()

    class Meta:
        model = Listed
        fields = ["ticker","exchange"]



class ParentSerializer(serializers.ModelSerializer):
    holder_name = serializers.SerializerMethodField()
    typ = serializers.SerializerMethodField()
    listed = serializers.SerializerMethodField()

    def get_holder_name(self,obj):
        return obj.child.name

    def get_typ(self,obj):
        return obj.child.typ.original

    def get_listed(self,obj):
        return "Yes" if len(obj.child.listed.all()) != 0 else "No"

    class Meta:
        model = Parent
        fields = ["holder_name","percown","typ","listed"]


class ChildSerializer(serializers.ModelSerializer):
    holder_name = serializers.SerializerMethodField()
    typ = serializers.SerializerMethodField()
    listed = serializers.SerializerMethodField()

    def get_holder_name(self,obj):
        return obj.name.name

    def get_typ(self,obj):
        return obj.name.typ.original

    def get_listed(self,obj):
        return "Yes" if len(obj.name.listed.all()) != 0 else "No"

    class Meta:
        model = Parent
        fields = ["holder_name","percown","typ","listed"]


class HolderPositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HolderPosition
        fields = ["name"]


class TenHolderSerializer(serializers.ModelSerializer):
    position = HolderPositionSerializer()

    class Meta:
        model = TenHolder
        fields = ["percown","position","holder_tenement"]


class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ['code','name']

class ShoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shore
        fields = ['code','name']

class LocalGovSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocalGovernment
        fields = ["name"]

class GovRegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GovernmentRegion
        fields = ["name"]

class GeoProvSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeologicalProvince
        fields = ["name","ptype","rank"]


class TitleHolderSerializer(serializers.ModelSerializer):
    position = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()

    def get_position(self,obj):
        return obj.position.name

    def get_name(self,obj):
        return obj.name.name
    
    class Meta:
        model = TenHolder
        fields = ["percown","name","position"]


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ["code","name"]

class TitleTypeSerializer(serializers.ModelSerializer):
    
    simple = serializers.SerializerMethodField()
    act = serializers.SerializerMethodField()

    def get_simple(self,obj):
        return obj.simple.name

    def get_act(self,obj):
        return obj.act.name

    class Meta:
        model = TenType
        fields = ["fname","original","act","simple"]


class TitleTypeBriefSerializer(serializers.ModelSerializer):
    
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
        model = TenType
        fields = ["original","simple"]


class SiteTypeSerializer(serializers.ModelSerializer):
    simple = serializers.SerializerMethodField()

    def get_simple(self,obj):
        return obj.simple.name

    class Meta:
        model = TenType
        fields = ["original","simple"]


class SiteStatusSerializer(serializers.ModelSerializer):
    simple = serializers.SerializerMethodField()

    def get_simple(self,obj):
        return obj.simple.name

    class Meta:
        model = OccStatus
        fields = ["original","simple"]


class SiteBasicsSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    typ = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    def get_name(self,obj):
        return '; '.join([x.name for x in obj.name.all()])

    def get_typ(self,obj):
        return '; '.join([x.original for x in obj.typ.all()])

    def get_status(self,obj):
        return obj.status.original

    class Meta:
        model = Occurrence
        fields = ["ind","name","typ","status"]


class TitleBasicsSerializer(serializers.ModelSerializer):
    typ = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    def get_typ(self,obj):
        return obj.typ.original

    def get_status(self,obj):
        return obj.status.original

    class Meta:
        model = Tenement
        fields = ["ind","typ","status"]




class HolderSerializer(serializers.ModelSerializer):
    holder_name = serializers.CharField(source='name')
    company_type = HolderTypeSerializer(source='typ')
    listed = ListedSerializer(many=True, read_only=True)
    parent_company = ChildSerializer(many=True, read_only=True, source='child_holderrelation')
    subsidiaries = ParentSerializer(many=True, read_only=True, source='name_holderrelation')

    title_count = serializers.SerializerMethodField()
    site_count = serializers.SerializerMethodField()
    states = serializers.SerializerMethodField()

    # titles = serializers.SerializerMethodField()

    # def get_titles(self,obj):
    #     data = TitleBriefSerializer(Tenement.objects.filter(holder__name__name=obj.name), many=True).data
    #     return data

    def get_title_count(self,obj):
        # return len(Tenement.objects.filter(holder__name__name=obj.name))
        return [x.ind for x in Tenement.objects.filter(holder__name__name=obj.name)]

    def get_site_count(self,obj):
        return [x.ind for x in Occurrence.objects.filter(occurrence_tenement__holder__name__name=obj.name)]

    def get_states(self,obj):
        return [x[0] for x in State.objects.filter(state_tenement__holder__name__name=obj.name).values_list('name').distinct()]

    class Meta:
        model = Holder
        fields = ['holder_name','company_type','listed','subsidiaries','parent_company','title_count','site_count','states']


class SiteSerializer(serializers.ModelSerializer):
    state = StateSerializer()
    majmat = MaterialSerializer(many=True, read_only=True)
    minmat = MaterialSerializer(many=True, read_only=True)
    typ = SiteTypeSerializer(many=True, read_only=True)
    status = SiteStatusSerializer()
    localgov = LocalGovSerializer()
    govregion = GovRegionSerializer()
    geoprovince = GeoProvSerializer(many=True, read_only=True)
    name = serializers.SerializerMethodField()
    size = serializers.SerializerMethodField()
    tenements = TitleBasicsSerializer(many=True, read_only=True, source='occurrence_tenement')

    def get_name(self,obj):
        return [x.name for x in obj.name.all()]

    def get_size(self,obj):
        return obj.size.name

    class Meta:
        model = Occurrence
        fields = ["ind","typ","status","name","size","state","localgov","govregion","geoprovince","oid","majmat","minmat","tenements"]


class SiteBriefSerializer(serializers.ModelSerializer):
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
        return obj.govregion.name

    def get_localgov(self,obj):
        return obj.localgov.name

    def get_geoprovince(self,obj):
        return '; '.join([x.name for x in obj.geoprovince.all()])

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
        fields = ["ind","typdetail","typsimple","status","name","size","state","localgov","govregion","geoprovince","oid","majmat","minmat"]



class TitleBriefSerializer(serializers.ModelSerializer):

    state = serializers.SerializerMethodField()
    shore = serializers.SerializerMethodField()
    govregion = serializers.SerializerMethodField()
    geoprovince = serializers.SerializerMethodField()
    holder = serializers.SerializerMethodField()
    majmat = serializers.SerializerMethodField()
    minmat = serializers.SerializerMethodField()
    typ = TitleTypeBriefSerializer()
    status = TitleStatusSerializer()

    def get_state(self,obj):
        return obj.state.name

    def get_shore(self,obj):
        return obj.shore.name

    def get_govregion(self,obj):
        return '; '.join([x.name for x in obj.govregion.all()])

    def get_geoprovince(self,obj):
        return '; '.join([x.name for x in obj.geoprovince.all()])

    def get_holder(self,obj):
        return '; '.join([x.name.name for x in obj.holder.all()])

    def get_majmat(self,obj):
        return '; '.join([x.name for x in obj.majmat.all()])

    def get_minmat(self,obj):
        return '; '.join([x.name for x in obj.minmat.all()])


    class Meta:
        model = Tenement
        fields = ["ind","lodgedate","startdate","enddate","typ","status","state","shore","govregion","geoprovince","holder","majmat","minmat"]



class TitleSerializer(serializers.ModelSerializer):

    state = StateSerializer()
    shore = ShoreSerializer()
    localgov = LocalGovSerializer(many=True, read_only=True)
    govregion = GovRegionSerializer(many=True, read_only=True)
    geoprovince = GeoProvSerializer(many=True, read_only=True)
    holder = TitleHolderSerializer(many=True, read_only=True)
    majmat = MaterialSerializer(many=True, read_only=True)
    minmat = MaterialSerializer(many=True, read_only=True)
    typ = TitleTypeSerializer()
    status = TitleStatusSerializer()
    occurrence = SiteBasicsSerializer(many=True, read_only=True)

    class Meta:
        model = Tenement
        fields = ["ind","lodgedate","startdate","enddate","typ","status","state","shore","localgov","govregion","geoprovince","oid","holder","occurrence","majmat","minmat"]



class HolderListSerializer(serializers.ModelSerializer):
    value = serializers.CharField(source='id')
    label = serializers.CharField(source='name')

    class Meta:
        model = Holder
        fields = ["value","label"]





# class TitleBriefSerializer(serializers.ModelSerializer):

#     state = serializers.SerializerMethodField()
#     majmat = serializers.SerializerMethodField()
#     typ = serializers.SerializerMethodField()
#     status = serializers.SerializerMethodField()

#     def get_majmat(self,obj):
#         return '; '.join([x.code for x in obj.majmat.all()])

#     def get_typ(self,obj):
#         return obj.typ.fname

#     def get_status(self,obj):
#         return obj.typ.original

#     def get_state(self,obj):
#         return obj.state.code

#     class Meta:
#         model = Tenement
#         fields = ["ind","lodgedate","startdate","enddate","typ","status","state","majmat"]

