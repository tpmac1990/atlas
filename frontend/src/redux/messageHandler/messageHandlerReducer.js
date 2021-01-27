import { CONTROL_SELECTION_ERROR, NO_BUFFER_ID_SELECTED, OVERSIZE_DATASET_REQUEST, OVERSIZE_LIST_REQUEST } from './messageHandlerType'

const initialState = {
    message: '',
    type: '',
    trigger: false,
}

const messageHandlerReducer = (state = initialState, action) => {
    switch(action.type){
        case CONTROL_SELECTION_ERROR:
            return {
                ...state,
                message: 'First Select A Dataset & Direction!',
                type: 'error',
                trigger: !state.trigger,
            }
        case NO_BUFFER_ID_SELECTED:
            return {
                ...state,
                message: 'Enter A Valid ID To Buffer Around!',
                type: 'error',
                trigger: !state.trigger,
            }
        case OVERSIZE_DATASET_REQUEST:
            return {
                ...state,
                message: 'Dataset Request Is Too Large. Please Filter Further!',
                type: 'error',
                trigger: !state.trigger,
            }
        case OVERSIZE_LIST_REQUEST:
            return {
                ...state,
                message: 'List Request Is Too Large. Please Filter Other Options Further!',
                type: 'error',
                trigger: !state.trigger,
            }
        default: return state
    }
}

export default messageHandlerReducer
