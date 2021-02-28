import { ITEM_SELECTED, ITEM_UNSELECTED, SET_RECTANGLE_LATLNGS, MANUAL_LATLNGS_CHANGE, SET_DATE_CHANGE, 
    SET_BUFFER_ID, SET_BUFFER_DISTANCE, INCLUDE_RELATED_DATA, TOGGLE_RELATED_FILTER, RESET_FILTER_SELECTION, 
    VALID_BUFFER_ID, CLEAR_RECTANGLE_LATLNGS, SET_ID_CENTROID, IS_BUFFER_RADIUS_VALID, SET_UPDATE_TYPE } from './filterSelectionType'

const initialState = {
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
        lodgedate: '',
        startdate: '',
        enddate: '',
        materialcategory: [],
        materialname: [],
        materialcategoryrelated: [],
        materialnamerelated: [],
        holdertype: [],
        holderposition: [],
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
    includeRelated: false,
    relatedOpen: false,
}


// Reducer function
const filterSelectionReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case ITEM_SELECTED: 
            var { value, pk } = action.payload
            return {
                ... state,      
                input: { ...state.input,
                    [value]: [ ...state.input[value], pk ]
                }
            }
        case ITEM_UNSELECTED:
            var { value, pk } = action.payload
            return {
                ...state,
                input: { ...state.input,
                    [value]: state.input[value].filter(val => val != pk )
                }
            }
        case SET_RECTANGLE_LATLNGS: 
            const coordinates = action.payload
            return {
                ... state,
                input: { ...state.input,
                    rectangle: { ...state.input.rectangle,
                        NELat: coordinates._northEast.lat,
                        NELng: coordinates._northEast.lng,
                        SWLat: coordinates._southWest.lat,
                        SWLng: coordinates._southWest.lng,
                    }
                }
            }
        case CLEAR_RECTANGLE_LATLNGS:
            return {
                ...state,
                input: { ...state.input,
                    rectangle: initialState.input.rectangle
                }
            }
        case MANUAL_LATLNGS_CHANGE: 
            var { value, name} = action.payload
            return {
                ... state,
                input: { ...state.input,
                    rectangle: { ...state.input.rectangle,
                        [name]: value,
                    }
                }
            }
        case SET_DATE_CHANGE: 
            var { name, date } = action.payload
            return {
                ... state,
                input: { ...state.input,
                    [name]: date,
                }
            }
        case SET_BUFFER_ID:
            return {
                ... state,
                input: { ...state.input,
                    buffer: { ...state.input.buffer,
                        id: action.payload,
                    }
                }
            }
        case SET_BUFFER_DISTANCE:
            return {
                ... state,
                input: { ...state.input,
                    buffer: { ...state.input.buffer,
                        radius: action.payload,
                        valid: (state.input.buffer.valid_id && action.payload != "") ? true : false
                    }
                }
            }
        case INCLUDE_RELATED_DATA:
            return {
                ...state,
                includeRelated: action.payload
            }
        case TOGGLE_RELATED_FILTER:
            return {
                ...state,
                relatedOpen: !state.relatedOpen
            }
        case RESET_FILTER_SELECTION:
            return initialState
        case VALID_BUFFER_ID:
            return {
                ... state,
                input: { ...state.input,
                    buffer: { ...state.input.buffer,
                        valid_id: action.payload,
                    }
                }
            }
        case SET_ID_CENTROID:
            return {
                ... state,
                input: { ...state.input,
                    buffer: { ...state.input.buffer,
                        valid_id: action.payload.success,
                        Lat: action.payload.lat, 
                        Lng: action.payload.lng, 
                        valid: (action.payload.success && state.input.buffer.radius != "") ? true : false
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
        default: return state
    }
}

export default filterSelectionReducer
