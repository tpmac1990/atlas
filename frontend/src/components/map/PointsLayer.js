import React, { createRef, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {Marker, LayerGroup } from 'react-leaflet';
import { divIcon } from 'leaflet'
import axios from 'axios'


function PointsLayer() {

    const dispatch = useDispatch()

    const siteIcon = divIcon({
        className: '',
        html: "<div class=redmarker></div>"
    });

    const { occs } = useSelector(state => state.spatialData)

    const occLayerRef = createRef();

    const markerRefs = useRef([]);
    markerRefs.current = [];

    // // store the occs ind values in the popupTable state to create the table if required
    // useEffect(() => {
    //     if ( occs.features.length != 0 ) {
    //         const arr = occs.features.map(row => {
    //             return row.properties.pk
    //         })
    //         dispatch(setFilterValues({ind_lst: arr, datagroup: 'sites'}))
    //     }
    // },[occs])

    // slices the text in the popups so no line exceeds the width of the popup box.
    function slicePopupInfo(item) {
        const jitem = typeof item === 'object' ? item.join(', ') : item
        return jitem.length > 30 ? jitem.slice(0,33) + '...' : jitem
    }

    function popUpFunction(e){
        const { index, pk } = e.target.options
        const marker = markerRefs.current[index]
        axios
            .post("/popup-query/", {type: 'Occurrence', pk: pk})
            .then(res => { 
                const { typ, status, name, oid, majmat } = res.data.fields
                const ftyp = slicePopupInfo(typ)
                const fstatus = slicePopupInfo(status)
                const fname = slicePopupInfo(name)
                const foid = slicePopupInfo(oid)
                const fmajmat = slicePopupInfo(majmat)
                marker.leafletElement.bindPopup(
                    `<div class='polyPopup'>
                        <h4>${pk}</h4>
                        <hr/>
                        <div>
                            <table>
                                <tr><td>Type</td><td>${ftyp}</td></tr>
                                <tr><td>Status</td><td>${fstatus}</td></tr>
                                <tr><td>Name</td><td>${fname}</td></tr>
                                <tr><td>Other IDs</td><td>${foid}</td></tr>
                                <tr><td>Major Materials</td><td>${fmajmat}</td></tr>
                            </table>
                        </div>
                    </div>`
                ).openPopup()
            })
            .catch(err => console.log(err));
    }


    const addToRefs = (el) =>{
        if (el && !markerRefs.current.includes(el)) {
            markerRefs.current.push(el)
        }
    }

    return (
        <LayerGroup ref={occLayerRef}>
            { occs.features.map((occ, index) => 
                ( <Marker key={occ.properties.pk} index={index} pk={occ.properties.pk} ref={addToRefs} position={[occ.geometry.coordinates[1],occ.geometry.coordinates[0]]} icon={siteIcon} onclick={popUpFunction} /> )
            )}
        </LayerGroup>
    )
}

export default PointsLayer;
