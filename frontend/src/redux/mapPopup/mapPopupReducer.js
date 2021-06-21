import { SET_MAP_POPUP_DATA, SET_POPUP_TARGET } from './mapPopupType'

const initialState = {
    data: {},
    target: null,
    dataset: null
}

const mapPopupReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case SET_MAP_POPUP_DATA: 
            const { data, dataset } = action.payload
            return {
                ...state,
                    data: data,
                    dataset: dataset
            }
        case SET_POPUP_TARGET:
            return {
                ...state,
                    target: action.payload
            }
        default: return state
    }
}

export default mapPopupReducer
