import { ITEM_SELECTED, ITEM_UNSELECTED, SET_RECTANGLE_LATLNGS, MANUAL_LATLNGS_CHANGE, SET_DATE_CHANGE, 
        SET_BUFFER_ID, SET_BUFFER_DISTANCE, INCLUDE_RELATED_DATA, TOGGLE_RELATED_FILTER, RESET_FILTER_SELECTION, 
        VALID_BUFFER_ID, CLEAR_RECTANGLE_LATLNGS, SET_ID_CENTROID, SET_UPDATE_TYPE, SET_SPATIAL_DATA, SPATIAL_DATA_REF, 
        SET_MAP, TOGGLE_FILTER_PANEL, SET_MAP_LOADING, RESET_MAP_DATA_OFFSET, SET_MAP_NOT_LOADING, SET_DATA_LIMIT, SET_ACTIVE_FILTERS } from './filterSelectionType'
import { SET_POPUP_MESSAGE } from '../messageHandler/messageHandlerType'
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
    .catch(err => {
        console.log(err)
    });
}

export const invalidBufferID = () => {
    return {
        type: VALID_BUFFER_ID
    }
}

export const setUpdateType = value => {
    return {
        type: SET_UPDATE_TYPE,
        payload: value
    }
}

export const setDataLimit = limit => {
    return {
        type: SET_DATA_LIMIT,
        payload: limit
    }
}

export const updateActiveFilters = dict => {
    return {
        type: SET_ACTIVE_FILTERS,
        payload: dict
    }
}




// removeFromActiveFilters



// actions to do with the geospatial map data
export const storeSpatialData = values => dispatch => {
    axios
        .post("/spatial-query/", values)
        .then(res => {
                const { totalCount, priDataset, relDataset, hasMore } = res.data
                // need reldata count. if reldata and pridata is > 1000 then throw warning. pridataset needs to include offset
                if ( totalCount == 0 ){
                    dispatch({
                        type: SET_POPUP_MESSAGE,
                        payload: {message: "Your Search Returned No Data. Try Again", type: 'error', style: 'error-map'}
                    });
                } else {
                    dispatch({
                        type: SET_SPATIAL_DATA,
                        payload: {name: values.name, data: res.data}
                    });
                    const msg = hasMore ? `${priDataset} of ${totalCount} primary objects displayed. Click 'Add More' to view more` : `${priDataset} primary objects displayed`
                    dispatch({
                        type: SET_POPUP_MESSAGE,
                        payload: {message: msg, type: 'success', style: 'success-map'}
                    });
                    if ( relDataset > 500 ) {
                        dispatch({
                            type: SET_POPUP_MESSAGE,
                            payload: {message: 'Filter further to reduce load time', type: 'warning', style: 'warning-map'}
                        });
                    }
                }
            })
        .catch(err => {
            console.log(err)
                // dispatch({
                //     type: OVERSIZE_DATASET_REQUEST,
                // });
            });
}

// export const setMoreSpatialData = values => dispatch => {
//     axios
//         .post("/spatial-query/", values)
//         .then(res => {
//                 dispatch({
//                     type: SET_MORE_SPATIAL_DATA,
//                     payload: {name: values.name, data: res.data}
//                 });
//             })
//         .catch(err => {
//                 dispatch({
//                     type: OVERSIZE_DATASET_REQUEST,
//                 });
//             });
// }


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

export const setMapIsLoading = () => {
    return {
        type: SET_MAP_LOADING,
    }
}

export const setMapNotLoading = () => {
    return {
        type: SET_MAP_NOT_LOADING,
    }
}

export const resetMapDataOffset = () => {
    return {
        type: RESET_MAP_DATA_OFFSET,
    }
}


export const toggleFilterPanel = () => {
    return {
        type: TOGGLE_FILTER_PANEL
    }
}



// // get data for checkbox lists
// export const getFilterCheckboxData = dict => dispatch => {
//     const { name } = dict
//     axios
//         .post("/filter-data/", dict)
//         .then(res => {
//             dispatch({
//                 type: SET_CHECK_LIST_DATA,
//                 payload: {name: name, data: res.data}
//             });
//             // setData({loaded: true, data: [...data.data, ...res.data.data]})
//             // setFilterData([...data.data, ...res.data.data])
//             // setHasMore(res.data.has_more)
//             // // if the requiresInfinityScroll is null then it is the first data load and if hasMore is false then there is no more data to load, 
//             // //      hence can filter on the client side. otherwise, filter on the server side.
//             // requiresInfinityScroll == null && setRequiresInfinityScroll(hasMore) // only trigger on the first request or on ssfilter
//             // setOffset(offset + limit)
//             // setLoading(false)
//             })
//         .catch(err => {
//                 console.log(err)
//                 // dispatch({
//                 //     type: OVERSIZE_DATASET_REQUEST,
//                 // });
//                 // dispatch(oversizeListRequest())
//                 // setLoading(false)
//             })
// }


// export const createCheckListState = name => {
//     // console.log(name)
//     return {
//         type: CREATE_CHECK_LIST_STATE,
//         payload: name
//     }
// }

