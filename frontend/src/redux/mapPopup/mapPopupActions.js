import { SET_MAP_POPUP_DATA, SET_POPUP_TARGET } from './mapPopupType'
import axios from 'axios';


export const getPopupData = dict => dispatch => {
    const { pk, dataset } = dict
    axios
    .get(`/map-popup/${pk}/?dataset=${dataset}`)
    .then(res => {
            dispatch({
                type: SET_MAP_POPUP_DATA,
                payload: {data: res.data, dataset: dataset}
            });
        })
    .catch(err => {
        console.log(err)
            // dispatch({
            //     type: DETAIL_INCORRECT_COUNT,
            // });
        });
}


export const setPopupTarget = target => {
    return {
        type: SET_POPUP_TARGET,
        payload: target
    }
}



