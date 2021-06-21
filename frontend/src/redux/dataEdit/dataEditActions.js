import { SET_EDIT_DATA, ADD_EDIT_DATA, REMOVE_EDIT_DATA, ADD_DICT_KEY, POST_SITE_UPDATES, ADD_EDIT_DATA_HOLDER, UPDATE_EDIT_CELL, SET_DROPDOWN_DATA,
        SET_API_OUTCOME_SUCCESS, SET_API_OUTCOME_FAIL, RESET_API_OUTCOME, RESET_EDIT_DATA } from './dataEditType'
// import { DETAIL_INCORRECT_COUNT } from '../messageHandler/messageHandlerType'
import axios from 'axios';



export const setEditData = dict => {
    return {
        type: SET_EDIT_DATA,
        payload: dict
    }
}

export const addEditData = dict => {
    return {
        type: ADD_EDIT_DATA,
        payload: dict
    }
}

export const resetEditData = value => {
    return {
        type: RESET_EDIT_DATA,
        payload: value
    }
}

export const addEditDataHolder = dict => {
    return {
        type: ADD_EDIT_DATA_HOLDER,
        payload: dict
    }
}

export const removeEditData = dict => {
    return {
        type: REMOVE_EDIT_DATA,
        payload: dict
    }
}

export const addEditDictKey = dict => {
    return {
        type: ADD_DICT_KEY,
        payload: dict
    }
}

export const updateEditCell = dict => {
    return {
        type: UPDATE_EDIT_CELL,
        payload: dict
    }
}

export const resetApiOutcome = group => {
    return {
        type: RESET_API_OUTCOME,
        payload: group
    }
}



export const postSiteUpdates = values => dispatch => {
    const { id, dict, endpoint } = values
    axios
        .post(`/edit-${endpoint}/${id}/`, dict)
        .then(res => {
            dispatch({
                type: SET_API_OUTCOME_SUCCESS,
                payload: {group: `${endpoint}_result`, name: res.data}
            });
            })
        .catch(err => {
            console.log(err)
            // dispatch({
            //     type: SET_API_OUTCOME_FAIL,
            //     payload: {group: `${endpoint}_result`}
            // });
            });
}


export const getDropdownData = values => dispatch => {
    const { model, key, label } = values
    axios
        .get(`/dropdown-data/${model}/?key=${key}&label=${label}`)
        .then(res => {
                dispatch({
                    type: SET_DROPDOWN_DATA,
                    payload: {data: res.data, model: model}
                });
            })
        .catch(err => {
            console.log(err)
                // dispatch({
                //     type: DETAIL_INCORRECT_COUNT,
                // });
            });
}


// create a new holder. pass in the name and type
export const createNewHolder = dict => dispatch => {
    // const { name, type } = values
    axios
        .post(`/create-holder/`,dict)
        .then(res => {
                dispatch({
                    type: SET_DROPDOWN_DATA,
                    payload: {data: res.data, model: model}
                });
            })
        .catch(err => {
            console.log(err)
                // dispatch({
                //     type: DETAIL_INCORRECT_COUNT,
                // });
            });
}
