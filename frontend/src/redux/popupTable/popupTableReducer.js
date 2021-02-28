import { SET_FILTER_VALUES, TRIGGER_ELEMENT, SET_DATA } from './popupTableType'


const initialState = {
    active_group: 'sites',
    titles: {
        ind_lst: null,
        is_visible: false,
        data: null,
        page: 1,
        loading: false,
    },
    sites: {
        ind_lst: null,
        is_visible: false,
        data: null,
        page: 1,
        loading: false,
    },
}

const popupTableReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case SET_FILTER_VALUES: 
            var datagroup = action.payload['datagroup']
            const ind_lst = action.payload['ind_lst']
            return {
                ...state,
                [datagroup]: {
                    ...state[datagroup],
                    ind_lst: ind_lst
                }
            }
        case TRIGGER_ELEMENT:
            console.log(state.titles)
            var datagroup = action.payload
            // const active_group = datagroup
            return {
                ...state,
                active_group: datagroup,
                [datagroup]: {
                    ...state[datagroup],
                    is_visible: !state[datagroup].is_visible
                }
            }
        case SET_DATA:
            var datagroup = action.payload['datagroup'] === 'Tenement' ? 'titles' : 'sites'
            const data = action.payload['data']
            return {
                ...state,
                [datagroup]: {
                    ...state[datagroup],
                    data: data
                }
            }
        default: return state
    }
}

export default popupTableReducer