

// configs for the infinity select box in the respective groups
// name: the key for which all state is stored within for the dropdown in redux
// endpoint: the api endpoint to fetch the data for the dropdown from
// model: the model to get the data to populate the select box with
// key: the key of the value to display. this is the pk in the database and is used to update the database
// label: the values displayed in the dropdown
// unique_grp: name of the multi group for which all values need to be unique. Used when unique values required across multiple groups
// styles: the style to apply to the dropdown

// configs to manage the multicolumn tables and how or if they are editable
// style: the bootstrap column width. they should equal to 10 with 2 left for the final 'remove' action column.
// header: the column header as multiple column tables have column headers
// edit_type: the type of edit. null = not editable, input = manual input, select = select from dropdown (requires other configs)
// input_type: for 'edit_type' input. this is the type of input to display such as 'text' or 'Number'
// model: for 'edit_type' select: the model to get the dropdown data from
// select_key: for 'edit_type' select: the field of the model to use as the keys in the dropdown
// select_label: for 'edit_type' select: the field of the model to display in the dropdown
// default: for 'edit_type' select: the default value to display when a new entry is added.

// columns is used to format the data to be sent in the post request
// field: required when using 'ItemsManyManualAdd'. this is the model field name to be updated
// is_int: if the key is an integer it will use pareseInt to convert it to integer form from string
// is_array: if the field is an m2m then the result needs to be in array form, otherwise it should'nt
// multi: required for tables with multiple columns. it takes a list of the columns accept for the title id column. this is sorted in the backend
    //  name: name of field. It should be the same as the field in the model
    // format: the format of the value to be sent to the backend
    // value: used to identify how to format the value in buildEditDictionary.


export const site_objs = {
    groups: {
        geoProvinceSelect: {
            name: 'geoprovince', 
            endpoint: 'site-group', 
            model: 'GeologicalProvince', 
            key: '_id', 
            label: 'name', 
            unique_grp: null, 
            styles: 'infinite-select-c1'
        },
        occTypeSelect: {
            name: 'typ', 
            endpoint: 'site-group', 
            model: 'occType', 
            key: '_id', 
            label: 'original', 
            unique_grp: null, 
            styles: 'infinite-select-c1'
        },
        majorMaterialSelect: {
            name: 'majmat', 
            endpoint: 'site-group', 
            model: 'Material', 
            key: 'code', 
            label: 'name', 
            unique_grp: 'material', 
            styles: 'infinite-select-c1'
        },
        minorMaterialSelect: {
            name: 'minmat', 
            endpoint: 'site-group', 
            model: 'Material', 
            key: 'code', 
            label: 'name', 
            unique_grp: 'material', 
            styles: 'infinite-select-c1'
        },
        statusSelect: {
            name: 'status', 
            endpoint: 'site-group', 
            model: 'OccStatus', 
            key: '_id', 
            label: 'original', 
            unique_grp: null, 
            styles: 'infinite-select-c1'
        },
        sizeSelect: {
            name: 'size', 
            endpoint: 'site-group', 
            model: 'OccSize', 
            key: 'code', 
            label: 'name', 
            unique_grp: null, 
            styles: 'infinite-select-c1'
        },
        nameSelect: {
            name: 'name', 
            endpoint: 'site-group', 
            model: 'OccName', 
            key: '_id', 
            label: 'name', 
            unique_grp: null, 
            styles: 'infinite-select-c1'
        },
        oidSelect: {
            name: 'oid', 
            endpoint: 'site-group', 
            model: 'OccOriginalID', 
            key: 'code', 
            label: 'code', 
            unique_grp: null, 
            styles: 'infinite-select-c1'
        }
    },
    columns: {
        name: { 
            field: 'name', 
            is_int: true, 
            is_array: true 
        },
        oid: { 
            field: 'code', 
            is_int: false, 
            is_array: true 
        },
        typ: { 
            is_int: true, 
            is_array: true 
        },
        status: { 
            is_int: true, 
            is_array: false 
        },
        geoprovince: { 
            is_int: true, 
            is_array: true 
        },
        majmat: { 
            is_int: false, 
            is_array: true 
        },
        minmat: { 
            is_int: false, 
            is_array: true 
        },
        size: { 
            is_int: false, 
            is_array: false 
        },
        govregion: { 
            is_int: true, 
            is_array: false 
        },
        localgov: { 
            is_int: true, 
            is_array: false 
        },
        state: { 
            is_int: false, 
            is_array: false 
        }
    },
    multis: {}
}


