import { SET_POPUP_MESSAGE } from '../messageHandler/messageHandlerType'


export const saveUserEmail = values => dispatch => {
    axios
        .post("/create-keep-posted/", values)
        .then(res => {
                dispatch({
                    type: SET_POPUP_MESSAGE,
                    payload: {message: "You are now on the mail list!", type: 'success', style: 'success-fixed-user'}
                });
            })
        .catch(err => {
                // console.log(err)
                dispatch({
                    type: SET_POPUP_MESSAGE,
                    payload: {message: "Sorry, an error has occurred. Please try again later", type: 'error', style: 'error-fixed-user'}
                });
            });
}


export const saveUserFeedback = values => dispatch => {
    axios
        .post("/create-feedback/", values)
        .then(res => {
                dispatch({
                    type: SET_POPUP_MESSAGE,
                    payload: {message: "Thanks for your feedback!", type: 'success', style: 'success-fixed-user'}
                });
            })
        .catch(err => {
                // console.log(err)
                dispatch({
                    type: SET_POPUP_MESSAGE,
                    payload: {message: "Sorry, an error has occurred. Please try again later", type: 'error', style: 'error-fixed-user'}
                });
            });
}
