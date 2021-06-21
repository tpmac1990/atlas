import time
from datetime import datetime
from copy import deepcopy
from gp.models import Material, Tenement

def create_update_id(ind,model):
    ''' create the id for the updated ind for Occurrence or Tenement instances '''
    ind_suffix = "#%s"%(ind)
    objs = model.objects.filter(pk__contains=ind_suffix)
    if objs.count() == 0:
        update_val = '10'
    else:
        update_val = max([int(x.ind[0:2]) for x in objs]) + 1
    return "%s%s"%(update_val,ind_suffix)


def field_exists_in_model(model,field):
    ''' Determine if a field exists in a model '''
    try:
        model._meta.get_field(field)
        return True
    except:
        return False



def create_instance(arr,data):
    ''' creates an instance of a model. e.g. if a user adds a 'related id' that does not exist, this 
        function will create that model instance in its required model. This instance, or more specifically, its 'PK' can be 
        used to relate to the newly related instance.
            arr: list of dictionaries with two keys, field & serializer. 'field': key holding the data passed from the frontend, 
                                                                        'serializer': the serializer used to validate and commmit data
            to_create: the 'create' part of the data passed from the frontend. This holds the data that needs to be added to the database
            data['set']: data that needs to be set to the database. once the instance has been created its pk is added to the set dictionary so the 
                        new model instance can be related in a foreignkey or m2m field to another model
            data['add]: The created key needs to be appended to the 'add' dictionary so it is added to the 'Change' table in a later step
    '''
    
    data_create = data['create']

    for x in arr:
        model = x['serializer'].Meta.model
        # x['field'] in data_create and
        if len(data_create[x['field']]) > 0:
            for dic in data_create[x['field']]:
                if field_exists_in_model(model,'_id'): dic['_id'] = model.objects.latest('_id')._id + 1
                if field_exists_in_model(model,'user_name'): dic['user_name'] = 'user'
                # if field_exists_in_model(model,'valid_instance'): dic['valid_instance'] = False
                # if field_exists_in_model(model,'date_created'): dic['date_created'] = datetime.now().date()
                s = x['serializer'](data=dic)
                if s.is_valid():
                    new_entry = s.save()
                    data['set'][x['field']].append(new_entry.pk)
                    data['add'][x['field']].append(new_entry.pk)
                else:
                    print(s.errors)
    return data



def copy_and_update_instance(data_set,model,pk,serializer,transfer_arr,pop_arr):
    ''' This copies a model instance (Tenement or Occurrence), adds a prefix to the 'ind' and updates the necessary fields with the data sent from the frontend.
        data_set: the 'set' part of the data posted from the frontend which is what the model will be updated to.
        model: the model to add the instance to
        pk: the pk of the model instance in question
        serializer: the serializer to validate and pass the data to the database with
        transfer_arr: fields that can't be updated which are passed from the current instance to the updated instance
        pop_arr: fields that need to be taken from the 'set' group as there is no place for them in the model, or they need to be handled separately.

        create_update_id: adds a unique prefix to the current index to old the updated instance. This allows the instance to be checked before overwriting the current field.
    '''
    # data_set_copy = deepcopy(data_set)
    instance = model.objects.filter(pk=pk)
    # s = serializer(instance, many=False).data
    # data_set['ind'] = create_update_id(pk,model)

    # data_set['ind'] = pk
    # for x in transfer_arr:
    #     data_set[x] = s[x]
    for x in pop_arr:
        data_set.pop(x)

    m2m_fields = {x: data_set[x] for x in data_set if type(data_set[x]) == list}
    single_fields = {x: data_set[x] for x in data_set if type(data_set[x]) != list}
    

    if field_exists_in_model(model,'user_name'): single_fields['user_name'] = 'user'
    if field_exists_in_model(model,'valid_relations'): single_fields['valid_relations'] = False
    if field_exists_in_model(model,'user_edit'): single_fields['user_edit'] = True


    # for x in single_fields:
    #     setattr(instance,x,getKey(single_fields[x]))

    # single field only updates user_input and valid for the Occurrence instance.
    instance.update(**single_fields)
    instance = instance.get(pk=pk)
    for x in m2m_fields:
        getattr(instance, x).set(m2m_fields[x])
            
    # s = serializer(data=data_set)
    # if s.is_valid():
    #     s.save()

    # return data_set['ind']


def set_instance_and_update(data_set,obj):
    ''' This first updates the necessary fields to show a user edit has taken place. 
        valid_relations: something in relation to the obj, such as a foreign or m2m field has a change made by user, then it changes to 'False' until it has been checked
        user_edit: 'True' as a change was made my a user
        date_modified: the date the update is made
        The lised values are update with set. This will overwrite the current values. It does not require '.save()'
    '''
    obj.valid_relations = False
    obj.user_edit = True
    obj.date_modified = datetime.now().date()
    obj.save()
    obj.listed.set(data_set['listed_simple'])



