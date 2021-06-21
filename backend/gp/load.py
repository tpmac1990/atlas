# # See the Atlas diary for commands and an explanation

# import os
# import psycopg2
# from django.contrib.gis.utils import LayerMapping
# from .models import *
# import pandas as pd
# import numpy as np
# import sqlalchemy
# import json
# from .functions.load_functions import *



# class Load_Data():

#     def __init__(self):
#         self.local_dbKeys = getJSON("map/configs/secrets.json")['local_db']
#         self.configs = getJSON("map/configs/mapping_configs.json")
#         data_root = self.configs['data_root']
#         update_file_path = data_root + "update/update.csv"
#         # only updating db if file exist
#         self.update = os.path.isfile(update_file_path)
#         self.change_directory = data_root + 'change/'
        
#         self.table_configs = self.configs['tables']
#         self.mapping_configs = self.configs['mapping']
#         self.table_lst = [('map_' + x["Name"]).lower() for x in self.table_configs] + [('map_' + x).lower() for x in self.mapping_configs]

#         self.pretable_lst = [x for x in self.table_configs if x['order'] == "PRE"]
#         self.posttable_lst = [x for x in self.table_configs if x['order'] == "POST"]

#         self.shp_directory = os.path.join(os.path.dirname(__file__), 'data')
        

#     def steps(self):
#         if not self.update:
#             clearAllTablesRepeatError(self.local_dbKeys,self.table_lst)
#         else:
#             clearUpdatedRowsRepeatError(self)
#         # If the table already has contents, then it should append to it. I should have already updated the index.
#         # The rows to update should also aready have the complete data. The row should have been recovered from the database, and the updated value replaced.
#         loadCsvToDatabaseDf(self.local_dbKeys,self.change_directory,self.pretable_lst)
#         mapShapeToDatabase(self.local_dbKeys,['occurrence','tenement'],self.configs['mapping'],self.shp_directory)
#         loadCsvToDatabaseDf(self.local_dbKeys,self.change_directory,self.posttable_lst)


# Load_Data().steps()
# # def run_mapping(shpFileName):

# #     dic = {
# #         'tenement': {
# #             'mapping': {
# #                 'tenid': 'TENID',
# #                 'typ': {'id': 'TYP'},
# #                 'status': {'id': 'STATUS'},
# #                 'state': {'code': 'STATE'},
# #                 'shore': {'code': 'SHORE'},
# #                 'lodgedate': 'LODGEDATE',
# #                 'startdate': 'STARTDATE',
# #                 'enddate': 'ENDDATE',
# #                 'geom': 'MULTIPOLYGON',
# #             },
# #             'filePath': 'tenement/Tenement.shp',
# #             'model': Tenement,
# #         },
# #         'occurrence': {
# #             'mapping': {
# #                 'ind': 'OCCID',
# #                 'status': {'id': 'STATUS'},
# #                 'size': {'code': 'SIZE'},
# #                 'state': {'code': 'STATE'},
# #                 'localgov': {'id': 'LOCALGOV'},
# #                 'govregion': {'id': 'GOVREGION'},
# #                 'geom': 'POINT',
# #             },
# #             'filePath': 'occurrence/Occurrence.shp',
# #             'model': Occurrence,
# #         },
# #     }

# #     filePath = dic[shpFileName]['filePath']
# #     model = dic[shpFileName]['model']
# #     mapping = dic[shpFileName]['mapping']

# #     shpFile = os.path.abspath(
# #         os.path.join(os.path.dirname(__file__), 'data', filePath),
# #     )
# #     lm = LayerMapping(model, shpFile, mapping, transform=False)
# #     lm.save(strict=True, verbose=True)




# # def addCSVsToDB(ltype):

