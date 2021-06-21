from rest_framework import serializers
from gp.models import TenementChange, OccurrenceChange, HolderChange


# ''' Handles the changes passed from the detail-edit '''
class TenementChangeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = TenementChange
        fields = "__all__"


class OccurrenceChangeSerializer(serializers.ModelSerializer):

    class Meta:
        model = OccurrenceChange
        fields = "__all__"



class HolderChangeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = HolderChange
        fields = "__all__"

