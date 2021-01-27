import { CONTROL_SELECTION_ERROR, NO_BUFFER_ID_SELECTED, OVERSIZE_DATASET_REQUEST, OVERSIZE_LIST_REQUEST } from './messageHandlerType'

export const controlSelectionError = () => {
    return {
        type: CONTROL_SELECTION_ERROR,
    }
}

export const noBufferIDSelected = () => {
    return {
        type: NO_BUFFER_ID_SELECTED
    }
}

// not used yet
export const oversizeDatasetRequest = () => {
    return {
        type: OVERSIZE_DATASET_REQUEST
    }
}

export const oversizeListRequest = () => {
    return {
        type: OVERSIZE_LIST_REQUEST
    }
}

