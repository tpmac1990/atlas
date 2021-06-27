import { ITEM_SELECTED, ITEM_UNSELECTED, SET_RECTANGLE_LATLNGS, MANUAL_LATLNGS_CHANGE, SET_DATE_CHANGE, 
    SET_BUFFER_ID, SET_BUFFER_DISTANCE, INCLUDE_RELATED_DATA, TOGGLE_RELATED_FILTER, RESET_FILTER_SELECTION, 
    VALID_BUFFER_ID, CLEAR_RECTANGLE_LATLNGS, SET_ID_CENTROID, IS_BUFFER_RADIUS_VALID, SET_UPDATE_TYPE,
    SET_SPATIAL_DATA, SET_MAP_NOT_LOADING, SPATIAL_DATA_REF, SET_MAP, TOGGLE_FILTER_PANEL, SET_MAP_LOADING, 
    RESET_MAP_DATA_OFFSET, SET_DATA_LIMIT, SET_ACTIVE_FILTERS } from './filterSelectionType'

const initialState = {
    last_group_changed: '', // determines whether to reload a checkbox list on open.
    last_action: null,
    active_filters: {
        primary: [],
        related: []
    },
    input: {
        ausstate: [],
        region: [],
        local: [],
        province: [],
        rectangle: {NELat: '', NELng: '', SWLat: '', SWLng: ''},
        buffer: {Lat: '', Lng: '', radius: '', id: '', valid_id: false, valid: false}, // valid = complete buffer is valid and ready for a query. id is valid and radius is not nothing
        typesimple: [],
        typedetail: [],
        statussimple: [],
        statusdetail: [],
        typesimplerelated: [],
        typedetailrelated: [],
        statussimplerelated: [],
        statusdetailrelated: [],
        lodgefromdate: '',
        lodgetodate: '',
        startfromdate: '',
        starttodate: '',
        endfromdate: '',
        endtodate: '',
        materialcategory: [],
        materialname: [],
        materialcategoryrelated: [],
        materialnamerelated: [],
        holdertype: [],
        holderparent: [],
        holdername: [],
        occurrencename: [],
        newids: [],
        givenids: [],
        additionfromdate: '',
        additiontodate: '',
        inactivefromdate: '',
        inactivetodate: '',
        changefromdate: '',
        changetodate: '',
        changegroup: [],
    },
    related: {
        include: false,
        is_open: false,
    },
    map_infinity: {
        limit: 0,
        offset: 0,
        hasMore: true,
        loading: false,
        total_count: null
    },
    map_data: {
        occs: {features : []},
        tens: {features : []},
        occsref: null,
        tensref: null,
        map: {},
        filteropen: true,
        extent: null,
    }
}


