import { combineReducers } from 'redux'
import filterGroupReducer from './filterGroup/filterGroupReducer'
import filterSelectionReducer from './filterSelection/filterSelectionReducer'
import filterDirectionReducer from './filterDirection/filterDirectionReducer'
import leafletDrawReducer from './leafletDraw/leafletDrawReducer'
// import spatialDataReducer from './spatialData/spatialDataReducer'
import messageHandlerReducer from './messageHandler/messageHandlerReducer'
import detailSelectionReducer from './detailSelection/detailSelectionReducer'
import popupTableReducer from './popupTable/popupTableReducer'
import inactiveCoverReducer from './inactiveCover/inactiveCoverReducer'
import dropdownReducer from './dropdown/dropdownReducer'
import dataEditReducer from './dataEdit/dataEditReducer'
import checkBoxListReducer from './checkBoxList/checkBoxListReducer'
import mapPopupReducer from './mapPopup/mapPopupReducer'
import userDataReducer from './userData/userDataReducer'

const rootReducer = combineReducers({
    filterGroup: filterGroupReducer,
    filterSelection: filterSelectionReducer,
    filterDirection: filterDirectionReducer,
    leafletDraw: leafletDrawReducer,
    // spatialData: spatialDataReducer,
    messageHandler: messageHandlerReducer,
    detailSelection: detailSelectionReducer,
    popupTable: popupTableReducer,
    inactiveCover: inactiveCoverReducer,
    dropdown: dropdownReducer,
    dataEdit: dataEditReducer,
    checkBoxList: checkBoxListReducer,
    mapPopup: mapPopupReducer,
    userData: userDataReducer
})

export default rootReducer