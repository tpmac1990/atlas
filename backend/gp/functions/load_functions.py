import json
import psycopg2
import sqlalchemy
import pandas as pd
import numpy as np
from django.apps import apps
import os
from django.contrib.gis.utils import LayerMapping

def getJSON(path):
    with open(path) as json_file:
        return json.load(json_file)

def connectToDatabase(database_keys):
    dbname = database_keys['dbname']
    user = database_keys['user']
    password = database_keys['password']
    host = database_keys['host']
    conn = psycopg2.connect("dbname='%s' user='%s' password='%s' host='%s'" %(dbname,user,password,host))
    return conn

def clearAllTablesRepeatError(database_keys,table_lst):
    # This will try delete contents of a table, if it has a foriegn key and fails then it will add it to the list to try again later
    # when the linked table should have been cleared
    conn = connectToDatabase(database_keys)
    i = 0
    while i < len(table_lst):
        try:
            clearDatabaseTable(conn,table_lst[i])
        except Exception as e:
            table_lst.append(table_lst[i])
        i += 1
    else:
        print('All tables cleared')


def clearUpdatedRowsRepeatError(self):
    update_df = pd.read_csv(self.update)
    configs = self.table_configs
    # get a list of the tables from update_df
    # loop through these tables and delete all the ids for the given index
    # need to loop so if there is an error it will try again later.


def clearDatabaseTable(conn, table_name):
    cur = conn.cursor()
    cur.execute("DELETE FROM %s"%(table_name))
    rows_deleted = cur.rowcount
    conn.commit()
    print("%s rows cleared from %s"%(rows_deleted, table_name))

def loadCsvToDatabase(database_keys,directory,parameter_lst):
    conn = connectToDatabase(database_keys)
    cur = conn.cursor()
    for csv in parameter_lst:
        modelName = "gp_%s"%(csv['Name'].lower())
        with open(directory + '%s.csv' %(csv['Name']), 'r') as infile:
            next(infile)
            print("Starting to load csv '%s' to model '%s'" %(csv['Name'],modelName))
            cur.copy_from(infile, modelName, sep=',')
            conn.commit()
            print('Complete!')

def loadCsvToDatabaseDf(database_keys,directory,parameter_lst):
    engine = sqlalchemy.create_engine('postgresql://%s:%s@%s/%s' %(database_keys['user'], database_keys['password'],database_keys['host'], database_keys['dbname']))
    con = engine.connect()
    for csv in parameter_lst:
        model_name = csv['Name']
        # if model_name == "TenType":
        table_name = "gp_%s" %(model_name.lower())
        print("Starting to load csv '%s' to model '%s'" %(model_name,table_name))
        df = pd.read_csv("%s%s.csv"%(directory,model_name),engine='python')
        # encoding="utf-8"
        df = df.rename(columns=csv['columns'])
        # df = df.replace('',np.nan,regex=True).replace('',np.nan)
        df.to_sql(table_name, con, if_exists='append', index=False, method='multi')
        print('Complete!')
    con.close()


def mapShapeToDatabase(database_keys,name_lst,mapping_configs,shp_directory):
    conn = connectToDatabase(database_keys)

    for name in name_lst:
        print('Mapping to database ' + name)
        # clearDatabaseTable(conn,name)

        filePath = mapping_configs[name]['filePath']
        model = apps.get_model('gp', mapping_configs[name]['model'])
        mapping = mapping_configs[name]['fields']

        shpFile = os.path.join(shp_directory, filePath)
        lm = LayerMapping(model, shpFile, mapping, transform=False)
        lm.save(strict=True, verbose=False)


# def updateRequiredFiles(self):
#     self.local_dbKeys,self.change_directory,self.pretable_lst
#     database_keys = self.local_dbKeys



def createOutputChangeFiles(self):
    core_files = os.listdir(self.core_directory)
    # check if files exist in core
    if len(core_files) < 3:
        print('No files in CORE directory... Creating CORE & CHANGE files from NEW directory.')
        # do this if no files exist in the core directory
        copyDirectory(self.new_directory,self.core_directory)
        copyDirectory(self.new_directory,self.change_directory)
    else:
        # # create the update and change list
        update_lst, changes_lst = initLstsCoreToNew()
        update_lst, changes_lst = removeOldAddNewToCoreAndDb(self,update_lst)
        # compare core to new. Creates the change and update files
        changes_lst = compareOutputCoreToNew(self,changes_lst)


