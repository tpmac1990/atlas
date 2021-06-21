
const formatValue = (value,format) => {
    switch (format) {
        case 'integer':
            return parseInt(value)
        case 'float':
            return parseFloat(value)
        case 'string':
            return value.toString()
    }
}

const buildMultiColumnDict = (multi,obj_id,id,field) => {
    var dict = {}
    // console.log(field)
    // console.log(multi)
    multi.forEach(line => {
        // console.log(line)
        // if ( line.value === 'obj_id' ){
        //     dict[line.name] = formatValue(obj_id, line.format)
        if ( line.value === '_id' ){
            dict[line.name] = formatValue(id, line.format)
        } else if ( line.value === 'in_multi' ){
            dict[line.name] = formatValue(field[line.name], line.format)
        } 
    })
    // console.log(dict)
    return dict
}



// formats the form data ready for the post api call
export const buildEditDictionary = (data_dict,orig_data,columns,obj_id) => {
    // const columns = createFields()
    // console.log()
    const dict = {set: {}, create: {}, add: {}, remove: {}, multi: {}, omulti: {}}
    var changes_made = false // if there are no changes then no need to call the api
    Object.keys(data_dict).forEach(sk => {
        const { multi, is_int, is_array, field: col_field } = columns[sk]
        var field = data_dict[sk]
        var create_lst = []
        var multi_lst = []
        var add_lst = []
        var remove_lst = []
        var set_lst = []
        Object.keys(field).forEach(fk => {
            // console.log(field[fk])
            var { id, label, current, remove, add } = field[fk]
            // if 'id' contains a '#' then the label needs to be added to its appropriate model first to get an ID to relate to.
            const is_create = id.toString().includes('#')
            // parse integer style PK's to integer form
            var id = ( is_int && !is_create ) ? parseInt(id) : id
            // if value already exists and is not being removed
            if ( !remove && current ){
                // if there are no extra fields like a through model would have
                if ( !multi ) {
                    // if field is a m2m field then it needs to be in an array, otherwise just a single value
                    if ( is_array ){
                        set_lst.push(id)
                    } else {
                        set_lst = id
                    }
                } else {
                    // the listed_simple group requires the exchange id and the ticker id to be passed
                    if ( ['listed_simple'].includes(sk) ) {
                        if ( add ) {
                            create_lst.push({exchange_id: field[fk].exchange_id, [col_field]: label})
                            remove_lst.push(id) // adding to the remove list will record it in the Change table as 'remove'
                            changes_made = true
                        } else {
                            set_lst.push(id)
                        }                        
                    } else {
                        // if the value is current but has an update in one of the multiple columns then this will be triggered.
                        // the api will first look to see if the value exists and then update or add it accordingly
                        multi_lst.push(buildMultiColumnDict(multi,obj_id,id,field[fk]))
                        set_lst.push(id)
                        // if add is true then a change has been made to a column
                        if ( add ) {
                            add_lst.push(id)
                            changes_made = true
                        }
                    }
                }
            // if value is to be added and not to be removed
            } else if ( !remove && add ){
                if ( ['listed_simple'].includes(sk) ) {
                    create_lst.push({exchange_id: field[fk].exchange_id, [col_field]: label})
                } else {
                    if ( !multi ) {
                        // if needs to be created
                        if ( is_create ){
                            create_lst.push({[col_field]: label})
                        } else {
                            add_lst.push(id)
                            if ( is_array ){
                                set_lst.push(id)
                            } else {
                                set_lst = id
                            }
                        }
                    } else {
                        if ( is_create ){
                            create_lst.push({exchange: field[fk].exchange, [col_field]: label}) // needs to made dynamic
                            // multi_lst.push(buildMultiColumnDict(multi,obj_id,id,field[fk]))
                        } else {
                            // if the value is current but has an update in one of the multiple columns then this will be triggered.
                            // the api will first look to see if the value exists and then update or add it accordingly
                            multi_lst.push(buildMultiColumnDict(multi,obj_id,id,field[fk]))
                            set_lst.push(id)
                            add_lst.push(id)
                        }
                    }
                }
                changes_made = true
            } else if ( current && remove ){
                remove_lst.push(id)
                changes_made = true
            }        
        })
        // set: values to set to database
        // create: values newly created and need to be added before its set value can be set
        // add: values to be added
        // remove: values to be removed
        dict.set[sk] = set_lst
        dict.multi[sk] = multi_lst
        dict.create[sk] = create_lst
        dict.add[sk] = add_lst
        dict.remove[sk] = remove_lst
    });
    dict['changes'] = changes_made


    // this builds the initial multi object before any changes. This is used in the backend to determine which changes have occurred which are then recorded in the
    // relevant change table. Without this step, it is only possible to determine that a change was made to a holder and if that was a percentage/holder/name or what the 
    // percentage was changed from.
    // multi_dic: key value from the data_dic and orig_data 'holder'. Then the name to present in the final dict 'name' and its equivalent field in the orig_data dic '_id'
    // 'listed_simple' is not included as it is handled another way. Excluding it from multi_dic will return an empty array.
    const multi_dic = {holder:{'name':'_id','percown':'percown'},
                        parent_company:{'name':'_id','percown':'percown'},
                        subsidiaries:{'name':'_id','percown':'percown'}}

    Object.keys(data_dict).forEach(sk => {
        const { multi } = columns[sk]  
        // Only continue if it has multi columns  
        if ( multi ){
            var omulti_lst = []
            // get the array of objects from the original data
            var field = orig_data[sk]
            // loop through each object in the group and build the dictionary
            field.forEach(fk => {
                var temp = {}
                // if sk is not in the 'multi_dic' then it will be given an empty array
                if ( sk in multi_dic ){
                    // build the object by looping over each key for the sk object in the multi_dic
                    Object.keys(multi_dic[sk]).forEach(x => {
                        temp[x] = fk[multi_dic[sk][x]]
                    })
                    omulti_lst.push(temp)
                }
            })
            if ( sk in multi_dic ) dict.omulti[sk] = omulti_lst
        }
    })
    return dict
}