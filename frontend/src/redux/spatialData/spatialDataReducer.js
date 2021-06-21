import { SET_SPATIAL_DATA, SPATIAL_DATA_REF, SET_MAP, TOGGLE_FILTER_PANEL } from './spatialDataType'


// moved this all to the filterSelection to make it easier to implement the infinity data load for the geospatial data

const initialState = {
    occs: {features : []},
    // tens: {type:"FeatureCollection",crs:{},features:[]},
    tens: {features : []},
    occsref: null,
    tensref: null,
    map: {},
    filteropen: true,
    extent: null,
}

// Reducer function
const spatialDataReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case SET_SPATIAL_DATA: 
            var { name, data } = action.payload
            const primaryData = JSON.parse(data['primarySerializer'])
            const relatedData = JSON.parse(data['relatedSerializer'])
            const extent = data['extent']
            const rname = name == 'tens' ? 'occs' : 'tens'
            return {
                ... state,  
                [name]: primaryData,
                [rname]: relatedData,
                extent: extent,
            }
        case SPATIAL_DATA_REF: 
            var { name, ref } = action.payload
            return {
                ... state,  
                [name]: ref
            }
        case SET_MAP: 
            return {
                ... state,  
                map: action.payload
            }
        case TOGGLE_FILTER_PANEL:
            return {
                ...state,
                filteropen: !state.filteropen
            }
        default: return state
    }
}

export default spatialDataReducer