export const holder_objs = {
    groups: {
        parentSelect: {
            name: 'parent_company', 
            endpoint: 'site-group', 
            model: 'Holder', 
            key: '_id', 
            label: 'name', 
            unique_grp: 'holder', 
            styles: 'infinite-select-c1'
        },
        subsidiarySelect: {
            name: 'subsidiaries', 
            endpoint: 'site-group', 
            model: 'Holder', 
            key: '_id', 
            label: 'name', 
            unique_grp: 'holder', 
            styles: 'infinite-select-c1'
        },
        listedSelect: {
            name: 'listed_simple', 
            endpoint: 'site-group', 
            model: 'Listed', 
            key: '_id', 
            label: 'ticker', 
            unique_grp: null, 
            styles: 'infinite-select-c1'
        }
    },
    columns: {
        parent_company: { 
            is_int: true, 
            is_array: true, 
            multi: [
                {
                    name: 'name', 
                    format: 'integer', 
                    value: '_id'
                },
                {
                    name: 'percown', 
                    format: 'float', 
                    value: 'in_multi'
                }
            ] 
        },
        subsidiaries: { 
            is_int: true, 
            is_array: true, 
            multi: [
                {
                    name: 'name', 
                    format: 'integer', 
                    value: '_id'},
                {
                    name: 'percown', 
                    format: 'float', 
                    value: 'in_multi'
                }
            ] 
        },
        listed_simple: { 
            field: 'ticker', 
            is_int: true, 
            is_array: true, 
            multi: [
                {
                    name: 'ticker', 
                    format: 'string', 
                    value: '_id'
                },
                {
                    name: 'exchange_id', 
                    format: 'string', 
                    value: 'in_multi'
                }
            ] 
        }
    },
    multis: {
        relatedMulti: [
            {
                header: 'Name',
                label: 'label', // the core field is always labelled 'label'
                edit_type: null,
                lg_style: 'col-7',
                sm_style: 'col-7'
            },
            {
                header: '% Held',
                label: 'percown',
                edit_type: 'input',
                input_type: 'Number',
                default: 0,
                lg_style: 'col-3',
                sm_style: 'col-3'
            },
        ],
        listedMulti: [
            {
                header: 'Ticker',
                label: 'label',
                edit_type: null,
                lg_style: 'col-3',
                sm_style: 'col-3'
            },
            {
                header: 'Exchange',
                label: 'exchange_id',
                edit_type: 'select',
                default: 'ASX',
                model: 'Exchange',
                select_key: 'code',
                select_label: 'name',
                lg_style: 'col-7',
                sm_style: 'col-7'
            }
        ]
    }
}


export const title_objs = {
    groups: {
        geoProvinceSelect: {
            name: 'geoprovince', 
            endpoint: 'site-group', 
            model: 'GeologicalProvince', 
            key: '_id', 
            label: 'name', 
            unique_grp: null, 
            styles: 'infinite-select-c1'
        },
        typeSelect: {
            name: 'typ', 
            endpoint: 'site-group', 
            model: 'TenType', 
            key: '_id', 
            label: 'fname', 
            unique_grp: null, 
            styles: 'infinite-select-c1'
        },
        statusSelect: {
            name: 'status', 
            endpoint: 'site-group', 
            model: 'TenStatus', 
            key: '_id', 
            label: 'original', 
            unique_grp: null, 
            styles: 'infinite-select-c1'
        },
        oidSelect: {
            name: 'oid', 
            endpoint: 'site-group', 
            model: 'TenOriginalID', 
            key: 'code', 
            label: 'code', 
            unique_grp: null, 
            styles: 'infinite-select-c1'
        },
        holderSelect: {
            name: 'holder', 
            endpoint: 'site-group', 
            model: 'Holder', key: '_id', 
            label: 'name', 
            unique_grp: null, 
            styles: 'infinite-select-c1'
        }
    },
    columns: {
        holder: { 
            is_int: true, 
            is_array: true, 
            multi: [
                {
                    name: 'name', 
                    format: 'integer', 
                    value: '_id'},
                {
                    name: 'percown', 
                    format: 'float', 
                    value: 'in_multi'
                }
            ] 
        },
        oid: { 
            field: 'code', 
            is_int: false, 
            is_array: true 
        },
        typ: { 
            is_int: true, 
            is_array: false 
        },
        status: { 
            is_int: true, 
            is_array: false 
        },
        geoprovince: { 
            is_int: true, 
            is_array: true 
        },
    },
    multis: {
        holderMulti: [
            {
                header: 'Name',
                label: 'label', // the core field is always labelled 'label'
                edit_type: null,
                lg_style: 'col-6',
                sm_style: 'col-7'
            },
            {
                header: '% Held',
                label: 'percown',
                edit_type: 'input',
                input_type: 'Number', // formates the input to accept numbers only
                default: 0,
                lg_style: 'col-3',
                sm_style: 'col-3'
            }
        ],
    }
}