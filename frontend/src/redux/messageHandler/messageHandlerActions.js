import { CONTROL_SELECTION_ERROR, OVERSIZE_DATASET_REQUEST, OVERSIZE_LIST_REQUEST, DETAIL_INCORRECT_COUNT, NO_DATA_SELECTED } from './messageHandlerType'

export const controlSelectionError = () => {
    return {
        type: CONTROL_SELECTION_ERROR,
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

export const callNoDataSelectedError = () => {
    return {
        type: NO_DATA_SELECTED
    }
}

export const callDetailIncorrectCountError = () => {
    return {
        type: DETAIL_INCORRECT_COUNT
    }
}


