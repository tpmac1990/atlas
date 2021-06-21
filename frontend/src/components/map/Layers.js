import React, { Fragment, useEffect } from 'react'
import { Marker, Popup, TileLayer, Circle, FeatureGroup, LayerGroup, LayersControl, Rectangle, GeoJSON, LeafletConsumer } from 'react-leaflet'
import PointsLayer from './PointsLayer'
import PolygonLayer from './PolygonLayer'
import { useHistory } from "react-router-dom";
import { Route, Link, useRouteMatch } from "react-router-dom";


const { BaseLayer, Overlay } = LayersControl

const Layers = () => {

    let history = useHistory();
    let { path, url } = useRouteMatch();

    // DOM clickevent to navigate to the detail page from the popup button
    useEffect(() => {
        document.body.addEventListener('click', navigateToDetail );

        return function cleanup() {
            window.removeEventListener('click', navigateToDetail );
        } 
    },[]);

    const navigateToDetail = e => {
        e.target.id == 'popup-click-event' && history.push(`/detail/${e.target.value}`)
    }

    return (
        <Fragment>
            <LayersControl position="topright">
                <BaseLayer checked name="Open Street Map">
                    <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </BaseLayer>
                {/* <BaseLayer name="World Street Map">
                    <TileLayer
                    attribution='Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
                    />
                </BaseLayer> */}
                <BaseLayer name="World Topo Map">
                    <TileLayer
                    attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                    />
                </BaseLayer>
                <BaseLayer name="World Imagery">
                    <TileLayer
                    attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />
                </BaseLayer>
                <Overlay checked name="Occurrences">
                    <PointsLayer />
                </Overlay>
                <Overlay checked name="Tenements">
                    <PolygonLayer />
                </Overlay>
            </LayersControl>
        </Fragment>
    )
}



export default Layers