# def multi_column_drop_all_readd_instances(pk,arr,data):
#     ''' If changes have been made in a multi column edit table this will delete all instances with the pk for the given model field and then
#         add the updated fields. e.g. This is used for the holder edit for the parent and subsidiary tables. If a new holder is added, or a percentage 
#         ownership changed then this will update the database.
#         pk: pk of holder to be removed and then readded
#         arr: name: key of the data['multi'] dic passed from the frontend
#             model: related model 
#             serializer: related serialiser
#             drop: the field of the model to drop all the instances with the pk value
#             mapping: dic to build a dic of key value pairs ready for the serializer
#                     serializer: serializer field
#                     lookup: multi field (posted from frontend)
#     '''
#     for g in arr:
#         add = data['add'][g['name']]
#         if len(add) > 0:
#             multi = data['multi'][g['name']]
#             g['model'].objects.filter(**{g['drop']:pk}).delete()
#             for i in multi:
#                 dic = {}
#                 for x in g['mapping']:
#                     # if the value is 'pk' then pass in the pk
#                     if x['lookup'] == 'pk':
#                         dic[x['serializer']] = pk
#                     else:
#                         dic[x['serializer']] = i[x['lookup']]

#                 s = g['serializer'](data=dic)
#                 if s.is_valid():
#                     s.save()


def multi_column_create_instance(arr,data,pk):
    ''' posts instance for a multi field edit table. This does not support creating an instance in a related model first.
        arr: 
            name: key of the multi group posted from the frontend.
            serializer: the serializer to validate and post the instance to the database
        data_multi: the data['multi'] group posted from the frontend. Used to update_or_create instances.
        data_remove: holds the keys for the values to remove from db
        pk: the pk of the model instance
        ??? Need to make this more dynamic
    ''' 
    data_multi = data['multi']
    data_remove = data['remove']
    # data_add = data['add']

    multi_changes = []

    # dic = {'holder': {'query_1': 'tenement', 'query_2': 'name', 'record_changes': False, 'pk': 'tenement'},
    #         'parent_company': {'query_1': 'child', 'query_2': 'name', 'record_changes': True, 'pk': 'child'},
    #         'subsidiaries': {'query_1': 'name', 'query_2': 'child', 'record_changes': True, 'pk': 'child'}}

    dic = {'holder': {'query_1': 'tenement', 'query_2': 'name__in', 'pk': 'tenement'},
            'parent_company': {'query_1': 'child', 'query_2': 'name__in', 'pk': 'child'},
            'subsidiaries': {'query_1': 'name', 'query_2': 'child__in', 'pk': 'child'}}
    
    for group in arr:
        for item in data_multi:
            if item == group['name']:
                model = group['serializer'].Meta.model
                name = group['name']
                if name in dic:
                    objs = model.objects.filter(**{dic[name]['query_1']: pk, dic[name]['query_2']: data_remove[item]}).delete()
                    # if objs.count() > 0 and dic[name]['record_changes']:
                    #     for obj in objs:
                    #         multi_changes.append({'action': 'REMOVE', 'field': name, 'pk': pk, 'name': obj.name._id, 'percown': obj.percown})
                    # objs.delete()
                
                # if dic[item]['record_changes']:
                #     objs = model.objects.filter(**{dic[name]['query_1']: pk, "%s__in"%(dic[name]['query_2']): data_add[item]})
                #     add_lst = []
                #     if objs.count() > 0:
                #         for obj in objs:
                #             multi_changes.append({'action': 'ADD', 'field': name, 'pk': pk, 'name': getattr(obj, dic[name]['query_2'])._id, 'percown': obj.percown})
                #             add_lst.append(getattr(obj, dic[name]['query_2'])._id)
                                    

                for i in data_multi[item]:
                    if name in dic: 
                        i[dic[name]['pk']] = pk
                    # if i['name'] in data_add[item] and i['name'] not in add_lst and dic[name]['record_changes']:
                    #     multi_changes.append({'action': 'ADD', 'field': name, 'pk': pk, 'name': i['name'], 'percown': i['percown']})
                    s = group['serializer'](data=i)
                    if s.is_valid():
                        s.save()
                    else:
                        print(s.errors)



# if group['name'] == 'holder': model.objects.filter(tenement=pk, name__in=data_remove[item]).delete()
# if group['name'] == 'parent_company': model.objects.filter(child=pk, name__in=data_remove[item]).delete()
# if group['name'] == 'subsidiaries': model.objects.filter(name=pk, child__in=data_remove[item]).delete()

