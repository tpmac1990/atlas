import { SET_POPUP_MESSAGE, RESET_POPUP_MESSAGE } from './messageHandlerType'

// export const controlSelectionError = () => {
//     return {
//         type: CONTROL_SELECTION_ERROR,
//     }
// }

// // not used yet
// export const oversizeDatasetRequest = () => {
//     return {
//         type: OVERSIZE_DATASET_REQUEST
//     }
// }

// export const oversizeListRequest = () => {
//     return {
//         type: OVERSIZE_LIST_REQUEST
//     }
// }

// export const callNoDataSelectedError = () => {
//     return {
//         type: NO_DATA_SELECTED
//     }
// }

// export const callDetailIncorrectCountError = () => {
//     return {
//         type: DETAIL_INCORRECT_COUNT
//     }
// }



export const setPopupMessage = dict => {
    return {
        type: SET_POPUP_MESSAGE,
        payload: dict
    }
}

export const resetPopupMessage = () => {
    return {
        type: RESET_POPUP_MESSAGE,
    }
}


