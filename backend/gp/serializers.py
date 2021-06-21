from rest_framework import serializers
from .models import *


class KeepPostedSerializer(serializers.ModelSerializer):
    class Meta:
        model = KeepPosted
        fields = ["first_name","last_name","email"]

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ["name","email","feedback","rating"]


class TenHolderSerializer(serializers.ModelSerializer):
    # position = HolderPositionSerializer(read_only=True)

    class Meta:
        model = TenHolder
        # fields = ["percown","position","holder_tenement"]
        fields = ["percown","holder_tenement"]


# class TenHolderPlainSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = TenHolder
#         fields = ["percown","name","position","tenement"]

#     def create(self, validated_data):
#         # I have to add the id field manually as a result of including the id in bulk table load which affects the sql auto-increment.
#         validated_data['id'] = TenHolder.objects.latest('pk').pk + 1
#         return validated_data


# class TitleTypeBriefSerializer(serializers.ModelSerializer):
    
#     simple = serializers.SerializerMethodField()

#     def get_simple(self,obj):
#         return obj.simple.name

#     class Meta:
#         model = TenType
#         fields = ["fname","simple"]


# class TitleStatusSerializer(serializers.ModelSerializer):
#     simple = serializers.SerializerMethodField()

#     def get_simple(self,obj):
#         return obj.simple.name

#     class Meta:
#         model = TenType
#         fields = ["id","original","simple"]


# # used to add a new Holder name with type
# class HolderAndTypeSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Holder
#         fields = ['name','typ']

#     def create(self, validated_data):
#         validated_data['id'] = Holder.objects.latest('pk').pk + 1
#         instance = Holder.objects.create(**validated_data)
#         return instance



# # used to copy an instance and then re-enter it with a new ind and changes
# class SitePlainSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Occurrence
#         fields = ["geom","ind","typ","status","name","size","state","localgov","govregion","geoprovince","oid","majmat","minmat","occurrence_tenement"]

#     def create(self, validated_data):
#         # list of m2m fields
#         # print('hello')
#         # print(validated_data)
#         # print('bye')
#         names = ["typ","name","geoprovince","oid","majmat","minmat","occurrence_tenement"]
#         # remove blank fields
#         required_names = [x for x in names if x in validated_data]
#         # dictionary of m2m fields with their list of relations. pop these from validated_data
#         dic = {x: validated_data.pop(x) for x in required_names}
#         # create instance
#         instance = super().create(validated_data)
#         # create m2m relations
#         for x in required_names:
#             getattr(instance, x).set(dic[x])
#         return instance



# class SiteBriefSerializer(serializers.ModelSerializer):
#     state = serializers.SerializerMethodField()
#     majmat = serializers.SerializerMethodField()
#     minmat = serializers.SerializerMethodField()
#     typdetail = serializers.SerializerMethodField()
#     typsimple = serializers.SerializerMethodField()
#     status = SiteStatusSerializer()
#     localgov = serializers.SerializerMethodField()
#     govregion = serializers.SerializerMethodField()
#     geoprovince = serializers.SerializerMethodField()
#     name = serializers.SerializerMethodField()
#     size = serializers.SerializerMethodField()
#     oid = serializers.SerializerMethodField()

#     def get_oid(self,obj):
#         return '; '.join([x.code for x in obj.oid.all()])

#     def get_typdetail(self,obj):
#         return '; '.join([x.original for x in obj.typ.all()])

#     def get_typsimple(self,obj):
#         return '; '.join([x.simple.name for x in obj.typ.all()])

#     def get_state(self,obj):
#         return obj.state.name

#     def get_govregion(self,obj):
#         return obj.govregion.name

#     def get_localgov(self,obj):
#         return obj.localgov.name

#     def get_geoprovince(self,obj):
#         return '; '.join([x.name for x in obj.geoprovince.all()])

#     def get_majmat(self,obj):
#         return '; '.join([x.name for x in obj.majmat.all()])

#     def get_minmat(self,obj):
#         return '; '.join([x.name for x in obj.minmat.all()])

#     def get_name(self,obj):
#         return '; '.join([x.name for x in obj.name.all()])

#     def get_size(self,obj):
#         return obj.size.name

#     class Meta:
#         model = Occurrence
#         fields = ["ind","typdetail","typsimple","status","name","size","state","localgov","govregion","geoprovince","oid","majmat","minmat"]