# if group['name'] == 'holder': i['tenement'] = pk
# if group['name'] == 'parent_company': i['child'] = pk
# if group['name'] == 'subsidiaries': i['child'] = pk


def time_past(start,end):
    hours, rem = divmod(end-start, 3600)
    minutes, seconds = divmod(rem, 60)
    return "{:0>2}:{:0>2}:{:05.2f}".format(int(hours),int(minutes),seconds)


def convert_percown_field(field):
    ''' formats the field name of the percown field. It replaces 'val' with 'perc' '''
    return "%sperc"%(field[:len(field)-3])


def complete_changes_object(dic,next_id,field,action,item):
    ''' adds the remaining key value pairs to the dic before it is sent to the serializer '''
    dic['_id'] = next_id
    dic['action'] = action.upper()
    dic['field'] = field
    dic[field] = item
    return dic

def serialize_changes(dic,serializer):
    ''' serializers the data and saves it to the db '''
    s = serializer(data=dic)
    if s.is_valid():
        # pass
        s.save()
    else:
        print(s.errors)

def serialize_name_and_perc_change(serializer,action,arr,key,next_id,set_dic,field):
    ''' record the 'name' & 'percown' as 'REMOVE' in individual lines in the Change db table '''
    for orig in arr:
        if orig['name'] == key:
            next_id += 1
            new_dic = deepcopy(set_dic)
            new_dic = complete_changes_object(new_dic,next_id,field,action,orig['name'])
            serialize_changes(new_dic,serializer)
            # print(new_dic)
            next_id += 1
            perc_field = convert_percown_field(field)
            new_dic = complete_changes_object(new_dic,next_id,perc_field,action,orig['percown'])
            serialize_changes(new_dic,serializer)
            # print(new_dic)
    return next_id


def serialize_perc_change_only(serializer,action,arr,key,next_id,set_dic,field):
    ''' Only the 'percown' value has changed, the 'name' is not new. record the old percown value as 'remove' and the new value as 'add' '''
    for orig in arr:
        if orig['name'] == key:
            next_id += 1
            new_dic = deepcopy(set_dic)
            new_dic = complete_changes_object(new_dic,next_id,field,action,orig['name'])
            perc_field = convert_percown_field(field)
            new_dic = complete_changes_object(new_dic,next_id,perc_field,action,orig['percown'])
            serialize_changes(new_dic,serializer)
            # print(new_dic)
    return next_id


def add_changes_to_change_table(pk,data,field_dic,serializer):
    ''' records the changes made in the Title (Tenement) & Site (Occurrence) edit page. Values that are removed are recorded as 'REMOVE' and those that are 
        added are recorded as 'ADD'. Recording it this way provides a trail of all changes made.
        data: contains all changes to be applied to the db, sent from the frontend. Here, I use the 'add' and 'remove' objects
    '''
    # get the next _id value form the model
    try:
        next_id = serializer.Meta.model.objects.latest('_id')._id
    except:
        next_id = 0
    today_date = datetime.now().date()

    data_omulti = data['omulti']
    data_multi = data['multi']
    # filter for a list of the keys from the data that exist in the dic above. These are the only fields that exist in the 'Change' model. and not the multi fields
    all_field_lst = [x for x in data['add'] if x in field_dic]
    # exclude the multi groups here. They are handled below
    field_lst = [x for x in all_field_lst if x not in data_omulti]
    # create a dic of the core fields of the model and then add the 'ind', 'action' & 'user'. This is used as a generic dic to be copied for each loop.
    set_dic = { field_dic[x]: None for x in all_field_lst }
    for x in data_omulti:
        set_dic[convert_percown_field(field_dic[x])] = None
    set_dic['ind'] = pk
    set_dic['user'] = 'user'
    set_dic['date_created'] = today_date

    # This will set all the change records for all fields except the multi column fields
    for action in ['remove','add']:
        data_group = data[action]
        # loop through each field
        for group in field_lst:
            lst = data_group[group]
            # loop though each value in the field and update the new_dic which will push to the database
            for item in lst:
                next_id += 1
                field = field_dic[group]
                new_dic = deepcopy(set_dic)
                new_dic = complete_changes_object(new_dic,next_id,field,action,item)
                serialize_changes(new_dic,serializer)
                # print(new_dic)

    # This will set the multi column fields with 'name' & 'percown' fields
    for group in data_omulti:
        # list of objects holding the pre change values for the multi fields
        gArr = data_omulti[group]
        # list of objects holding the user changed values for the multi fields
        cArr = data_multi[group]
        # list of the the 'name' values in the pre change array of objects. Used to determine of the entire object is new or just the percown has been updated
        name_keys = [x['name'] for x in gArr]
        # the field in focus e.g. 'parents' or 'subsidiaries'
        field = field_dic[group]
        # loop through the two actions
        for action in ['add','remove']:
            # a list of keys for the data group and its action
            data_group = data[action][group]
            # loop though each key in the data group for the given action
            for key in data_group:
                # if the item has been removed then the value from each column needs to bew recorded as removed in the Change table. e.g. 'name' & 'percown'
                if action == 'remove':
                    # record the 'name' & 'percown' removal in individual lines in the Change db table
                    next_id = serialize_name_and_perc_change(serializer,action,gArr,key,next_id,set_dic,field)
                else:
                    if key in name_keys: 
                        # if the key exists in the pre change multi list then only the 'percown' value has changed, the 'name' is not new. record the old value as 'remove' and the new value as 'add'
                        next_id = serialize_perc_change_only(serializer,'remove',gArr,key,next_id,set_dic,field)
                        next_id = serialize_perc_change_only(serializer,action,cArr,key,next_id,set_dic,field)
                    else:
                        # if the key doesn't exist in name_keys then the object is new, so the 'name' & 'percown' values are added to the 'Change' table as 'add'
                        next_id = serialize_name_and_perc_change(serializer,action,cArr,key,next_id,set_dic,field)

                       



