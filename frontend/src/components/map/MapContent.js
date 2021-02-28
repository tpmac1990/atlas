import React, { useEffect, useRef, useLayoutEffect } from 'react'
import { Map } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { setMap, toggleFilterPanel } from './../../redux'
import { CoordinatesControl } from 'react-leaflet-coordinates'
import Layers from './Layers'
import Panel from '../filter/Panel'
import Draw from './Draw'
import MessageBar from '../message/messageBar'

function MapContent() {

  const dispatch = useDispatch()
  // latlng
  const maxBounds = [
    [-50, 90],
    [5, 180]
  ]
  const center = [-27, 132]

  const { map, filteropen, extent } = useSelector(state => state.spatialData)

  // zoom map to the bounds of the filtered data. 
  if (extent != null){
    var southWest = new L.LatLng(extent['SWLat'], extent['SWLng']),
        northEast = new L.LatLng(extent['NELat'], extent['NELng']),
        bounds = new L.LatLngBounds(southWest, northEast);
        map.fitBounds(bounds, {padding: [10, 10]})
  }
  
  const mapWidthStyle = filteropen ? 'mapWithFilter' : 'fullMap'
  const toggleIcon = filteropen ? <span className="material-icons">radio_button_checked</span> : <span className="material-icons">radio_button_unchecked</span>

  const mapRef = useRef()

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

  return (
    <div id="map-wrapper">
      <MessageBar />
      <Panel />
      <div id="map-area" className={mapWidthStyle}>
        <div id="map-layers">
          <Map center={center} maxBounds={maxBounds} zoom={4} minZoom={4} ref={mapRef}>
            <Layers center={center}/>
            <Draw />
            <CoordinatesControl
              position="bottomleft"
              />
          </Map>  
        </div>
        <div id="filter-toggle" onClick={filterToggleHandler}>
          {toggleIcon}
        </div>
      </div>
    </div>
  )
}


export default MapContent
