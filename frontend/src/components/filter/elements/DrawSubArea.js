import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LatLngTextbox from './LatLngTextbox'
import { clearRectangleLatLngs, toggleFilterPanel } from '../../../redux'
import useViewportStyle from '../../reusable/hooks/useViewportStyle'


function DrawSubArea (props) {

    const dispatch = useDispatch()
    const { name } = props

    const { areaStyle } = useSelector(state => state.filterGroup.groups[name])
    const { input, map_data } = useSelector(state => state.filterSelection)
    const { rectangle } = input
    const { filteropen } = map_data
    const { editHandlers } = useSelector(state => state.leafletDraw)

    const { viewportStyle } = useViewportStyle();
    const is_small = ['tablet','mobile'].includes(viewportStyle)

    // re-open the filter once the rectangle has been selected
    useEffect(() => {
        is_small && !filteropen && dispatch(toggleFilterPanel())
    },[rectangle])

    function drawRectangleHandler(){
        editHandlers.draw._modes.rectangle.handler.enable()
        // hide the filter so the user can draw the rectangle. It will open again on completion of the rectangle
        is_small && dispatch(toggleFilterPanel())
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
        <div id="draw-sub-area" className={areaStyle}>
            <button className='btn-c4' onClick={drawRectangleHandler}>Select Area on Map</button>
            {/* <button className='btn-c4' onClick={clearRectangleHandler}>Clear Rectangle</button> */}
            <button className='btn-c4' onClick={clearFieldsHandler}>Clear Selection</button>
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