def removeOldAddNewToCoreAndDb(self,update_lst):
    # get the new and old ids for the tenement and occurrence datasets.
    occurrence_old_ids, occurrence_new_ids, occurrence_change_ids = getOldAndNewIdLists(self.occurrence_update_path)
    tenement_old_ids, tenement_new_ids, tenement_change_ids = getOldAndNewIdLists(self.tenement_update_path)
    # # remove all old entries and changed entries from db
    # removeOldAndChangeEntriesDb(self,{"tenement": tenement_old_ids + tenement_change_ids,"occurrence": occurrence_old_ids + occurrence_change_ids})
    # add all new and changed entries to db (need to move this within the atlas app to map shapefiles to db)

    # add new and old entries to the update list
    update_lst = addNewAndOldEntriesToChangeLst(update_lst,{"tenement":{"REMOVE":tenement_old_ids,"NEW":tenement_new_ids},"occurrence":{"REMOVE":occurrence_old_ids,"NEW":occurrence_new_ids}})
    # remove old entries from core file
    removeOldEntriesCoreFile(self,{"tenement": tenement_old_ids,"occurrence": occurrence_old_ids})
    # correct the foreign key value for required new files
    correctNewForeignKeyValues(self)
    # add new entries in core file
    addNewEntriesCoreFile(self,{"tenement": tenement_new_ids,"occurrence": occurrence_new_ids})

    return update_lst


def addNewAndOldEntriesToChangeLst(update_lst,ids_dic):
    for category in ['occurrence','tenement']:
        for action in ['REMOVE','NEW']:
            for ind in ids_dic[category][action]:
                update_lst.append([action,category,ind])
    return update_lst


def removeOldEntriesCoreFile(self,old_ids_dic):
    configs = self.configs
    for category in [2,1]:
        for file_name in configs:
            record_changes = configs[file_name]['record_changes']
            if record_changes != "" and configs[file_name]['add_category'] == category:
                remove_ids = old_ids_dic[record_changes['data_group']]
                core_file = "%s%s.csv"%(self.core_directory,file_name)
                core_df = pd.read_csv(core_file,engine='python')
                result_df = core_df[~core_df[record_changes['key']].isin(remove_ids)]
                result_df.to_csv(core_file,index=False)


def addNewEntriesCoreFile(self,new_ids_dic):
    configs = self.configs
    for category in [1,2]:
        for file_name in configs:
            record_changes = configs[file_name]['record_changes']
            if record_changes != "" and configs[file_name]['add_category'] == category:
                add_ids = new_ids_dic[record_changes['data_group']]
                core_file = "%s%s.csv"%(self.core_directory,file_name)
                new_file = "%s%s.csv"%(self.core_directory,file_name)
                core_df = pd.read_csv(core_file,engine='python')
                new_df = pd.read_csv(new_file,engine='python')
                to_add_df = new_df[new_df[record_changes['key']].isin(add_ids)]
                result_df.to_csv(core_file,index=False)


def getOldAndNewIdLists(path):
    df = pd.read_csv(path)
    old_ids_lst = convertSingleColumnDfToList(df[df["ACTION"] == "REMOVE"].loc[:,["NEW_ID"]])
    new_ids_lst = convertSingleColumnDfToList(df[df["ACTION"] == "NEW"].loc[:,["NEW_ID"]])
    change_ids_lst = convertSingleColumnDfToList(df[df["ACTION"] == "CHANGE"].loc[:,["NEW_ID"]])
    return old_ids_lst, new_ids_lst, change_ids_lst


def convertSingleColumnDfToList(df):
    return [x[0] for x in df.values.tolist()]


def compareOutputCoreToNew(self,changes_lst):
    print('Comparing the output new files to the output core files and building the change and update files.')
    configs = self.configs
    for file_name in configs:
        record_changes = configs[file_name]['record_changes']
        if record_changes != "":
            # if file_name == 'occurrence_majmat':
            comparison_type = record_changes['comparison_type']
            drop_fields = record_changes['drop_fields']
            key = record_changes['key']
            data_group = record_changes['data_group']
            value_field = record_changes['value_field']
            removal_ids = updates[data_group]
            new_df, core_df = readAndDropNecessaryColumnsDf(["%s%s.csv"%(self.new_directory,file_name), "%s%s.csv"%(self.core_directory,file_name)],drop_fields)
            merged_df = core_df.merge(new_df,indicator=True,how='outer')
            # merged_df = merged_df[merged_df['_merge'] == "right_only"].drop(columns=['_merge'])
            # filter core_df for keys in the remove list
            # remove_df = core_df[core_df[key].isin(removal_ids)]
            if comparison_type == "MULTIPLE": # merged_df was right_only
                changes_lst = getMultipleChanges(self,merged_df,changes_lst,core_df,key,file_name,data_group)
            elif comparison_type == "SINGLE":
                changes_lst = getSingleChanges(self,merged_df,changes_lst,key,file_name,data_group,value_field)
            else:
                print("%s: does not exist"%(comparison_type))
    return changes_lst


