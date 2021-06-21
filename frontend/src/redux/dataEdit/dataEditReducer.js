import { SET_EDIT_DATA, ADD_EDIT_DATA, REMOVE_EDIT_DATA, ADD_DICT_KEY, ADD_EDIT_DATA_HOLDER, UPDATE_EDIT_CELL, SET_DROPDOWN_DATA,
    SET_API_OUTCOME_SUCCESS, SET_API_OUTCOME_FAIL, RESET_API_OUTCOME, RESET_EDIT_DATA } from './dataEditType'


const initialState = {
    titles: {},
    title_result: {success: null, msg: null},
    sites: {},
    site_result: {success: null, msg: null},
    holders: {},
    holder_result: {success: null, msg: null},
    dropdowns: {}
}

const dataEditReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case SET_EDIT_DATA: 
            var { name, datagroup, data } = action.payload
            return {
                ...state,
                    [datagroup]: {
                        ...state[datagroup],
                            [name]: data
                    }
                }
        case ADD_EDIT_DATA: 
            var { name, datagroup, key, label } = action.payload
            return {
                ...state,
                    [datagroup]: {
                        ...state[datagroup],
                            [name]: {
                                ...state[datagroup][name],
                                    [key]: {id: key, label: label, current: false, remove: false, add: true}
                            }
                    }
                }
        case RESET_EDIT_DATA:
            return {
                ...state,
                    [action.payload]: {}
                }
        case REMOVE_EDIT_DATA: 
            var { name, datagroup, key } = action.payload
            return {
                ...state,
                    [datagroup]: {
                        ...state[datagroup],
                            [name]: {
                                ...state[datagroup][name],
                                    [key]: {
                                        ...state[datagroup][name][key],
                                            remove: !state[datagroup][name][key].remove
                                    }
                            }
                    }
                }
        case ADD_DICT_KEY:
            var { datagroup, name } = action.payload
            return {
                ...state,
                    [datagroup]: {
                        ...state[datagroup],
                            [name]: {}
                    }
                }
        case ADD_EDIT_DATA_HOLDER: 
            // var { name, datagroup, key, label, percown, position } = action.payload
            var { name, datagroup, key, label } = action.payload
            var payload = action.payload
            var dict = { id: key, label: label, current: false, remove: false, add: true }
            // this dynamically adds the extra columns
            Object.keys(payload).forEach(row => {
                if ( !(row in dict) ) dict[row] = payload[row]
            })
            // console.log(payload)
            return {
                ...state,
                    [datagroup]: {
                        ...state[datagroup],
                            [name]: {
                                ...state[datagroup][name],
                                    [key]: dict
                                    // {
                                        // id: key, 
                                        // label: label, 
                                        // // position: position, 
                                        // // percown: percown, 
                                        // current: false, 
                                        // remove: false, 
                                        // add: true}
                            }
                    }
                }
        case UPDATE_EDIT_CELL:
            var { value, key, field, datagroup, name } = action.payload
            // console.log(`${value} ${key} ${field} ${datagroup} ${name}`)
            return {
                ...state,
                    [datagroup]: {
                        ...state[datagroup],
                            [name]: {
                                ...state[datagroup][name],
                                    // [key]: {id: key, label: label, position: position, percown: percown, current: false, remove: false, add: true}
                                    [key]: {
                                        ...state[datagroup][name][key],
                                            [field]: value,
                                            add: true
                                    }
                            }
                    }
                }
        case SET_DROPDOWN_DATA:
            var { model, data } = action.payload
            return {
                ...state,
                dropdowns: {
                    ...state.dropdowns,
                        [model]: data
                }
            }
        case SET_API_OUTCOME_SUCCESS:
            var { group, name } = action.payload
            return {
                ...state,
                [group]: { success: true, msg: name }
            }
        case SET_API_OUTCOME_FAIL:
            var { group } = action.payload
            return {
                ...state,
                [group]: { success: false, msg: null }
            }
        case RESET_API_OUTCOME:
            return {
                ...state,
                [action.payload]: { success: null, msg: null }
            }
        default: return state
    }
}

export default dataEditReducer
