import { CONTROL_SELECTION_ERROR, OVERSIZE_DATASET_REQUEST, OVERSIZE_LIST_REQUEST, DETAIL_INCORRECT_COUNT, DETAIL_NO_VALUE_ENTERED, NO_DATA_SELECTED } from './messageHandlerType'

const initialState = {
    map_page: {
        message: '',
        type: '',
        trigger: false,
    },
    detail: {
        message: '',
        type: '',
        trigger: false,
    }
}


const messageHandlerReducer = (state = initialState, action) => {
    switch(action.type){
        case CONTROL_SELECTION_ERROR:
            return {
                ...state,
                map_page: { ...state.map_page,
                    message: 'First Select A Dataset & Direction!',
                    type: 'error',
                    trigger: !state.map_page.trigger,
                }
            }
        case OVERSIZE_DATASET_REQUEST:
            return {
                ...state,
                map_page: { ...state.map_page,
                    message: 'Dataset Request Is Too Large. Please Filter Further!',
                    type: 'error',
                    trigger: !state.map_page.trigger,
                }
            }
        case OVERSIZE_LIST_REQUEST:
            return {
                ...state,
                map_page: { ...state.map_page,
                    message: 'List Request Is Too Large. Please Filter Other Options Further!',
                    type: 'error',
                    trigger: !state.map_page.trigger,
                }
            }
        case NO_DATA_SELECTED:
            return {
                ...state,
                map_page: { ...state.map_page,
                    message: 'No Data Available.',
                    type: 'error',
                    trigger: !state.map_page.trigger,
                }
            }
        case DETAIL_INCORRECT_COUNT:
            return {
                ...state,
                detail: { ...state.detail,
                    message: 'Error: Incorrect Number Of Values!',
                    type: 'error',
                    trigger: !state.detail.trigger,
                }
            }
        case DETAIL_NO_VALUE_ENTERED:
            return {
                ...state,
                detail: { ...state.detail,
                    message: 'Error: No Value Entered!',
                    type: 'error',
                    trigger: !state.detail.trigger,
                }
            }
        default: return state
    }
}

export default messageHandlerReducer