def getSingleChanges(self,merged_df,changes_lst,core_df,key,file_name,data_group,value_field):
    # all values in the merged_df will be NEW entries. There are no CHANGE values and the REMOVE values will be updated next
    # ['TYPE','GROUP','TABLE','KEY_VALUE','CHANGE_FIELD','VALUE']
    # type = DROP or ADD
    drop_df = merged_df[merged_df['_merge'] == "left_only"].drop(columns=['_merge'])
    add_df = merged_df[merged_df['_merge'] == "right_only"].drop(columns=['_merge'])

    for i, line in drop_df.iterrows():
        changes_lst.append(["DROP",data_group,file_name,line[key],value_field,line[value_field]])

    for i, line in add_df.iterrows():
        changes_lst.append(["ADD",data_group,file_name,line[key],value_field,line[value_field]])

    return changes_lst


def getMultipleChanges(self,merged_df,changes_lst,core_df,key,file_name,data_group):
    merged_df = merged_df[merged_df['_merge'] == "right_only"].drop(columns=['_merge'])
    merged_index_df = merged_df.loc[:,[key]]
    core_index_df = core_df.loc[:,[key]]
    compare_index = merged_index_df.merge(core_index_df,indicator=True,how='outer')
    # new_index_lst = [x[0] for x in compare_index[compare_index['_merge'] == "left_only"].drop(columns=['_merge']).values.tolist()]
    change_index_lst = [x[0] for x in compare_index[compare_index['_merge'] == "both"].drop(columns=['_merge']).values.tolist()]
    # removal_lst = remove_df.values.tolist()
    headers = core_df.columns
    # key_index = list(remove_df.columns).index(key)
    # get the changes
    for ind in change_index_lst:
        new_row_lst = merged_df[merged_df[key] == ind].values.tolist()[0]
        core_row_lst = core_df[core_df[key] == ind].values.tolist()[0]
        for i, header in enumerate(headers):
            if new_row_lst[i] != core_row_lst[i]:
                changes_lst.append(["DROP",data_group,file_name,ind,header,core_row_lst[i]])
                changes_lst.append(["ADD",data_group,file_name,ind,header,new_row_lst[i]])
                # changes_lst.append(["CHANGE",data_group,file_name,key,ind,header,core_row_lst[i],new_row_lst[i]]) # need to add "CHANGE"
                # ['TYPE','GROUP','TABLE','KEY_VALUE','CHANGE_FIELD','VALUE']
    # # get the new
    # for ind in new_index_lst:
    #     new_row_lst = merged_df[merged_df[key] == ind].values.tolist()[0]
    #     for i, header in enumerate(headers):
    #         changes_lst.append(["NEW",data_group,file_name,key,ind,header,"",new_row_lst[i]])
    # # get the removals. loops through the removal_df that has been filetered for all the keys from the update list in the datagroup folders.
    # for line in removal_lst:
    #     for i, header in enumerate(headers):
    #         changes_lst.append(["REMOVE",data_group,file_name,key,line[key_index],header,line[i],""])
    return changes_lst


def correctNewForeignKeyValues(self):
    # this only applies to the occurrence_name and its related OccName table. All other foreign key tables are created equally each time
    configs = self.configs
    for file_name in configs:
        if file_name == 'tenement_holder':
            update_foreignkey = configs[file_name]['update_foreignkey']
            if update_foreignkey != "":
                field_to_replace = update_foreignkey['field_to_replace']
                lookup_field = update_foreignkey['lookup_field']
                new_file = "%s%s.csv"%(self.new_directory,file_name)
                related_file = "%s%s.csv"%(self.core_directory,update_foreignkey['related_file'])
                lookup_file = "%s%s.csv"%(self.core_directory,update_foreignkey['related_file'])
                new_df, related_df, lookup_df = [pd.read_csv(file,engine='python') for file in [new_file,related_file,lookup_file]]
                columns = related_df.columns
                lookup_column = columns.get_loc(lookup_field) # get the index of the lookupfield to get the fields after it to drop
                drop_columns = [c for j, c in enumerate(related_df.columns) if j > lookup_column] # get list of fields to drop
                related_df.drop(drop_columns,axis=1,inplace=True) # drop fields so the last is the lookup_field
                merged_df = pd.merge(new_df,related_df,left_on=field_to_replace,right_on=related_df.columns[0]).iloc[:,[-1]] # merge new and related dfs to get all the foreign key values. The create a df with just the foreign key values
                col_df = pd.merge(merged_df,lookup_df,left_on=merged_df.columns[0],right_on=lookup_field) # merge with the lookup df to align it with its true foreign key index from the core file.
                new_df.drop(field_to_replace,axis=1,inplace=True) #drop the old foreign key index field
                new_df = pd.concat((new_df,col_df),axis='columns') # add true foreign key values
                new_df.to_csv(new_file,index=False)
                # nothing needs to added to the db here