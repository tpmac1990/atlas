import React, { createRef, useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {Marker, LayerGroup, Tooltip} from 'react-leaflet';
import { divIcon } from 'leaflet'
import { getPopupData, setPopupTarget } from '../../redux'

import useViewportStyle from '../reusable/hooks/useViewportStyle'


function PointsLayer() {

    const dispatch = useDispatch()

    const { viewportStyle } = useViewportStyle();
    const is_large = ['tv','desktop','laptop'].includes(viewportStyle);

    const { filterSelection, mapPopup } = useSelector(state => state)
    const { occs } = filterSelection.map_data
    const { data, target, dataset } = mapPopup

    const [ firstRender, setFirstRender ] = useState(true)

    const siteIcon = divIcon({
        className: '',
        html: "<div class=redmarker></div>"
    });

    let myArr = []
    let unique_occs = []
    // occs.features.forEach(item => mySet.add(item.properties.pk))
    occs.features.forEach(item => {
        const { pk } = item.properties
        if ( !myArr.includes(pk) ){
            myArr.push(pk)
            unique_occs.push(item)
        }
    })

    const occLayerRef = createRef();

    const markerRefs = useRef([]);
    markerRefs.current = [];


    function popUpFunction(e){
        const { index, pk } = e.target.options
        const marker = markerRefs.current[index]
        dispatch(setPopupTarget(marker.leafletElement))
        dispatch(getPopupData({pk: pk, dataset: 'Occurrence'}))
    }

    useEffect(() => {
        if ( !firstRender && dataset === 'Occurrence' ){
            const { typdetail, status, name, oid, majmat, ind, size } = data
            target.bindPopup(
                `<div class='polyPopup'>
                    <div class='popup-header'>
                        <h4>${ind}</h4>
                        <button id='popup-click-event' value='site/${ind}' class=''>More Detail >></button>
                    </div>
                    <hr/>
                    <div>
                        <table>
                            <tr><td>Type</td><td>${typdetail}</td></tr>
                            <tr><td>Status</td><td>${status}</td></tr>
                            <tr><td>Name</td><td>${name}</td></tr>
                            <tr><td>Size</td><td>${size}</td></tr>
                            <tr><td>Other IDs</td><td>${oid}</td></tr>
                            <tr><td>Major Materials</td><td>${majmat}</td></tr>
                        </table>
                    </div>
                </div>`
            ).openPopup()
        }
    },[data])


    const addToRefs = (el) =>{
        if (el && !markerRefs.current.includes(el)) {
            markerRefs.current.push(el)
        }
    }

    useEffect(() => {
        setFirstRender(false)
    },[])

    return (
        <LayerGroup ref={occLayerRef}>
            { unique_occs.map((occ, index) => 
                ( <Marker 
                        key={occ.properties.pk} 
                        index={index} 
                        pk={occ.properties.pk} 
                        ref={addToRefs} 
                        position={[occ.geometry.coordinates[1],occ.geometry.coordinates[0]]} 
                        icon={siteIcon} 
                        onclick={popUpFunction} 
                    >
                    { is_large
                    ? <Tooltip className='id-tooltip'>{occ.properties.pk}</Tooltip>
                    : null }
                </Marker> )
            )}
        </LayerGroup>
    )
}

export default PointsLayer;
