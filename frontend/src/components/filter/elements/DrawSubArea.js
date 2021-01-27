import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LatLngTextbox from './LatLngTextbox'
import { clearRectangleLatLngs } from '../../../redux'


function DrawSubArea (props) {

    const dispatch = useDispatch()
    const { name } = props

    const { areaStyle } = useSelector(state => state.filterGroup.groups[name])

    const { editHandlers } = useSelector(state => state.leafletDraw)

    function drawRectangleHandler(){
        editHandlers.draw._modes.rectangle.handler.enable()
    }

    function clearRectangleHandler(){
        try {
            editHandlers.edit._modes.remove.handler.removeAllLayers()
        } catch(err){}
    }

    function clearFieldsHandler(){
        dispatch(clearRectangleLatLngs())
        clearRectangleHandler()
    }

    return (
        <div id="drawSubArea" className={areaStyle}>
            <button className='btn-c4' onClick={drawRectangleHandler}>Draw Rectangle</button>
            <button className='btn-c4' onClick={clearRectangleHandler}>Clear Rectangle</button>
            <button className='btn-c4' onClick={clearFieldsHandler}>Clear Fields</button>
            <h3>North East</h3>
            <LatLngTextbox name={'NELat'}/>
            <LatLngTextbox name={'NELng'}/>
            <h3>South West</h3>
            <LatLngTextbox name={'SWLat'}/>
            <LatLngTextbox name={'SWLng'}/>
        </div>
    )
}

export default DrawSubArea