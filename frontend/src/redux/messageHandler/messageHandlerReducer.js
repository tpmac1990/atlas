import { SET_POPUP_MESSAGE, RESET_POPUP_MESSAGE } from './messageHandlerType'


// const createInitialState = () => {
//     return {message: '', type: '', trigger: false}
// }

const initialState = {
    message: null, 
    type: null, 
    style: null,
    trigger: false
    // map_page: createInitialState(),
    // detail: createInitialState(),
    // user_input: createInitialState()
}


const messageHandlerReducer = (state = initialState, action) => {
    switch(action.type){
        // case CONTROL_SELECTION_ERROR:
        //     return {
        //         ...state,
        //         map_page: { ...state.map_page,
        //             message: 'Required: Select Either Title or Site',
        //             type: 'error',
        //             trigger: !state.map_page.trigger,
        //         }
        //     }
        // case OVERSIZE_DATASET_REQUEST:
        //     return {
        //         ...state,
        //         map_page: { ...state.map_page,
        //             message: 'This is the Oversize Dataset Error',
        //             type: 'error',
        //             trigger: !state.map_page.trigger,
        //         }
        //     }
        // case OVERSIZE_LIST_REQUEST:
        //     return {
        //         ...state,
        //         map_page: { ...state.map_page,
        //             message: 'This is the Oversize List Error',
        //             type: 'error',
        //             trigger: !state.map_page.trigger,
        //         }
        //     }
        // case NO_DATA_SELECTED:
        //     return {
        //         ...state,
        //         map_page: { ...state.map_page,
        //             message: 'No Data Available.',
        //             type: 'error',
        //             trigger: !state.map_page.trigger,
        //         }
        //     }
        // case DETAIL_INCORRECT_COUNT:
        //     return {
        //         ...state,
        //         detail: { ...state.detail,
        //             message: 'Error: Incorrect Number Of Values',
        //             type: 'error',
        //             trigger: !state.detail.trigger,
        //         }
        //     }
        // case DETAIL_NO_VALUE_ENTERED:
        //     return {
        //         ...state,
        //         detail: { ...state.detail,
        //             message: 'Error: No Value Entered!',
        //             type: 'error',
        //             trigger: !state.detail.trigger,
        //         }
        //     }
        // case EMPTY_QUERYSET:
        //     return {
        //         ...state,
        //         map_page: { ...state.map_page,
        //             message: 'Your Search Has Returned No Data. Try Again.',
        //             type: 'error',
        //             trigger: !state.detail.trigger,
        //         }
        //     }
        case SET_POPUP_MESSAGE:
            return {
                ...action.payload,
                trigger: true
            }
        case RESET_POPUP_MESSAGE:
            return { ...initialState }
        default: return state
    }
}

export default messageHandlerReducer
