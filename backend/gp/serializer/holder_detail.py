from rest_framework import serializers
from gp.models import Holder, HolderType, Listed, Parent, Tenement, Occurrence, State, Exchange, TenHolder


# ##############################################################################################
# Reading from db
# ##############################################################################################

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


class ListedSimpleSerializer(serializers.ModelSerializer):
    exchange_id = serializers.SerializerMethodField(source='exchange')
    exchange_name = serializers.SerializerMethodField(source='exchange')

    def get_exchange_id(self,obj):
        return obj.exchange.code

    def get_exchange_name(self,obj):
        return obj.exchange.name

    class Meta:
        model = Listed
        fields = ["_id","ticker","exchange_id","exchange_name"]
# ,"exchange_id","exchange_name"


class ChildSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(source='holder_name')
    _id = serializers.SerializerMethodField()
    typ = serializers.SerializerMethodField()
    typ_id = serializers.SerializerMethodField(source='typ') # provide id for dropdown in edit select
    listed = serializers.SerializerMethodField()

    def get_name(self,obj):
        return obj.name.name

    def get__id(self,obj):
        return obj.name._id

    def get_typ(self,obj):
        return obj.name.typ.original

    def get_typ_id(self,obj):
        return obj.name.typ._id

    def get_listed(self,obj):
        return "Yes" if len(obj.name.listed.all()) != 0 else "No"

    class Meta:
        model = Parent
        fields = ["_id","name","percown","typ","listed","typ_id"]


class ParentSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(source='holder_name')
    _id = serializers.SerializerMethodField()
    typ = serializers.SerializerMethodField()
    typ_id = serializers.SerializerMethodField(source='typ') # provide id for dropdown in edit select
    listed = serializers.SerializerMethodField()

    def get_name(self,obj):
        return obj.child.name

    def get__id(self,obj):
        return obj.child._id

    def get_typ(self,obj):
        return obj.child.typ.original

    def get_typ_id(self,obj):
        return obj.child.typ._id

    def get_listed(self,obj):
        return "Yes" if len(obj.child.listed.all()) != 0 else "No"

    class Meta:
        model = Parent
        fields = ["_id","name","percown","typ","listed","typ_id"]


class HolderDetailSerializer(serializers.ModelSerializer):
    holder_name = serializers.CharField(source='name')
    company_type = HolderTypeSerializer(source='typ')
    listed = ListedSerializer(many=True, read_only=True)
    listed_simple = ListedSimpleSerializer(many=True, read_only=True, source='listed')
    parent_company = ChildSerializer(many=True, read_only=True, source='child_parent')
    subsidiaries = ParentSerializer(many=True, read_only=True, source='name_parent')
    title_count = serializers.SerializerMethodField()
    site_count = serializers.SerializerMethodField()
    states = serializers.SerializerMethodField()

    def get_title_count(self,obj):
        # combines the titles that the company directly holds and those that its subsidiaries hold
        direct_owner = list(obj.holder_tenement.all().values_list('ind',flat=True))
        child_groups = list(Tenement.objects.filter(holder__in=obj.children.all()).values_list('ind',flat=True))
        return list(dict.fromkeys(child_groups + direct_owner))

    def get_site_count(self,obj):
        direct_owner = list(Occurrence.objects.filter(occurrence_tenement__holder=obj).values_list('ind',flat=True))
        child_groups = list(Occurrence.objects.filter(occurrence_tenement__holder__in=obj.children.all()).values_list('ind',flat=True))
        return list(dict.fromkeys(child_groups + direct_owner))

    def get_states(self,obj):
        direct_owner = list(State.objects.filter(state_tenement__holder=obj).distinct().values_list('name',flat=True))
        child_groups = list(State.objects.filter(state_tenement__holder__in=obj.children.all()).distinct().values_list('name',flat=True))
        return list(dict.fromkeys(child_groups + direct_owner))

    class Meta:
        model = Holder
        fields = ['holder_name','listed_simple','company_type','listed','subsidiaries','parent_company','title_count','site_count','states']



# ##############################################################################################
# Writing to db
# ##############################################################################################

class ListedHolderSerializer(serializers.ModelSerializer): # needs to be merged with above
    exchange_id = serializers.CharField(source='exchange')

    class Meta:
        model = Listed
        fields = ["ticker","exchange_id"]

    def create(self, validated_data):
        model = self.Meta.model
        ticker = validated_data['ticker']
        validated_data['exchange'] = Exchange.objects.get(pk=validated_data['exchange'])
        exchange = validated_data['exchange']
        obj = model.objects.filter(ticker=ticker, exchange=exchange)
        if obj.count() == 0: 
            validated_data['_id'] = model.objects.latest('_id').pk + 1
            validated_data['user_name'] = 'user'
            validated_data['valid_instance'] = False
        instance, created = model.objects.update_or_create(ticker=ticker, exchange=exchange, defaults=validated_data)

        return instance



class ParentHolderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Parent
        fields = ["name","percown","child"]


class TenHolderWriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = TenHolder
        fields = ["percown","name","tenement"]

    def create(self, validated_data):
        '''  '''
        name_obj = validated_data['name']
        tenement_obj = validated_data['tenement']
        obj = TenHolder.objects.filter(name=name_obj, tenement=tenement_obj)
        if obj.count() == 0: validated_data['_id'] = TenHolder.objects.latest('_id').pk + 1
        instance, created = TenHolder.objects.update_or_create(name=name_obj, tenement=tenement_obj, defaults=validated_data)

        return instance


class ParentWriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Parent
        fields = ["name","percown","child"]

    def create(self, validated_data):
        '''  '''
        model = self.Meta.model
        name = validated_data['name']
        child = validated_data['child']
        obj = model.objects.filter(name=name, child=child)
        if obj.count() == 0: validated_data['_id'] = model.objects.latest('_id').pk + 1
        instance, created = model.objects.update_or_create(name=name, child=child, defaults=validated_data)

        return instance


class ChildWriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Parent
        fields = ["name","percown","child"]
        # extra_kwargs = {                                                 
        #      'name': {'validators': []},
        #      'child': {'validators': []},                       
        #  }

    def create(self, validated_data):
        '''  '''
        data = { 'name': validated_data['child'], 'child': validated_data['name'], 'percown': validated_data['percown'] }
        model = self.Meta.model
        name = data['name']
        child = data['child']
        obj = model.objects.filter(name=name, child=child)
        if obj.count() == 0: data['_id'] = model.objects.latest('_id').pk + 1
        instance, created = model.objects.update_or_create(name=name, child=child, defaults=data)

        return instance


# used to add a new Holder name with type
class HolderAndTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Holder
        fields = ['_id','name','typ','user_name']

    # def create(self, validated_data):
    #     # validated_data['_id'] = Holder.objects.latest('pk').pk + 1
    #     instance = Holder.objects.create(**validated_data)
    #     return instance