# class TitleBriefSerializer(serializers.ModelSerializer):
#     state = serializers.SerializerMethodField()
#     shore = serializers.SerializerMethodField()
#     govregion = serializers.SerializerMethodField()
#     geoprovince = serializers.SerializerMethodField()
#     holder = serializers.SerializerMethodField()
#     majmat = serializers.SerializerMethodField()
#     minmat = serializers.SerializerMethodField()
#     typ = TitleTypeBriefSerializer()
#     status = TitleStatusSerializer()
#     oid = serializers.SerializerMethodField()

#     def get_oid(self,obj):
#         return '; '.join([x.code for x in obj.oid.all()])

#     def get_state(self,obj):
#         return obj.state.name

#     def get_shore(self,obj):
#         return obj.shore.name

#     def get_govregion(self,obj):
#         return '; '.join([x.name for x in obj.govregion.all()])

#     def get_geoprovince(self,obj):
#         return '; '.join([x.name for x in obj.geoprovince.all()])

#     def get_holder(self,obj):
#         return '; '.join([x.name for x in obj.holder.all()])

#     def get_majmat(self,obj):
#         return '; '.join([x.name for x in obj.majmat.all()])

#     def get_minmat(self,obj):
#         return '; '.join([x.name for x in obj.minmat.all()])


#     class Meta:
#         model = Tenement
#         fields = ["ind","lodgedate","startdate","enddate","typ","status","state","shore","govregion","geoprovince","holder","oid","majmat","minmat"]



# class TitlePlainSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Tenement
#         fields = ["geom","ind","lodgedate","startdate","enddate","typ","status","state","shore","holder","localgov","govregion","geoprovince","oid","occurrence","majmat","minmat"]

#     def create(self, validated_data):
#         # print(validated_data)
#         # list of m2m fields
#         names = ["localgov","govregion","geoprovince","oid","occurrence","majmat","minmat"]
#         # dictionary of m2m fields with their list of relations. pop these from validated_data
#         dic = {x: validated_data.pop(x) for x in names}
#         # create instance
#         instance = super().create(validated_data)
#         # create m2m relations
#         for x in names:
#             getattr(instance, x).set(dic[x])
#         return instance



class HolderListSerializer(serializers.ModelSerializer):
    value = serializers.CharField(source='id')
    label = serializers.CharField(source='name')

    class Meta:
        model = Holder
        fields = ["value","label"]





# class HolderTypeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = HolderType
#         fields = ["original"]

# class ExchangeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Exchange
#         fields = "__all__"

# class ListedSerializer(serializers.ModelSerializer):
#     exchange = ExchangeSerializer()
#     # exchange_w = serializers.CharField(source='exchange', write_only=True)

#     class Meta:
#         model = Listed
#         fields = ["ticker","exchange"]


# class ListedSimpleSerializer(serializers.ModelSerializer):
#     exchange_id = serializers.SerializerMethodField(source='exchange')
#     exchange_name = serializers.SerializerMethodField(source='exchange')

#     def get_exchange_id(self,obj):
#         return obj.exchange.code

#     def get_exchange_name(self,obj):
#         return obj.exchange.name

#     class Meta:
#         model = Listed
#         fields = ["_id","ticker","exchange_id","exchange_name"]
# # ,"exchange_id","exchange_name"

# class ParentSerializer(serializers.ModelSerializer):
#     name = serializers.SerializerMethodField(source='holder_name')
#     _id = serializers.SerializerMethodField()
#     typ = serializers.SerializerMethodField()
#     typ_id = serializers.SerializerMethodField(source='typ') # provide id for dropdown in edit select
#     listed = serializers.SerializerMethodField()

#     def get_name(self,obj):
#         return obj.child.name

#     def get__id(self,obj):
#         return obj.child._id

#     def get_typ(self,obj):
#         return obj.child.typ.original

#     def get_typ_id(self,obj):
#         return obj.child.typ._id

#     def get_listed(self,obj):
#         return "Yes" if len(obj.child.listed.all()) != 0 else "No"

#     class Meta:
#         model = Parent
#         fields = ["_id","name","percown","typ","listed","typ_id"]


