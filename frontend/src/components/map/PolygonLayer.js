import React, { useRef, useEffect, useState } from 'react';
import { storeSpatialRefs, getPopupData, setPopupTarget } from '../../redux'
import { GeoJSON, Marker } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux'
import { formatDate } from '../formatting/formatting'

import useViewportStyle from '../reusable/hooks/useViewportStyle'

function PolygonLayer () {

    const dispatch = useDispatch()

    const { viewportStyle } = useViewportStyle();
    const is_large = ['tv','desktop','laptop'].includes(viewportStyle);

    const { filterSelection, mapPopup } = useSelector(state => state)
    const { data, target, dataset } = mapPopup
    const { tens } = filterSelection.map_data

    // ref to the tenements layer
    const tenRef = useRef(); 
    
    const [ firstRender, setFirstRender ] = useState(true)

    // store the tenements layer ref to state. I was using this to set the bounds, but moved that job to django
    useEffect(() => {
        const { current = {} } = tenRef;
        const { leafletElement: ten } = current; // deconstruct the leafletelement from the current
        dispatch(storeSpatialRefs({name: 'tensref', ref: ten})) // store this ref in the state
    }, [tens]) // only update the ref when the tens features change

    // clear the tenement layers and re-add them when ever the tens features change. Required as leaflet will not replace the data, but add the new data aswell.
    useEffect(() => {
        tenRef.current && tenRef.current.leafletElement.clearLayers().addData(tens)
    }, [tens])


    function popUpFunctionT(e){
        const { target } = e
        dispatch(setPopupTarget(target))
        dispatch(getPopupData({pk: e.target.feature.properties.pk, dataset: 'Tenement'}))
    }


    useEffect(() => {
        if ( !firstRender && dataset === 'Tenement' ){
            const { typ, status, lodgedate, startdate, enddate, oid, holder, majmat, ind } = data
            target.bindPopup(
                `<div class='polyPopup'>
                    <div class='popup-header'>
                        <h4>${ind}</h4>
                        <button id='popup-click-event' value='title/${ind}' class=''>More Detail >></button>
                    </div>
                    <hr/>
                    <div class='popup-body'>
                        <table>
                            <tr><td>Type</td><td>${typ}</td></tr>
                            <tr><td>Status</td><td>${status}</td></tr>
                            <tr><td>Lodge Date</td><td>${formatDate(lodgedate)}</td></tr>
                            <tr><td>Start Date</td><td>${formatDate(startdate)}</td></tr>
                            <tr><td>End Date</td><td>${formatDate(enddate)}</td></tr>
                            <tr><td>Other IDs</td><td>${oid}</td></tr>
                            <tr><td>Holder</td><td>${holder}</td></tr>
                            <tr><td>Major Materials</td><td>${majmat}</td></tr>
                        </table>
                    </div>
                </div>`
            ).openPopup()
        }
    },[data])

    // binds the tooltip that holds the title id, and the popup that contains a summary of the title
    function onEachFeature (feature, layer) {
        if (feature.properties && feature.properties.pk){
            layer.on("click",popUpFunctionT);
            is_large && layer.bindTooltip(feature.properties.pk, {className: 'id-tooltip'});
        }
            // direction: 'centre'
            // permanent: true,

            // layer.setStyle({
            //     color: 'green',
            //     fillColor: 'yellow',
            // })
        // }
    }

    useEffect(() => {
        setFirstRender(false)
    },[])
    
    return <GeoJSON key={tens} 
                    data={tens} 
                    ref={tenRef}
                    color='green' 
                    fillColor='yellow'
                    weight={1}
                    onEachFeature={onEachFeature} 
            />
}

export default PolygonLayer;