import React, { useEffect, useRef, useLayoutEffect, useState } from 'react'
import { Map } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { setMap, toggleFilterPanel } from './../../redux'
import { CoordinatesControl } from 'react-leaflet-coordinates'
import Layers from './Layers'
import Panel from '../filter/Panel'
import Draw from './Draw'
// import MessageBar from '../message/MessageBar'
import MapDataAdd from './MapDataAdd'



function MapContent() {

  const dispatch = useDispatch()

  // latlng
  const maxBounds = [
    [-50, 90],
    [5, 180]
  ]
  const center = [-27, 132]

  const { map, filteropen, extent } = useSelector(state => state.filterSelection.map_data)  

  const mapRef = useRef()

  // zoom map to the bounds of the filtered data when the map is ready for it 
  if (extent != null && Object.keys(map._layers).length > 0){
    const southWest = new L.LatLng(extent['SWLat'], extent['SWLng'])
    const northEast = new L.LatLng(extent['NELat'], extent['NELng'])
    const bounds = new L.LatLngBounds(southWest, northEast);
    map.fitBounds(bounds, {padding: [10, 10]})
  }
  
  const mapWidthStyle = filteropen ? 'mapWithFilter' : 'fullMap'
  // const toggleIcon = filteropen ? <span className="material-icons">radio_button_checked</span> : <span className="material-icons">radio_button_unchecked</span>

  function filterToggleHandler() {
    dispatch(toggleFilterPanel())
  }


  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    setTimeout(() => {
      map.invalidateSize()
    },1)
    dispatch(setMap(map))
  }, [mapRef])

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    map.invalidateSize();
  });

  // function FilterToggle() {
  //   return (
  //     !filteropen
  //     ? (
  //       <div id="filter-toggle" onClick={filterToggleHandler}>
  //         {toggleIcon}
  //       </div>)
  //     : null
  //   )
  // }


  return (
    <div id="map-wrapper">
      {/* <MessageBar /> */}
      <Panel />
      <div id="map-area" className={mapWidthStyle}>
        <div id="map-layers">
          <Map center={center} maxBounds={maxBounds} zoom={4} minZoom={4} ref={mapRef}>
            <Layers center={center}/>
            <Draw />
            <CoordinatesControl position="bottomleft" />
            <MapDataAdd />
          </Map>  
        </div>
        { filteropen
        ? null
        : (
          <div className="open-filter-toggle" onClick={filterToggleHandler}>
            <span className="material-icons">double_arrow</span>
          </div>)}
        {/* <div id="filter-toggle" onClick={filterToggleHandler}>
          {toggleIcon}
        </div> */}
      </div>
    </div>
  )
}


export default MapContent