# class ChildSerializer(serializers.ModelSerializer):
#     name = serializers.SerializerMethodField(source='holder_name')
#     _id = serializers.SerializerMethodField()
#     typ = serializers.SerializerMethodField()
#     typ_id = serializers.SerializerMethodField(source='typ') # provide id for dropdown in edit select
#     listed = serializers.SerializerMethodField()

#     def get_name(self,obj):
#         return obj.name.name

#     def get__id(self,obj):
#         return obj.name._id

#     def get_typ(self,obj):
#         return obj.name.typ.original

#     def get_typ_id(self,obj):
#         return obj.name.typ._id

#     def get_listed(self,obj):
#         return "Yes" if len(obj.name.listed.all()) != 0 else "No"

#     class Meta:
#         model = Parent
#         fields = ["_id","name","percown","typ","listed","typ_id"]


# class HolderPositionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = HolderPosition
#         fields = ["name"]


# class HolderSerializer(serializers.ModelSerializer):
#     holder_name = serializers.CharField(source='name')
#     company_type = HolderTypeSerializer(source='typ')
#     listed = ListedSerializer(many=True, read_only=True)
#     listed_simple = ListedSimpleSerializer(many=True, read_only=True, source='listed')
#     parent_company = ChildSerializer(many=True, read_only=True, source='child_holderrelation')
#     subsidiaries = ParentSerializer(many=True, read_only=True, source='name_holderrelation')

#     title_count = serializers.SerializerMethodField()
#     site_count = serializers.SerializerMethodField()
#     states = serializers.SerializerMethodField()

#     def get_title_count(self,obj):
#         return [x.ind for x in Tenement.objects.filter(holder__name=obj.name)]

#     def get_site_count(self,obj):
#         return [x.ind for x in Occurrence.objects.filter(occurrence_tenement__holder__name=obj.name)]

#     def get_states(self,obj):
#         return [x[0] for x in State.objects.filter(state_tenement__holder__name=obj.name).values_list('name').distinct()]

#     class Meta:
#         model = Holder
#         # fields = ['holder_name','listed_simple','company_type','listed','subsidiaries','parent_company','title_count','site_count','states']
#         fields = ['holder_name','listed_simple','company_type','listed','subsidiaries','parent_company','title_count','site_count','states']


# class ListedWriteSerializer(serializers.ModelSerializer): # needs to be merged with above
#     exchange_id = serializers.CharField(source='exchange')

#     class Meta:
#         model = Listed
#         fields = ["ticker","exchange_id"]

#     def create(self, validated_data):
#         validated_data['id'] = Listed.objects.latest('pk').pk + 1
#         validated_data['exchange'] = Exchange.objects.get(pk=validated_data['exchange'])
#         instance = Listed.objects.create(**validated_data)
#         return instance


# class ParentPlainSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Parent
#         fields = ["name","percown","child"]


# class StateSerializer(serializers.ModelSerializer):
#     code = serializers.CharField(validators=[])

#     class Meta:
#         model = State
#         fields = ['code','name']

# class ShoreSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Shore
#         fields = ['code','name']

# class LocalGovSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = LocalGovernment
#         fields = ["name"]

# class GovRegionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = GovernmentRegion
#         fields = ["name"]

# class GeoProvSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = GeologicalProvince
#         fields = ["id","name","ptype","rank"]


# class TitleHolderSerializer(serializers.ModelSerializer):
#     position = serializers.SerializerMethodField()
#     name = serializers.SerializerMethodField()
#     id = serializers.SerializerMethodField()
#     position_id = serializers.SerializerMethodField(source='position')

#     def get_position(self,obj):
#         return obj.position.name

#     def get_position_id(self,obj):
#         return obj.position.id

#     def get_name(self,obj):
#         return obj.name.name

#     def get_id(self,obj):
#         return obj.name.id
    
#     class Meta:
#         model = TenHolder
#         fields = ["id","percown","name","position","position_id"]


# class MaterialSerializer(serializers.ModelSerializer):
#     code = serializers.CharField(validators=[])

#     class Meta:
#         model = Material
#         fields = ["code","name"]

# class TitleTypeSerializer(serializers.ModelSerializer):
    
#     simple = serializers.SerializerMethodField()
#     act = serializers.SerializerMethodField()

#     def get_simple(self,obj):
#         return obj.simple.name

#     def get_act(self,obj):
#         return obj.act.name