def update_title_materials_and_record_changes(pk,data):
    ''' Updates the material fields for the related titles/tenements. 
        When a user adds or removes a material for an occurrence, the method finds all its related tenements, then finds all the tenements related occurrences and creates a 
        list of all the materials. Then, following the criteria setout below, it will determine how to update the materials for each related tenement.
    '''
    # get all tenement objects related to the occurrence in question
    objs = Tenement.objects.filter(occurrence=pk)

    # Builds a dictionary for each tenement object and each material group, 'majmat' & 'minmat' with the tenement object 'obj' and a list of all the material codes of 
    #   its related occurrences.
    obj_dic = {}
    for mat_type in ['majmat','minmat']:
        grp_dic = {}
        for obj in objs:
            temp = {}
            temp['obj'] = obj
            temp['lst'] = list(Material.objects.filter(**{"%s_occurrence__occurrence_tenement"%(mat_type): obj}).values_list('code',flat=True))
            grp_dic[obj.ind] = temp
        obj_dic[mat_type] = grp_dic

    
    # Using the object created above, this sets out the conditions to add or remove materials for all the related tenements of the occurrence in question
    for mat_type in ['majmat','minmat']:
        title_groups = obj_dic[mat_type]
        for action in ['add','remove']:
            # list of the materials to either add or remove from the occurrence which may need to be added or removed from teh related tenements if conditions are met
            mat_lst = data[action][mat_type]
            # loop through the tenement 'ind' values
            for ten_ind in title_groups:
                ten_obj = title_groups[ten_ind]['obj']
                # list of all the materials for majmat or minmat of the tenement object for the given ten_id value
                maj_lst = obj_dic['majmat'][ten_ind]['lst']
                min_lst = obj_dic['minmat'][ten_ind]['lst']
                for mat in mat_lst:
                    if mat_type == 'majmat':
                        if action == 'add':
                            # if the material doesn't exist in the maj_lst then it needs to be added to the tenement object
                            if maj_lst.count(mat) == 0:
                                getattr(ten_obj, 'majmat').add(mat)
                                # because it has been added to the majmat, if it exists in the minmat then it needs to be removed. A material should not be in both
                                if min_lst.count(mat) > 0:
                                    getattr(ten_obj, 'minmat').remove(mat)
                        else:
                            # if mat only occurs in the maj_lst once then it needs to be removed from the tenement object. If it exists more than once, then another occurrence
                            #   related to the tenement still has the material as a major material, therefore it should not be removed
                            if maj_lst.count(mat) == 1:
                                getattr(ten_obj, 'majmat').remove(mat)
                                # If the material is removed then check if the material exists in any of the related sites minmat fields, if so it is added as a minmat.
                                #  It would not have existed before as a meterial can only exist in either the majmat or minmat field
                                if min_lst.count(mat) > 0:
                                    getattr(ten_obj, 'minmat').add(mat)
                    else:
                        if action == 'add':
                            # if the mat does not exist in either the majmat or minmat fields then add it. If if exists in the majmat field then don't add it as a material
                            #   can only exist in one of the fields with the majmat taking preference
                            if maj_lst.count(mat) == 0 and min_lst.count(mat) == 0:
                                getattr(ten_obj, 'minmat').add(mat)
                        else:
                            # if the mat only exists once and it doesn't exist in the majmat list then it can be removed. If it exists in the majmat list then it won't exist
                            #   in the tenement minmat field, so no need to delete something that isn't there
                            if min_lst.count(mat) == 1 and maj_lst.count(mat) == 0:
                                getattr(ten_obj, 'minmat').remove(mat)
                     