// Reducer function
const filterSelectionReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case SET_ACTIVE_FILTERS:
            const { group, filters } = action.payload
            return {
                ... state,
                active_filters: { ...state.active_filters,
                    [group]: filters
                }
            }
        case ITEM_SELECTED: 
            var { value, pk } = action.payload
            return {
                ... state,   
                last_group_changed: value,   
                last_action: 'add',
                input: { ...state.input,
                    [value]: [ ...state.input[value], pk ]
                },
                map_infinity: { ...state.map_infinity,
                    offset: 0,
                    hasMore: true,
                    total_count: null
                }
                // map_infinity: initialState.map_infinity,
                // related_count: value.includes('related') ? state.related_count + 1 : state.related_count
            }
        case ITEM_UNSELECTED:
            var { value, pk } = action.payload
            return {
                ...state,
                last_group_changed: value,
                last_action: 'remove',
                input: { ...state.input,
                    [value]: state.input[value].filter(val => val != pk )
                },
                map_infinity: { ...state.map_infinity,
                    offset: 0,
                    hasMore: true,
                    total_count: null
                }
                // map_infinity: initialState.map_infinity,
                // related_count: value.includes('related') ? state.related_count - 1 : state.related_count
            }
        case SET_RECTANGLE_LATLNGS: 
            const coordinates = action.payload
            return {
                ... state,
                last_group_changed: 'rectangle',
                last_action: 'add',
                input: { ...state.input,
                    rectangle: { ...state.input.rectangle,
                        NELat: coordinates._northEast.lat,
                        NELng: coordinates._northEast.lng,
                        SWLat: coordinates._southWest.lat,
                        SWLng: coordinates._southWest.lng,
                    }
                },
                map_infinity: initialState.map_infinity
            }
        case CLEAR_RECTANGLE_LATLNGS:
            return {
                ...state,
                last_group_changed: 'rectangle',
                last_action: 'remove',
                rectangle: 'rectangle',
                input: { ...state.input,
                    rectangle: initialState.input.rectangle
                },
                map_infinity: initialState.map_infinity
            }
        case MANUAL_LATLNGS_CHANGE: 
            var { value, name} = action.payload
            return {
                ... state,
                last_group_changed: 'rectangle',
                rectangle: 'rectangle',
                input: { ...state.input,
                    rectangle: { ...state.input.rectangle,
                        [name]: value,
                    }
                },
                map_infinity: initialState.map_infinity
            }
        case SET_DATE_CHANGE: 
            var { name, date } = action.payload
            return {
                ... state,
                last_group_changed: name.replace('from','').replace('to',''),
                rectangle: name,
                input: { ...state.input,
                    [name]: date,
                },
                map_infinity: initialState.map_infinity
            }
        case SET_BUFFER_ID:
            return {
                ... state,
                last_group_changed: 'buffer',
                rectangle: 'buffer',
                input: { ...state.input,
                    buffer: { ...state.input.buffer,
                        id: action.payload,
                    }
                },
                map_infinity: initialState.map_infinity
            }
        case SET_BUFFER_DISTANCE:
            return {
                ... state,
                last_group_changed: 'buffer',
                rectangle: 'buffer',
                input: { ...state.input,
                    buffer: { ...state.input.buffer,
                        radius: action.payload,
                        valid: (state.input.buffer.valid_id && action.payload != "") ? true : false
                    }
                },
                map_infinity: initialState.map_infinity
            }
        case INCLUDE_RELATED_DATA:
            return {
                ...state,
                related: { ...state.related,
                    include: action.payload,
                }
            }
        case TOGGLE_RELATED_FILTER:
            return {
                ...state,
                related: { ...state.related,
                    is_open: !state.related.is_open
                }
            }
        case RESET_FILTER_SELECTION:
            return {
                ...state,
                last_group_changed: '',
                rectangle: '',
                input: initialState.input,
                map_infinity: initialState.map_infinity,
                map_data: { ...state.map_data,
                    occs: initialState.map_data.occs,
                    tens: initialState.map_data.tens
                    },
                active_filters: initialState.active_filters
            }
        case VALID_BUFFER_ID:
            return {
                ... state,
                input: { ...state.input,
                    buffer: { ...state.input.buffer,
                        valid_id: false,
                        Lat: '',
                        Lng: '',
                        valid: false
                    }
                }
            }
        case SET_ID_CENTROID:
            const { success, lat, lng } = action.payload
            return {
                ... state,
                input: { ...state.input,
                    buffer: { ...state.input.buffer,
                        valid_id: success,
                        Lat: success ? lat : '', 
                        Lng: success ? lng : '', 
                        valid: (success && state.input.buffer.radius != '') ? true : false
                    }
                }
            }
        case SET_UPDATE_TYPE:
            return {
                ... state,
                input: { ...state.input,
                    updatetype: action.payload,
                }
            }
        case SET_SPATIAL_DATA: 
            var { name, data } = action.payload
            var primaryData = JSON.parse(data['primarySerializer'])
            var relatedData = JSON.parse(data['relatedSerializer'])
            var extent = data['extent']
            var rname = name == 'tens' ? 'occs' : 'tens'
            return {
                ... state, 
                map_data: { ...state.map_data,
                    [name]: state.map_infinity.offset === 0
                            ? primaryData
                            : { ...state.map_data[name],
                                    features: [...state.map_data[name].features, ...primaryData.features]
                                },
                    [rname]: state.map_infinity.offset === 0
                            ? relatedData
                            : { ...state.map_data[rname],
                                    features: [...state.map_data[rname].features, ...relatedData.features]
                                },
                    extent: extent,
                }, 
                map_infinity: { ...state.map_infinity,
                    hasMore: data.hasMore,
                    total_count: data.totalCount,
                    offset: state.map_infinity.offset + state.map_infinity.limit,
                    loading: false                 
                }
            }
        case SPATIAL_DATA_REF: 
            var { name, ref } = action.payload
            return {
                ... state,  
                map_data: { ...state.map_data,
                    [name]: ref
                }
                // [name]: ref
            }
        case SET_MAP: 
            return {
                ...state,  
                map_data: { ...state.map_data,
                    map: action.payload
                }
            }
        case SET_MAP_LOADING:
            return {
                ...state,
                map_infinity: { ...state.map_infinity,
                    loading: true
                }
            }
        case SET_MAP_NOT_LOADING:
            return {
                ...state,
                map_infinity: { ...state.map_infinity,
                    loading: false
                }
            }
        case RESET_MAP_DATA_OFFSET:
            return {
                ...state,
                map_infinity: { ...state.map_infinity,
                    offset: 0,
                    hasMore: true,
                    total_count: null
                }
            }
        case TOGGLE_FILTER_PANEL:
            return {
                ...state,
                map_data: { ...state.map_data,
                    filteropen: !state.map_data.filteropen
                }
            }
        case SET_DATA_LIMIT:
            return {
                ...state,
                map_infinity: { ...state.map_infinity,
                    limit: action.payload
                }
            }
        default: return state
    }
}

export default filterSelectionReducer
