import { SET_FILTER_VALUES, TRIGGER_ELEMENT, SET_DATA } from './popupTableType'
import axios from 'axios';


export const setFilterValues = values => {
    return {
        type: SET_FILTER_VALUES,
        payload: values
    }
}

export const triggerElement = name => {
    return {
        type: TRIGGER_ELEMENT,
        payload: name
    }
}


export const setData = dict => dispatch => {
    axios
        .get(`/data-by-indexes/?ind_lst=${dict.ind_lst}&datagroup=${dict.datagroup}`)
        .then(res => {
                dispatch({
                    type: SET_DATA,
                    payload: {data: res.data, datagroup: dict.datagroup}
                });
            })
        .catch(err => {
                console.log(err.message)
            });
}