#     class Meta:
#         model = TenType
#         fields = ["id","fname","original","act","simple"]

# class OccNameSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = OccName
#         fields = ["id","name"]

#     def create(self, validated_data):
#         validated_data['id'] = OccName.objects.latest('pk').pk + 1
#         instance = OccName.objects.create(**validated_data)
#         return instance

        
# class SizeSerializer(serializers.ModelSerializer):
#     code = serializers.CharField(validators=[])

#     class Meta:
#         model = OccSize
#         fields = ["code","name"]

        
# class OidSerializer(serializers.ModelSerializer):
#     code = serializers.CharField(validators=[])

#     class Meta:
#         model = OccOriginalID
#         fields = ["code"]

# class OidTitleSerializer(serializers.ModelSerializer):
#     code = serializers.CharField(validators=[])

#     class Meta:
#         model = TenOriginalID
#         fields = ["code"]


# class SiteTypeSerializer(serializers.ModelSerializer):
#     simple = serializers.SerializerMethodField()

#     def get_simple(self,obj):
#         return obj.simple.name

#     class Meta:
#         model = TenType
#         fields = ["id","original","simple"]


# class SiteStatusSerializer(serializers.ModelSerializer):
#     simple = serializers.SerializerMethodField()

#     def get_simple(self,obj):
#         return obj.simple.name

#     class Meta:
#         model = OccStatus
#         fields = ["id","original","simple"]


# class SiteBasicsSerializer(serializers.ModelSerializer):
#     name = serializers.SerializerMethodField()
#     typ = serializers.SerializerMethodField()
#     status = serializers.SerializerMethodField()

#     def get_name(self,obj):
#         return '; '.join([x.name for x in obj.name.all()])

#     def get_typ(self,obj):
#         return '; '.join([x.original for x in obj.typ.all()])

#     def get_status(self,obj):
#         return obj.status.original

#     class Meta:
#         model = Occurrence
#         fields = ["ind","name","typ","status"]


# class TitleBasicsSerializer(serializers.ModelSerializer):
#     typ = serializers.SerializerMethodField()
#     status = serializers.SerializerMethodField()

#     def get_typ(self,obj):
#         return obj.typ.original

#     def get_status(self,obj):
#         return obj.status.original

#     class Meta:
#         model = Tenement
#         fields = ["ind","typ","status"]


# # required=False # optionally none
# # many=True # a nested list of items
# class SiteSerializer(serializers.ModelSerializer):
#     state = StateSerializer()
#     majmat = MaterialSerializer(many=True,read_only=True)
#     minmat = MaterialSerializer(many=True,read_only=True)
#     typ = SiteTypeSerializer(many=True,read_only=True)
#     status = SiteStatusSerializer()
#     localgov = LocalGovSerializer()
#     govregion = GovRegionSerializer()
#     geoprovince = GeoProvSerializer(many=True,read_only=True)
#     name = OccNameSerializer(many=True,read_only=True)
#     size = SizeSerializer()
#     oid = OidSerializer(many=True,read_only=True)
#     tenements = TitleBasicsSerializer(many=True, read_only=True, source='occurrence_tenement')

#     class Meta:
#         model = Occurrence
#         fields = ["ind","typ","status","name","size","state","localgov","govregion","geoprovince","oid","majmat","minmat","tenements"]


# class TitleSerializer(serializers.ModelSerializer):
#     state = StateSerializer()
#     shore = ShoreSerializer()
#     localgov = LocalGovSerializer(many=True, read_only=True)
#     govregion = GovRegionSerializer(many=True, read_only=True)
#     geoprovince = GeoProvSerializer(many=True, read_only=True)
#     holder = TitleHolderSerializer(many=True, read_only=True, source='tenement_tenholder')
#     majmat = MaterialSerializer(many=True, read_only=True)
#     minmat = MaterialSerializer(many=True, read_only=True)
#     typ = TitleTypeSerializer()
#     status = TitleStatusSerializer()
#     occurrence = SiteBasicsSerializer(many=True, read_only=True)
#     oid = OidTitleSerializer(many=True, read_only=True)

#     class Meta:
#         model = Tenement
#         fields = ["ind","lodgedate","startdate","enddate","typ","status","state","shore","localgov","govregion","geoprovince","holder","oid","occurrence","majmat","minmat"]
