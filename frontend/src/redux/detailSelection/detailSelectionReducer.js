import { SET_HOLDER_DATA, SET_SITE_DATA, SET_TITLE_DATA } from './detailSelectionType'


const initialState = {
    holder: null,
    site: null,
    title: null,
}

const detailSelectionReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case SET_HOLDER_DATA: 
            return {
                ...state,
                holder: action.payload
            }
        case SET_SITE_DATA: 
            return {
                ...state,
                site: action.payload
            }
        case SET_TITLE_DATA:
            return {
                ...state,
                title: action.payload
            }
        default: return state
    }
}

export default detailSelectionReducer