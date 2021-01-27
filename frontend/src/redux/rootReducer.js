import { combineReducers } from 'redux'
import filterGroupReducer from './filterGroup/filterGroupReducer'
import filterSelectionReducer from './filterSelection/filterSelectionReducer'
import filterDirectionReducer from './filterDirection/filterDirectionReducer'
import leafletDrawReducer from './leafletDraw/leafletDrawReducer'
import spatialDataReducer from './spatialData/spatialDataReducer'
import messageHandlerReducer from './messageHandler/messageHandlerReducer'

const rootReducer = combineReducers({
    filterGroup: filterGroupReducer,
    filterSelection: filterSelectionReducer,
    filterDirection: filterDirectionReducer,
    leafletDraw: leafletDrawReducer,
    spatialData: spatialDataReducer,
    messageHandler: messageHandlerReducer,
})

export default rootReducer