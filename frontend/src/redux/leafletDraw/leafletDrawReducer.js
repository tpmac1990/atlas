import { STORE_EDIT_HANDLER } from './leafletDrawType'

const initialState = {
    editHandlers: null,
}


// Reducer function
const leafletDrawReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case STORE_EDIT_HANDLER: 
            return {
                ... state,
                editHandlers: action.payload
            }
        default: return state
    }
}

export default leafletDrawReducer
