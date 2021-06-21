import { SET_CHECK_LIST_DATA , SET_LOADING, SET_SEARCH, FILTER_CLIENT_SIDE, RESET_OFFSET } from './checkBoxListType'
import axios from 'axios'


// get data for checkbox lists
export const getFilterCheckboxData = dict => dispatch => {
    const { name } = dict
    axios
        .post("/filter-data/", dict)
        .then(res => {
                dispatch({
                    type: SET_CHECK_LIST_DATA,
                    payload: {name: name, data: res.data}
                });
            })
        .catch(err => {
                console.log(err)
                // dispatch({
                //     type: OVERSIZE_DATASET_REQUEST,
                // });
                // dispatch(oversizeListRequest())
                // setLoading(false)
            })
}


// export const createCheckListState = name => {
//     return {
//         type: CREATE_CHECK_LIST_STATE,
//         payload: name
//     }
// }


export const setCheckBoxListIsLoading = name => {
    return {
        type: SET_LOADING,
        payload: name
    }
}

export const setCheckboxSearch = dict => {
    return {
        type: SET_SEARCH,
        payload: dict
    }
}

export const filterCheckBoxListClientSide = name => {
    return {
        type: FILTER_CLIENT_SIDE,
        payload: name
    }
}


export const resetCheckBoxListOffset = name => {
    return {
        type: RESET_OFFSET,
        payload: name
    }
}