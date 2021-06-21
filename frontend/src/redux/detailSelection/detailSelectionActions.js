import { SET_HOLDER_DATA, SET_SITE_DATA, SET_TITLE_DATA } from './detailSelectionType'
import { DETAIL_INCORRECT_COUNT } from '../messageHandler/messageHandlerType'
import axios from 'axios';


export const getHolderData = id => dispatch => {
    axios
        .get(`/detail-holder/${id}/`)
        .then(res => {
                dispatch({
                    type: SET_HOLDER_DATA,
                    payload: res.data
                });
            })
        .catch(err => {
            console.log(err)
                // dispatch({
                //     type: DETAIL_INCORRECT_COUNT,
                // });
            });
}


// export const getHolderDataSimple = id => dispatch => {
//     axios
//         .get(`/detail-holder-simple/${id}/`)
//         .then(res => {
//                 dispatch({
//                     type: SET_HOLDER_DATA,
//                     payload: res.data
//                 });
//             })
//         .catch(err => {
//                 dispatch({
//                     type: DETAIL_INCORRECT_COUNT,
//                 });
//             });
// }

export const getSiteData = id => dispatch => {
    axios
        .get(`/detail-site/${id}/`)
        .then(res => {
                dispatch({
                    type: SET_SITE_DATA,
                    payload: res.data
                });
            })
        .catch(err => {
            console.log(err)
                // dispatch({
                //     type: DETAIL_INCORRECT_COUNT,
                // });
            });
}


export const getTitleData = id => dispatch => {
    axios
        .get(`/detail-title/${id}/`)
        .then(res => {
                dispatch({
                    type: SET_TITLE_DATA,
                    payload: res.data
                });
            })
        .catch(err => {
            console.log(err)
                // dispatch({
                //     type: DETAIL_INCORRECT_COUNT,
                // });
            });
}

