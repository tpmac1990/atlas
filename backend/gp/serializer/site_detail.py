from rest_framework import serializers
from gp.models import State, TenType, Material, OccStatus, LocalGovernment, GovernmentRegion, GeologicalProvince, OccName, OccSize, OccOriginalID, Tenement, Occurrence


# ##############################################################################################
# Reading from db
# ##############################################################################################

class StateSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])

    class Meta:
        model = State
        fields = ['code','name']


class MaterialSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])

    class Meta:
        model = Material
        fields = ["code","name"]


class SiteTypeSerializer(serializers.ModelSerializer):
    simple = serializers.SerializerMethodField()

    def get_simple(self,obj):
        return obj.simple.name

    class Meta:
        model = TenType
        fields = ["_id","original","simple"]


class SiteStatusSerializer(serializers.ModelSerializer):
    simple = serializers.SerializerMethodField()

    def get_simple(self,obj):
        return obj.simple.name

    class Meta:
        model = OccStatus
        fields = ["_id","original","simple"]


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


class OccNameSerializer(serializers.ModelSerializer):

    class Meta:
        model = OccName
        fields = ["_id","name"]

    # def create(self, validated_data):
    #     # validated_data['_id'] = OccName.objects.latest('_id').pk + 1 # had to add it earlier otherwise would'nt be valid
    #     validated_data['user_name'] = 'unknown user'
    #     instance = OccName.objects.create(**validated_data)
    #     return instance


class SizeSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])

    class Meta:
        model = OccSize
        fields = ["code","name"]


class OidSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])

    class Meta:
        model = OccOriginalID
        fields = ["code"]



class TitleSerializer(serializers.ModelSerializer):
    typ = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    def get_typ(self,obj):
        return obj.typ.original

    def get_status(self,obj):
        return obj.status.original

    class Meta:
        model = Tenement
        fields = ["ind","typ","status"]


# required=False # optionally none
# many=True # a nested list of items
class SiteDetailSerializer(serializers.ModelSerializer):
    state = StateSerializer()
    majmat = MaterialSerializer(many=True,read_only=True)
    minmat = MaterialSerializer(many=True,read_only=True)
    typ = SiteTypeSerializer(many=True,read_only=True)
    status = SiteStatusSerializer()
    localgov = LocalGovSerializer()
    govregion = GovRegionSerializer()
    geoprovince = GeoProvSerializer(many=True,read_only=True)
    name = OccNameSerializer(many=True,read_only=True)
    size = SizeSerializer()
    oid = OidSerializer(many=True,read_only=True)
    tenements = TitleSerializer(many=True, read_only=True, source='occurrence_tenement')

    class Meta:
        model = Occurrence
        fields = ["ind","typ","status","name","size","state","localgov","govregion","geoprovince","oid","majmat","minmat","tenements"]
        # fields = ["ind"]



# ##############################################################################################
# Writting to db
# ##############################################################################################

# used to copy an instance and then re-enter it with a new ind and changes
class SiteWriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Occurrence
        fields = ["geom","ind","typ","status","name","size","state","localgov","govregion","geoprovince","oid","majmat","minmat","occurrence_tenement"]

    def create(self, validated_data):
        # list of m2m fields
        names = ["typ","name","geoprovince","oid","majmat","minmat","occurrence_tenement"]
        # remove blank fields
        required_names = [x for x in names if x in validated_data]
        # dictionary of m2m fields with their list of relations. pop these from validated_data
        dic = {x: validated_data.pop(x) for x in required_names}
        # create instance
        instance = super().create(validated_data)
        # create m2m relations
        for x in required_names:
            getattr(instance, x).set(dic[x])
        return instance



class OidWriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = OccOriginalID
        fields = ["code","user_name"]


class OccNameWriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = OccName
        fields = ["_id","name","user_name"]

    # def create(self, validated_data):
    #     # validated_data['_id'] = OccName.objects.latest('_id').pk + 1 # had to add it earlier otherwise would'nt be valid
    #     validated_data['user_name'] = 'unknown user'
    #     instance = OccName.objects.create(**validated_data)
    #     return instance