# #     # pre_list = [
# #     #         { 'load': True, 'Name': 'Material', 'columns': { 'CODE': 'code', 'NAME': 'name' }},
# #     #         { 'load': True, 'Name': 'MaterialCategory', 'columns': { '_ID': 'id', 'NAME': 'name' }},
# #     #         { 'load': True, 'Name': 'material_category', 'columns': { '_ID': 'id', 'MATERIAL': 'material_id', 'CATEGORY': 'materialcategory_id' }},
# #     #         { 'load': True, 'Name': 'TenStatusSimp', 'columns': { '_ID': 'id', 'SIMPLE': 'name' }},
# #     #         { 'load': True, 'Name': 'TenStatus', 'columns': { '_ID': 'id', 'ORIGINAL': 'original', 'SIMPLE': 'simple_id' }},
# #     #         { 'load': True, 'Name': 'TenTypeSimp', 'columns': { '_ID': 'id', 'SIMPLE': 'name' }},
# #     #         { 'load': True, 'Name': 'TenAct', 'columns': { 'CODE': 'code', 'NAME': 'name', 'STATE': 'state', 'LINK': 'link' }},
# #     #         { 'load': True, 'Name': 'TenType', 'columns': { '_ID': 'id', 'FNAME': 'fname', 'ORIGINAL': 'original', 'ACT': 'act_id', 'SIMPLE': 'simple_id' }},
# #     #         { 'load': True, 'Name': 'OccStatusSimp', 'columns': { '_ID': 'id', 'SIMPLE': 'name' }},
# #     #         { 'load': True, 'Name': 'OccStatus', 'columns': { '_ID': 'id', 'ORIGINAL': 'original', 'SIMPLE': 'simple_id' }},
# #     #         { 'load': True, 'Name': 'OccTypeSimp', 'columns': { '_ID': 'id', 'SIMPLE': 'name' }},
# #     #         { 'load': True, 'Name': 'OccType', 'columns': { '_ID': 'id', 'ORIGINAL': 'original', 'SIMPLE': 'simple_id' }},
# #     #         { 'load': True, 'Name': 'Exchange', 'columns': { 'CODE': 'code', 'NAME': 'name', 'CITY': 'city', 'COUNTRY': 'country' }},
# #     #         { 'load': True, 'Name': 'GeologicalProvince', 'columns': { '_ID': 'id', 'NAME': 'name', 'TYPE': 'ptype', 'RANK': 'rank' }},
# #     #         { 'load': True, 'Name': 'GovernmentRegion', 'columns': { '_ID': 'id', 'NAME': 'name' }},
# #     #         { 'load': True, 'Name': 'LocalGovernment', 'columns': { '_ID': 'id', 'NAME': 'name' }},
# #     #         { 'load': True, 'Name': 'HolderType', 'columns': { '_ID': 'id', 'ORIGINAL': 'original', 'CODE': 'code' }},
# #     #         { 'load': True, 'Name': 'Holder', 'columns': { '_ID': 'id', 'NAME': 'name', 'TYP': 'typ_id' }},
# #     #         { 'load': True, 'Name': 'HolderPosition', 'columns': { '_ID': 'id', 'NAME': 'name' }},
# #     #         { 'load': True, 'Name': 'Parent', 'columns': { '_ID': 'id', 'PARENT': 'name_id', 'HOLDER': 'child_id', 'PERCOWN': 'percown' }},
# #     #         { 'load': True, 'Name': 'Listed', 'columns': { '_ID': 'id', 'TICKER': 'ticker', 'EXCHANGE': 'exchange_id' }},
# #     #         { 'load': True, 'Name': 'holder_listed', 'columns': { '_ID': 'id', 'HOLDER_ID': 'holder_id', 'listed_ID': 'listed_id' }},
# #     #         { 'load': True, 'Name': 'OccName', 'columns': { '_ID': 'id', 'NAME': 'name' }},
# #     #         { 'load': True, 'Name': 'OccOriginalID', 'columns': { 'CODE': 'code' }},
# #     #         { 'load': True, 'Name': 'OccSize', 'columns': { 'CODE': 'code', 'NAME': 'name' }},
# #     #         { 'load': True, 'Name': 'Shore', 'columns': { 'CODE': 'code', 'NAME': 'name' }},
# #     #         { 'load': True, 'Name': 'State', 'columns': { 'CODE': 'code', 'NAME': 'name' }},
# #     #         { 'load': True, 'Name': 'TenOriginalID', 'columns': { 'CODE': 'code' }},
# #     # ]

