import { SET_FILTER_VALUES, TRIGGER_ELEMENT, SET_DATA, IS_INFINITY_TABLE, CLEAR_DATA } from './popupTableType'


const initialState = {
    active_group: 'sites',
    is_active: false,
    // ind_lst: null,
    // data: null,
    // page: 1,
    // loading: false,
    // offset: 0,
    // limit: 20,
    titles: {
        ind_lst: null,
        is_visible: false,
        data: null,
        has_more: false,
        // page: 1,
        loading: false,
        offset: 0,
        limit: 20,
        is_infinite: false
    },
    sites: {
        ind_lst: null,
        is_visible: false,
        data: null,
        has_more: false,
        // page: 1,
        loading: false,
        offset: 0,
        limit: 20,
        is_infinite: false
    },
}

const popupTableReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case SET_FILTER_VALUES: 
            var { datagroup, ind_lst } = action.payload
            return {
                ...state,
                [datagroup]: {
                    ...state[datagroup],
                    ind_lst: ind_lst
                }
            }
        case TRIGGER_ELEMENT:
            var datagroup = action.payload
            return {
                ...state,
                active_group: datagroup,
                is_active: !state[datagroup].is_visible,
                [datagroup]: {
                    ...state[datagroup],
                    is_visible: !state[datagroup].is_visible
                }
            }
        case IS_INFINITY_TABLE:
            var { datagroup, is_infinite } = action.payload
            return {
                ...state,
                [datagroup]: {
                    ...state[datagroup],
                    is_infinite: is_infinite,
                }
            }
        case CLEAR_DATA:
            var datagroup = action.payload
            return {
                ...state,
                [datagroup]: {
                    ...state[datagroup],
                    data: null
                }
            }
        case SET_DATA:
            var { datagroup, offset } = action.payload
            var datagroup = datagroup === 'Tenement' ? 'titles' : 'sites'
            // var datagroup = action.payload['datagroup'] === 'Tenement' ? 'titles' : 'sites'
            // var offset = action.payload['offset']
            return {
                ...state,
                // data: data
                [datagroup]: {
                    ...state[datagroup],
                    data: (state[datagroup].data == null || offset === 0) ? action.payload['data'] : [...state[datagroup].data,...action.payload['data']],
                    has_more: action.payload['has_more'],
                    // offset: state[datagroup].offset + state[datagroup].limit,
                    // loading: false,
                }
            }
        // case RESET_OFFSET:
        //     var datagroup = action.payload
        //     return {
        //         ...state,
        //         [datagroup]: {
        //             ...state[datagroup],
        //             offset: 0
        //         }
        //     }
        default: return state
    }
}

export default popupTableReducer