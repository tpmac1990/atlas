import { SET_SPATIAL_DATA, SPATIAL_DATA_REF, SET_MAP, TOGGLE_FILTER_PANEL } from './spatialDataType'
// import { OVERSIZE_DATASET_REQUEST } from '../messageHandler/messageHandlerType'
import axios from 'axios'


// moved this all to the filterSelection to make it easier to implement the infinity data load for the geospatial data



export const storeSpatialData = values => dispatch => {
    axios
        .post("/spatial-query/", values)
        .then(res => {
                dispatch({
                    type: SET_SPATIAL_DATA,
                    payload: {name: values.name, data: res.data}
                });
            })
        .catch(err => {
            console.log(err)
                // dispatch({
                //     type: OVERSIZE_DATASET_REQUEST,
                // });
            });
}


export const storeSpatialRefs = values => {
    return {
        type: SPATIAL_DATA_REF,
        payload: values
    }
}


export const setMap = value => {
    return {
        type: SET_MAP,
        payload: value
    }
}


export const toggleFilterPanel = () => {
    return {
        type: TOGGLE_FILTER_PANEL
    }
}