# #     # post_list = [
# #     #         { 'load': True, 'Name': 'TenHolder', 'columns': { '_ID': 'id', 'PERCOWN': 'percown', 'NAME': 'name_id', 'POSITION': 'position_id' }},
# #     #         { 'load': True, 'Name': 'occurrence_geoprovince', 'columns': { '_ID': 'id', 'OCC_ID': 'occurrence_id', 'GPROV_ID': 'geologicalprovince_id' }},	
# #     #         { 'load': True, 'Name': 'occurrence_majmat', 'columns': { '_ID': 'id', 'OCCID': 'occurrence_id', 'MATERIAL': 'material_id' }}, 
# #     #         { 'load': True, 'Name': 'occurrence_minmat', 'columns': { '_ID': 'id', 'OCCID': 'occurrence_id', 'MATERIAL': 'material_id' }},
# #     #         { 'load': True, 'Name': 'occurrence_name', 'columns': { '_ID': 'id', 'OCCID': 'occurrence_id', 'NAME': 'occname_id' }},
# #     #         { 'load': True, 'Name': 'occurrence_oid', 'columns': { '_ID': 'id', 'OCCID': 'occurrence_id', 'RELATEDID': 'occoriginalid_id' }},
# #     #         { 'load': True, 'Name': 'occurrence_typ', 'columns': { '_ID': 'id', 'OCCID': 'occurrence_id', 'TYPE': 'occtype_id' }},
# #     #         { 'load': True, 'Name': 'tenement_geoprovince', 'columns': { '_ID': 'id', 'TEN_ID': 'tenement_id', 'GPROV_ID': 'geologicalprovince_id' }},    
# #     #         { 'load': True, 'Name': 'tenement_govregion', 'columns': { '_ID': 'id', 'TEN_ID': 'tenement_id', 'GREG_ID': 'governmentregion_id' }},
# #     #         { 'load': True, 'Name': 'tenement_holder', 'columns': { '_ID': 'id', 'TEN_ID': 'tenement_id', 'HOLDER_ID': 'tenholder_id' }},
# #     #         { 'load': True, 'Name': 'tenement_localgov', 'columns': { '_ID': 'id', 'TEN_ID': 'tenement_id', 'LGOV_ID': 'localgovernment_id' }},
# #     #         { 'load': True, 'Name': 'tenement_majmat', 'columns': { '_ID': 'id', 'TEN_ID': 'tenement_id', 'CODE': 'material_id' }},
# #     #         { 'load': True, 'Name': 'tenement_minmat', 'columns': { '_ID': 'id', 'TEN_ID': 'tenement_id', 'CODE': 'material_id' }},
# #     #         { 'load': True, 'Name': 'tenement_occurrence', 'columns': { '_ID': 'id', 'TEN_ID': 'tenement_id', 'OCC_ID': 'occurrence_id' }}, 
# #     #         { 'load': True, 'Name': 'tenement_oid', 'columns': { '_ID': 'id', 'TENID': 'tenement_id', 'RELATEDID': 'tenoriginalid_id' }}, 
# #     # ]

# #     if ltype == 0:
# #         items = pre_list
# #     elif ltype == 1:
# #         items = post_list
# #     else:
# #         print('missing ltype parameter. choose pre or post.')
# #         return

# #     dbName = os.environ.get('AT_DB_NAME')
# #     dbUser = os.environ.get('AT_DB_USER')
# #     dbPassword = os.environ.get('AT_DB_PASSWORD')

# #     engine = sqlalchemy.create_engine('postgresql://%s:%s@localhost/%s' %(dbUser, dbPassword, dbName))
# #     con = engine.connect()
    
# #     for item in items:
# #         if item['load']:
# #             csvName = item['Name']
# #             tableName = "map_%s" %(csvName.lower())
# #             columns = item['columns']
# #             print("Starting to load csv '%s' to model '%s'" %(csvName,tableName))
# #             with open('C:/Django_Projects/03_geodjango/Atlas/datasets/Raw_datasets/output/%s.csv' %(csvName), 'r') as inf:
# #                 df = pd.read_csv(inf)
# #                 df = df.rename(columns=columns)
# #                 df.to_sql(tableName, con, if_exists='append', index=False, method='multi')
# #                 print('Complete!')

# #     con.close()
    


# # def unloadTables():

# #     tables = ['tenement','occurrence','tenement_occurrence','materialcategory','material','material_category','tenstatussimp','tenstatus','tentypesimp','tentype','occstatussimp','occstatus','occtypesimp','occtype','exchange','geologicalprovince','governmentregion','localgovernment','tenholder','holder_listed','listed','parent','holder','holdertype','holder_child','occname','occoriginalid','occsize','shore','state','tenact','tenoriginalid','occurrence_geoprovince','occurrence_majmat','occurrence_minmat','occurrence_name','occurrence_oid','occurrence_typ','tenement_geoprovince','tenement_govregion','tenement_holder','tenement_majmat','tenement_localgov','tenement_minmat','tenement_oid']

