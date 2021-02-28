import React, { useRef, useEffect } from 'react';
import { storeSpatialRefs, setFilterValues } from '../../redux'
import { GeoJSON } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'


function PolygonLayer () {

    const dispatch = useDispatch()

    // Tenement geospatial features
    const { tens } = useSelector(state => state.spatialData)

    // ref to the tenements layer. 
    const tenRef = useRef(); 

    // // store the tens ind values in the popupTable state to create the table if required
    // useEffect(() => {
    //     if ( tens.features.length != 0 ) {
    //         const arr = tens.features.map(row => {
    //             return row.properties.pk
    //         })
    //         dispatch(setFilterValues({ind_lst: arr, datagroup: 'titles'}))
    //     }
    // },[tens])

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

    // slice lines that exceed the width of the popup box.
    function slicePopupInfo(item) {
        const jitem = typeof item === 'object' ? item.join(', ') : item
        return jitem.length > 30 ? jitem.slice(0,33) + '...' : jitem
    }

    // dates with a year of 2999 are irrelevant.
    function formatDate(date) {
        const sDate = date.split('-')
        return sDate[0] == '2999' ? '' : `${sDate[2]}-${sDate[1]}-${sDate[0]}`
    }

    function popUpFunctionT(e){
        const { target } = e
        const { pk } = target.feature.properties
        axios
            .post("/popup-query/", {type: 'Tenement', pk: pk})
            .then(res => { 
                const { typ, status, lodgedate, startdate, enddate, oid, holder, majmat } = res.data.fields
                const fmajmat = slicePopupInfo(majmat)
                const fholder = slicePopupInfo(holder)
                const foid = slicePopupInfo(oid)
                const ftyp = slicePopupInfo(typ)
                const fstatus = slicePopupInfo(status)
                const flodgedate = formatDate(lodgedate)
                const fstartdate = formatDate(startdate)
                const fenddate = formatDate(enddate) 
                target.bindPopup(
                    `<div class='polyPopup'>
                        <h4>${pk}</h4>
                        <hr/>
                        <div>
                            <table>
                                <tr><td>Type</td><td>${ftyp}</td></tr>
                                <tr><td>Status</td><td>${fstatus}</td></tr>
                                <tr><td>Lodge Date</td><td>${flodgedate}</td></tr>
                                <tr><td>Start Date</td><td>${fstartdate}</td></tr>
                                <tr><td>End Date</td><td>${fenddate}</td></tr>
                                <tr><td>Other IDs</td><td>${foid}</td></tr>
                                <tr><td>Holder</td><td>${fholder}</td></tr>
                                <tr><td>Major Materials</td><td>${fmajmat}</td></tr>
                            </table>
                        </div>
                    </div>`
                ).openPopup()
            })
            .catch(err => console.log(err));
    }


    function onEachFeature (feature, layer) {
        if (feature.properties && feature.properties.pk) {
            layer.on("click",popUpFunctionT);
            // layer.setStyle({
            //     color: 'green',
            //     fillColor: 'yellow',
            // })
        }
    }

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