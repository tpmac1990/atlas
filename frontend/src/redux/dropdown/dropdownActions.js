import { SET_SITE_GROUP_DATA, LOADING_TOGGLE, SET_SEARCH, SET_STATE, SET_SELECTION, 
        RESET_OFFSET, SET_DROPDOWN_VISIBILITY, INCREMENT_CREATED_ID, HIDE_ALL_DROPDOWNS, 
        SET_UNIQUE_GROUP, ADD_UNIQUE_GROUP_VALUES, SET_UNIQUE_GROUP_ERROR } from './dropdownType'
// import { DETAIL_INCORRECT_COUNT } from '../messageHandler/messageHandlerType'
import axios from 'axios';

// SET_SITE_GROUP_DATA: can work for any dataset. make more generic

export const getInfinityDropdownData = (dict, endpoint) => dispatch => {
    const { name,model,key,label,search,offset,limit,clientmax } = dict
    axios
        .get(`/${endpoint}/?value=${search}&model=${model}&key=${key}&label=${label}&offset=${offset}&limit=${limit}&clientmax=${clientmax}`)
        .then(res => {
                dispatch({
                    type: SET_SITE_GROUP_DATA,
                    payload: {data: res.data, name: name}
                });
            })
        .catch(err => {
            console.log(err)
                // dispatch({
                //     type: DETAIL_INCORRECT_COUNT,
                // });
            });
}

// export const getTitleGroupData = dict => dispatch => {
//     const { name,model,key,label,search,offset,limit,clientmax } = dict
//     axios
//         .get(`/title-group/?value=${search}&model=${model}&key=${key}&label=${label}&offset=${offset}&limit=${limit}&clientmax=${clientmax}`)
//         .then(res => {
//                 dispatch({
//                     type: SET_SITE_GROUP_DATA,
//                     payload: {data: res.data, name: name}
//                 });
//             })
//         .catch(err => {
//                 dispatch({
//                     type: DETAIL_INCORRECT_COUNT,
//                 });
//             });
// }


export const setLoading = name => {
    return {
        type: LOADING_TOGGLE,
        payload: name
    }
}

export const setSearch = dict => {
    return {
        type: SET_SEARCH,
        payload: dict
    }
}

export const setSelection = dict => {
    return {
        type: SET_SELECTION,
        payload: dict
    }
}


export const resetOffset = name => {
    return {
        type: RESET_OFFSET,
        payload: name
    }
}

export const setState = dict => {
    return {
        type: SET_STATE,
        payload: dict
    }
}

export const setDropdownVisibility = dict => {
    return {
        type: SET_DROPDOWN_VISIBILITY,
        payload: dict
    }
}

export const hideAllDropdowns = () => {
    return {
        type: HIDE_ALL_DROPDOWNS
    }
}

export const incrementCreatedId = dict => {
    return {
        type: INCREMENT_CREATED_ID,
        payload: dict
    }
}

export const setUniqueDropdownGroup = dict => {
    return {
        type: SET_UNIQUE_GROUP,
        payload: dict
    }
}

export const addUniqueGroupValues = dict => {
    return {
        type: ADD_UNIQUE_GROUP_VALUES,
        payload: dict
    }
}


export const setUniqueMultiGroupError = dict => {
    return {
        type: SET_UNIQUE_GROUP_ERROR,
        payload: dict
    }
}