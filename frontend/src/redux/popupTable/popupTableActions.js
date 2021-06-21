import { SET_FILTER_VALUES, TRIGGER_ELEMENT, SET_DATA, IS_INFINITY_TABLE, CLEAR_DATA } from './popupTableType'
import axios from 'axios';


export const clearData = datagroup => {
    return {
        type: CLEAR_DATA,
        payload: datagroup
    }
}

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

export const isInfinityTable = dict => {
    return {
        type: IS_INFINITY_TABLE,
        payload: dict
    }
}

// export const resetOffset = datagroup => {
//     return {
//         type: RESET_OFFSET,
//         payload: datagroup
//     }
// }


export const setData = dict => dispatch => {
    axios
        .get(`/data-by-indexes/?ind_lst=${dict.ind_lst}&` + 
                                        `datagroup=${dict.datagroup}&` + 
                                        `offset=${dict.offset}&` + 
                                        `limit=${dict.limit}&` + 
                                        `field=${dict.sortdict.field}&` + 
                                        `asc=${dict.sortdict.asc}&` + 
                                        `colfilters=${JSON.stringify(dict.colfiltersdict)}&` +
                                        `globalfilter=${dict.globalfilter}`)
        .then(res => {
                const { data, has_more } = res.data
                dispatch({
                    type: SET_DATA,
                    payload: {data: data, datagroup: dict.datagroup, offset: dict.offset, has_more: has_more}
                });
            })
        .catch(err => {
            console.log(err)
            });
}


