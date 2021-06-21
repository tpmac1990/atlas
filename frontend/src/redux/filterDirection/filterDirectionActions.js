// import { FILTER_DIRECTION, RESET_FILTER_DIRECTION, FILTER_DIRECTION_CHECKED } from './filterDirectionType'
import { SET_FILTER_DATASET, RESET_FILTER_CONTROL } from './filterDirectionType'


// sets the dataset to filter for when selecting between titles or sites.
export const setFilterDataset = choice => {
    return {
        type: SET_FILTER_DATASET,
        payload: choice
    }
}

// export const setFilterDirection = choice => {
//     return {
//         type: SET_FILTER_DIRECTION,
//         payload: choice
//     }
// }

// reset the filter
export const resetFilterControl = () => {
    return {
        type: RESET_FILTER_CONTROL,
    }
}

// export const selectFilterDirection = choice => {
//     return {
//         type: FILTER_DIRECTION,
//         payload: choice
//     }
// }

// export const checkedFilterDirection = id => {
//     return {
//         type: FILTER_DIRECTION_CHECKED,
//         payload: id
//     }
// }

// export const resetFilterDirection = () => {
//     return {
//         type: RESET_FILTER_DIRECTION
//     }
// }




