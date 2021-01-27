import { ITEM_SELECTED, ITEM_UNSELECTED, SET_RECTANGLE_LATLNGS, MANUAL_LATLNGS_CHANGE, SET_DATE_CHANGE, 
        SET_BUFFER_ID, SET_BUFFER_DISTANCE, INCLUDE_RELATED_DATA, TOGGLE_RELATED_FILTER, RESET_FILTER_SELECTION, 
        VALID_BUFFER_ID, CLEAR_RECTANGLE_LATLNGS, SET_ID_CENTROID
        } from './filterSelectionType'
import axios from 'axios'

export const selectItem = values => {
    return {
        type: ITEM_SELECTED,
        payload: values
    }
}

export const unselectItem = values => {
    return {
        type: ITEM_UNSELECTED,
        payload: values
    }
}

export const setRectangleLatLngs = coordinates => {
    return {
        type: SET_RECTANGLE_LATLNGS,
        payload: coordinates
    }
}

export const clearRectangleLatLngs = () => {
    return {
        type: CLEAR_RECTANGLE_LATLNGS,
    }
}

export const setLatLngsManually = value => {
    return {
        type: MANUAL_LATLNGS_CHANGE,
        payload: value
    }
}

export const setFilterDates = value => {
    return {
        type: SET_DATE_CHANGE,
        payload: value
    }
}

export const setBufferID = value => {
    return {
        type: SET_BUFFER_ID,
        payload: value
    }
}

export const setBufferDistance = value => {
    return {
        type: SET_BUFFER_DISTANCE,
        payload: value
    }
}

export const includeRelatedData = value => {
    return {
        type: INCLUDE_RELATED_DATA,
        payload: value
    }
}

export const toggleRelatedFilter = () => {
    return {
        type: TOGGLE_RELATED_FILTER,
        payload: ''
    }
}

export const resetFilterSelection = () => {
    return {
        type: RESET_FILTER_SELECTION,
    }
}

export const getBufferIDCentroid = values => dispatch => {
    axios
    .post("/test_id/", values)
    .then(res => {
            dispatch({
                type: SET_ID_CENTROID,
                payload: res.data
            });
        })
    .catch(err => console.log(err));
}

export const invalidBufferID = () => {
    return {
        type: VALID_BUFFER_ID,
        payload: false
    }
}

