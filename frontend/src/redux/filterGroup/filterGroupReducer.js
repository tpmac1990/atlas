import { PRIMARY_GROUP_OPEN, PRIMARY_GROUP_CLOSE, SECONDARY_GROUP_OPEN, SECONDARY_GROUP_CLOSE, RESET_FILTER_GROUP, CLOSE_ALL_GROUPS } from './filterGroupType'

// initial state is created with the 'createGroups' function 
const initialState = {
    groups: createGroups(),
}


function createGroups() {
    // 'Arr' holds the necessary imformation to create the 'groups' dictionary
    const Arr = [
        {group: 'location', categorya: 'Location', categoryb: [['ausstate', 'State'], ['region', 'Region'], ['local', 'Local'], ['province', 'Province'], ['draw', 'Draw'], ['buffer','Buffer']]},
        {group: 'type', categorya: 'Type', categoryb: [['typesimple', 'Simplified'], ['typedetail', 'Detailed']]},
        {group: 'status', categorya: 'Status', categoryb: [['statussimple', 'Simplified'], ['statusdetail', 'Detailed']]},
        {group: 'typerelated', categorya: 'Type', categoryb: [['typesimplerelated', 'Simplified'], ['typedetailrelated', 'Detailed']]},
        {group: 'statusrelated', categorya: 'Status', categoryb: [['statussimplerelated', 'Simplified'], ['statusdetailrelated', 'Detailed']]},
        {group: 'date', categorya: 'Date', categoryb: [['subdate', 'Date Options']]},
        {group: 'name', categorya: 'Name', categoryb: [['occurrencename', 'Site Name']]},
        {group: 'id', categorya: 'IDs', categoryb: [['givenids', 'Original IDs'], ['newids', 'Gplore IDs']]},
        {group: 'idbuffer', categorya: 'ID', categoryb: [['idtypes', 'ID Types']]},
        {group: 'material', categorya: 'Material', categoryb: [['materialcategory', 'Category'], ['materialname', 'Name']]},
        {group: 'materialrelated', categorya: 'Material', categoryb: [['materialcategoryrelated', 'Category'], ['materialnamerelated', 'Name']]},
        {group: 'holder', categorya: 'Holder', categoryb: [['holdertype', 'Type'], ['holderposition', 'Position'], ['holdername', 'Name']]},
    ]

    // this builds the dictionary
    let dict = {}
    Arr.forEach(row => {
        var group = row.group
        dict[group] = { category : 'a', group: group, display: row.categorya, open: false, areaStyle: 'hideEle', opened: false, btnStyle: 'showEle' }
        row.categoryb.forEach(cat => {
            dict[cat[0]] = { category : 'b', group: group, display: cat[1], open: false, areaStyle: 'hideEle', opened: false, btnStyle: 'hideEle' }
        })
    })
    return dict
}


// Reducer function
const filterGroupReducer = ( state = initialState, action ) => {
    let name = action.payload
    let groups = {}
    switch(action.type) {
        case PRIMARY_GROUP_OPEN: 
            for (var key in state.groups) {
                const { category, group, display, open, areaStyle, opened, btnStyle } = state.groups[key]
                if ( key == name ) {
                    groups[key] = { category : category, group: group, display: display, open: true, areaStyle: 'filterGroupArea showEle', opened: true, btnStyle: btnStyle }
                } else if ( category == 'a' ) {
                    groups[key] = { category : category, group: group, display: display, open: open, areaStyle: areaStyle, opened: opened, btnStyle: 'hideEle' }
                } else if ( category == 'b' && group == state.groups[name].group ) {
                    groups[key] = { category : category, group: group, display: display, open: open, areaStyle: areaStyle, opened: opened, btnStyle: 'showEle' }
                } else {
                    groups[key] = state.groups[key]
                }
            }
            return {
                ... state,
                groups: groups,
            }
        case PRIMARY_GROUP_CLOSE: 
            for (var key in state.groups) {
               const { category, group, display, open, areaStyle, opened, btnStyle } = state.groups[key]
                if ( key == name ) {
                    groups[key] = { category : category, group: group, display: display, open: false, areaStyle: 'hideEle', opened: opened, btnStyle: btnStyle }
                } else if ( category == 'a' ) {
                    groups[key] = { category : category, group: group, display: display, open: open, areaStyle: areaStyle, opened: opened, btnStyle: 'showEle' }
                } else if ( category == 'b' && group == state.groups[name].group ) {
                    groups[key] = { category : category, group: group, display: display, open: false, areaStyle: 'hideEle', opened: opened, btnStyle: 'hideEle' }
                } else {
                    groups[key] = state.groups[key]
                }
            }
            return {
                ... state,
                groups: groups,
            }
        case SECONDARY_GROUP_OPEN: 
            for (var key in state.groups) {
                const { category, group, display, open, areaStyle, opened, btnStyle } = state.groups[key]
                if ( key == name ) {
                    groups[key] = { category : category, group: group, display: display, open: true, areaStyle: 'filterSubGroupArea showEle', opened: true, btnStyle: btnStyle }
                } else if ( category == 'b' && group == state.groups[name].group ) {
                    groups[key] = { category : category, group: group, display: display, open: open, areaStyle: areaStyle, opened: opened, btnStyle: 'hideEle' }
                } else {
                    groups[key] = state.groups[key]
                }
            }
            return {
                ... state,
                groups: groups,
            }
        case SECONDARY_GROUP_CLOSE: 
            for (var key in state.groups) {
               const { category, group, display, open, areaStyle, opened, btnStyle } = state.groups[key]
                if ( key == name ) {
                    groups[key] = { category : category, group: group, display: display, open: false, areaStyle: 'hideEle', opened: opened, btnStyle: btnStyle }
                } else if ( category == 'b' && group == state.groups[name].group ) {
                    groups[key] = { category : category, group: group, display: display, open: open, areaStyle: areaStyle, opened: opened, btnStyle: 'showEle' }
                } else {
                    groups[key] = state.groups[key]
                }
            }
            return {
                ...state,
                groups: groups,
            }
        case CLOSE_ALL_GROUPS:
            for (var key in state.groups) {
                const { category, group, display, opened } = state.groups[key]
                if ( category == 'a' ) {
                    groups[key] = { category : category, group: group, display: display, open: false, areaStyle: 'hideEle', opened: opened, btnStyle: 'showEle' }
                } else if ( category == 'b' ) {
                    groups[key] = { category : category, group: group, display: display, open: false, areaStyle: 'hideEle', opened: opened, btnStyle: 'hideEle' }
                } else {
                    groups[key] = state.groups[key]
                }
             }
            return {
                ...state,
                groups: groups,
            } 
        case RESET_FILTER_GROUP:
            return {
                ...state,
                groups: initialState.groups,
            }
        default: return state
    }
}

export default filterGroupReducer
