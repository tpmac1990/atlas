import { SET_FILTER_DATASET, RESET_FILTER_CONTROL } from './filterDirectionType'


const initialState = {
    filterDataset: '',
}

const filterDirectionReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case SET_FILTER_DATASET: 
            return {
                ...state,
                filterDataset: action.payload
            }
        // case SET_FILTER_DIRECTION: 
        //     return {
        //         ...state,
        //         filterDirection: action.payload
        //     }
        case RESET_FILTER_CONTROL:
            return initialState

        default: return state
    }
}

export default filterDirectionReducer