# #     dbName = os.environ.get('AT_DB_NAME')
# #     dbUser = os.environ.get('AT_DB_USER')
# #     dbPassword = os.environ.get('AT_DB_PASSWORD')

# #     conn = psycopg2.connect("dbname=%s user=%s password=%s host='localhost'" %(dbName, dbUser, dbPassword))
# #     cur = conn.cursor()

# #     tables = []

# #     for table in tables:
# #         rows_deleted = 0
# #         try:
# #             cur.execute("DELETE FROM %s"%(table))
# #             rows_deleted = cur.rowcount
# #             conn.commit()
# #             print("%s rows cleared from %s"%(rows_deleted, table))
# #         except (Exception, psycopg2.DatabaseError) as error:
# #             print(error)

# #     cur.close()       
# #     conn.close()



# # def dropTables():

# #     tables = [
# #             { 'unload': True, 'Name': "tenement" },
# #             { 'unload': True, 'Name': "occurrence" },
# #             { 'unload': True, 'Name': "tenement_occurrences" },
# #             { 'unload': True, 'Name': "material" },
# #             { 'unload': True, 'Name': "materialcategory" },
# #             { 'unload': True, 'Name': "material_category" },
# #             { 'unload': True, 'Name': "tenstatussimp" },
# #             { 'unload': True, 'Name': "tenstatus" },
# #             { 'unload': True, 'Name': "tentypesimp" },
# #             { 'unload': True, 'Name': "tentype" },
# #             { 'unload': True, 'Name': "occstatussimp" },
# #             { 'unload': True, 'Name': "occstatus" },
# #             { 'unload': True, 'Name': "occtypesimp" },
# #             { 'unload': True, 'Name': "occtype" },
# #             { 'unload': True, 'Name': "exchange" },
# #             { 'unload': True, 'Name': "geologicalprovince" },
# #             { 'unload': True, 'Name': "governmentregion" },
# #             { 'unload': True, 'Name': "localgovernment" },
# #             { 'unload': True, 'Name': "holdertype" },
# #             { 'unload': True, 'Name': "holder" },
# #             { 'unload': True, 'Name': "holder_child" },
# #             { 'unload': True, 'Name': "listed" },
# #             { 'unload': True, 'Name': "holder_listed" },
# #             { 'unload': True, 'Name': "occname" },
# #             { 'unload': True, 'Name': "occoriginalid" },
# #             { 'unload': True, 'Name': "occsize" },
# #             { 'unload': True, 'Name': "shore" },
# #             { 'unload': True, 'Name': "state" },
# #             { 'unload': True, 'Name': "tenact" },
# #             { 'unload': True, 'Name': "tenoriginalid" },
# #             { 'unload': True, 'Name': "tenholder" },
# #             { 'unload': True, 'Name': "occurrence_geoprovince" },
# #             { 'unload': True, 'Name': "occurrence_majmat" },
# #             { 'unload': True, 'Name': "occurrence_minmat" },
# #             { 'unload': True, 'Name': "occurrence_occname" },
# #             { 'unload': True, 'Name': "occurrence_oid" },
# #             { 'unload': True, 'Name': "occurrence_typ" },
# #             { 'unload': True, 'Name': "tenement_geoprovince" },
# #             { 'unload': True, 'Name': "tenement_govregion" },
# #             { 'unload': True, 'Name': "tenement_holder" },
# #             { 'unload': True, 'Name': "tenement_majmat" },
# #             { 'unload': True, 'Name': "tenement_occurrences" },
# #     ]

# #     dbName = os.environ.get('AT_DB_NAME')
# #     dbUser = os.environ.get('AT_DB_USER')
# #     dbPassword = os.environ.get('AT_DB_PASSWORD')       

# #     conn = psycopg2.connect("dbname=%s user=%s password=%s host='localhost'" %(dbName, dbUser, dbPassword))
# #     cur = conn.cursor()

# #     for table in tables:
# #         rows_deleted = 0
# #         if table['unload']:
# #             tableName = "map_%s" %(table['Name'])
# #             # try: 
# #             cur.execute("DROP TABLE IF EXISTS %s CASCADE;" %(tableName))
# #                 # print("%s was dropped!" %(tableName))
# #             # except (Exception, psycopg2.DatabaseError) as error:
# #             #     print("%s could not be deleted!" %(tableName))
# #             #     print(error)

# #     cur.close()       
# #     conn.close()


