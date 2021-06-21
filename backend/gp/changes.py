from rest_framework import serializers
from gp.models import OccurrenceChange
from datetime import datetime, date


def record_site_changes(data,pk):
    ''' saves the change made by the user. This could be something added or removed. '''

    dic = {
        'name': "nameval",
        'typ': "typeval",
        'status': "statusval",
        'geoprovince': "geoprovinceval",
        'majmat': "majmatval",
        'minmat': "minmatval",
        'size': "sizeval",
        'oid': "oidval",
    }
    for action in ['add', 'remove']:
        g_data = data[action]
        for key in g_data:
            if len(g_data[key]) > 0:
                for item in g_data[key]:
                    instance = {'typeval': None,'statusval': None,'oidval': None,'nameval': None,'majmatval': None,'minmatval': None,'sizeval': None,'geoprovinceval': None}
                    instance['ind'] = pk
                    instance['action'] = action
                    instance['field'] = dic[key]
                    instance['user'] = 'user'
                    instance['date'] = date.today()
                    instance[dic[key]] = item

                    s = OccurrenceChangeSerializer(data=instance)
                    if s.is_valid():
                        new_entry = s.save()


class OccurrenceChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OccurrenceChange
        fields = ["ind", "action", "field", "typeval", "statusval", "oidval", "nameval", "majmatval", "minmatval", "user", "date"]


# "ind", "action", "field", "typeval", "statusval", "oidval", "nameval", "majmatval", "minmatval", "user", "date"
