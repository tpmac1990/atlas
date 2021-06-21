from rest_framework import serializers
from gp.models import State, Shore, LocalGovernment, GovernmentRegion, GeologicalProvince, TenHolder, Material, TenType, Occurrence, TenOriginalID, Tenement, Holder, Parent

# ##############################################################################################
# Reading from db
# ##############################################################################################

class StateSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])

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
        fields = ["_id","name","ptype","rank"]


class TitleHolderSerializer(serializers.ModelSerializer):
    # position = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    _id = serializers.SerializerMethodField()
    # position_id = serializers.SerializerMethodField(source='position')

    # def get_position(self,obj):
    #     return obj.position.name

    # def get_position_id(self,obj):
    #     return obj.position._id

    def get_name(self,obj):
        return obj.name.name

    def get__id(self,obj):
        return obj.name._id
    
    class Meta:
        model = TenHolder
        # fields = ["_id","percown","name","position","position_id"]
        fields = ["_id","percown","name"]

class MaterialSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])

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
        fields = ["_id","fname","original","act","simple"]

class TitleStatusSerializer(serializers.ModelSerializer):
    simple = serializers.SerializerMethodField()

    def get_simple(self,obj):
        return obj.simple.name

    class Meta:
        model = TenType
        fields = ["_id","original","simple"]

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


class OidTitleSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])

    class Meta:
        model = TenOriginalID
        fields = ["code"]


class TitleDetailSerializer(serializers.ModelSerializer):
    state = StateSerializer()
    shore = ShoreSerializer()
    localgov = LocalGovSerializer(many=True, read_only=True)
    govregion = GovRegionSerializer(many=True, read_only=True)
    geoprovince = GeoProvSerializer(many=True, read_only=True)
    holder = TitleHolderSerializer(many=True, read_only=True, source='tenement_tenholder')
    parents = serializers.SerializerMethodField(source='holder')
    majmat = MaterialSerializer(many=True, read_only=True)
    minmat = MaterialSerializer(many=True, read_only=True)
    typ = TitleTypeSerializer()
    status = TitleStatusSerializer()
    occurrence = SiteBasicsSerializer(many=True, read_only=True)
    oid = OidTitleSerializer(many=True, read_only=True)

    # needs to be optimized
    def get_parents(self,obj):
        parent_ids = [x._id for x in obj.holder.all()]
        parents = Parent.objects.filter(child__in=parent_ids)
        return [x.name.name for x in parents]

    class Meta:
        model = Tenement
        fields = ["ind","lodgedate","startdate","enddate","typ","status","state","shore","localgov","govregion","geoprovince","holder","parents","oid","occurrence","majmat","minmat"]



# ##############################################################################################
# Updating db
# ##############################################################################################

class TitleUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tenement
        fields = ["geom","ind","lodgedate","startdate","enddate","typ","status","state","shore","holder","localgov","govregion","geoprovince","oid","occurrence","majmat","minmat"]

    def create(self, validated_data):
        # list of m2m fields
        names = ["localgov","govregion","geoprovince","oid","occurrence","majmat","minmat"]
        # dictionary of m2m fields with their list of relations. pop these from validated_data
        dic = {x: validated_data.pop(x) for x in names}
        # create instance
        instance = super().create(validated_data)
        # create m2m relations
        for x in names:
            getattr(instance, x).set(dic[x])
        return instance


class OidWriteTitleSerializer(serializers.ModelSerializer):

    class Meta:
        model = TenOriginalID
        fields = ["code","user_name"]

