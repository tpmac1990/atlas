import { SET_SITE_GROUP_DATA, LOADING_TOGGLE, SET_SEARCH, SET_STATE, SET_SELECTION, 
        RESET_OFFSET, SET_DROPDOWN_VISIBILITY, INCREMENT_CREATED_ID, HIDE_ALL_DROPDOWNS, 
        SET_UNIQUE_GROUP, ADD_UNIQUE_GROUP_VALUES, SET_UNIQUE_GROUP_ERROR } from './dropdownType'

const initialState = {
    active_dropdown: null,
    unique_multi_groups: {
        names: {},
        values: {},
        error: {name: '', value: ''}
    },

    
    // names: {
    //     majmat: 'materials',
    //     minmat: 'materials'
    // },
    // values: {
    //     materials: [],
    // }
}

const dropdownReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case SET_SITE_GROUP_DATA:
            var { data, name } = action.payload
            var { data, has_more, client_dropdown } = data
            return {
                ...state,
                    [name]: {
                        ...state[name],
                            data: state[name].offset === 0 ? data : [...state[name].data, ...data],
                            hasMore: has_more,
                            is_client_dropdown: client_dropdown,
                            offset: ( !client_dropdown && has_more ) ? state[name].offset + state[name].limit : state[name].offset,
                            loading: false,
                    }
            }
        case LOADING_TOGGLE:
            var name = action.payload
            return {
                ...state,
                    [name]: {
                        ...state[name],
                            loading: !state[name].loading
                    }
            }
        case SET_SEARCH:
            var { value, name } = action.payload
            return {
                ...state,
                    [name]: {
                        ...state[name],
                            search: value
                    }
            }
        case RESET_OFFSET:
            var name = action.payload
            return {
                ...state,
                    [name]: { ...state[name],
                        offset: 0
                    }
            }
        case SET_SELECTION:
            var { selection, name } = action.payload
            return {
                ...state,
                    [name]: { ...state[name],
                        selected: selection,
                        search: '',
                        visible: false,
                        // change_toggle: !state[name].change_toggle
                    },
            }
        case SET_STATE:
            var { name, styles, model, key, label, endpoint } = action.payload
            return {
                ...state,
                    [name]: { ...state[name],
                        model: model,
                        key: key,
                        label: label,
                        styles: styles,
                        endpoint: endpoint,
                        search: '',
                        data: [],
                        selected: {key: '', label: ''},
                        limit: 20,
                        offset: 0,
                        hasMore: false,
                        loading: false,
                        clientmax: 100,
                        is_client_dropdown: false,
                        visible: false,
                        // change_toggle: true // changes everytime set selection is changed. Used to close the infinitySelect when an already existing value is selected.
                    },
            }
        case INCREMENT_CREATED_ID:
            var { name } = action.payload
            return {
                ...state,
                    [name]: {
                        ...state[name],
                            created_id: state[name].created_id === undefined ? '#1' : `${state[name].created_id}1`
                    },
            }
        case SET_DROPDOWN_VISIBILITY:
            var { visible, name } = action.payload
            return {
                ...state,
                    active_dropdown: name,
                    [name]: {
                        ...state[name],
                            visible: visible,
                    },
            }
        case HIDE_ALL_DROPDOWNS:
            return {
                ...state,
                active_dropdown: null,
                [state.active_dropdown]: {
                    ...state[state.active_dropdown],
                        visible: false
                },
            }
        case SET_UNIQUE_GROUP:
            var { name, group } = action.payload
            return {
                ... state,
                unique_multi_groups: { ...state.unique_multi_groups,
                    names: { ...state.unique_multi_groups.names,
                        [name]: group
                    },
                    values: { ...state.unique_multi_groups.values,
                        [group]: []
                    }
                }
            }
        case ADD_UNIQUE_GROUP_VALUES:
            var { group, values } = action.payload
            const newValues = values.filter(item => !state.unique_multi_groups.values[group].includes(item));
            return {
                ... state,
                unique_multi_groups: { ...state.unique_multi_groups,
                    values: { ...state.unique_multi_groups.values,
                        [group]: state.unique_multi_groups.values[group].concat(newValues)
                    }
                }
            }
        case SET_UNIQUE_GROUP_ERROR:
            var { name } = action.payload
            return {
                ... state,
                unique_multi_groups: { ...state.unique_multi_groups,
                    error: action.payload
                },
                [name]: { ...state[name],
                    search: '',
                    visible: false
                }
            }
        default: return state
    }
}

export default dropdownReducer



// unique_multi_groups: {
//     names: {},
//     values: {}
// }

// names: {
    //     majmat: 'materials',
    //     minmat: 'materials'
    // },
    // values: {
    //     materials: [],
    // }