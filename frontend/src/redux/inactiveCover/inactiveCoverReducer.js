import { TOGGLE_FULL_SCREEN_INACTIVE } from './inactiveCoverType'

const initialState = {
    is_active: false,
}

// Reducer function
const inactiveCoverReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case TOGGLE_FULL_SCREEN_INACTIVE: 
            return {
                ... state,  
                is_active: action.payload
                // is_active: !state.is_active
            }
        default: return state
    }
}

export default inactiveCoverReducer