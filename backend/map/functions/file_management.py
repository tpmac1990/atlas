import json


# opens json files
def getJSON(path):
    with open(path) as json_file:
        return json.load(json_file)