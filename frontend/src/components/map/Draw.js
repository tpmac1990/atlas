import React, { useState, useRef, useEffect } from 'react';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useDispatch } from 'react-redux'
import { storeEditHandlers, setRectangleLatLngs } from '../../redux'
import 'leaflet-draw';

const Draw = () => {
    const [editableFG, setEditableFG] = useState(null);

    const editRef = useRef(null)

    const dispatch = useDispatch()

    // This will automatically clear the existing square when the new one is drawn
    const onCreated = e => {
        var drawType = e.layerType;
        if ( drawType == 'marker' ) {
        } else {
            dispatch(setRectangleLatLngs(e.layer._bounds))
        }

        const drawnItems = editableFG.leafletElement._layers;
        Object.keys(drawnItems).length > 1 &&
            Object.keys(drawnItems).forEach((layerid, index) => {
                if (index > 0) return;
                const layer = drawnItems[layerid];
                editableFG.leafletElement.removeLayer(layer);
            });
    };

    const onFeatureGroupReady = reactFGref => {
        // store the ref for future access to content
        setEditableFG(reactFGref);
    };

    useEffect(() => {
        const editHandlers = editRef.current.leafletElement._toolbars
        dispatch(storeEditHandlers(editHandlers))
    }, [])

    return (
        <FeatureGroup
            ref={featureGroupRef => {
                onFeatureGroupReady(featureGroupRef);
            }}>
            <EditControl 
                ref={editRef}
                position="topleft" 
                onCreated={onCreated}
                draw={{
                    polyline: false,
                    circle: false,
                    polygon: false,
                    circlemarker: false,
                }} 
                />
        </FeatureGroup>
    );
};

export default Draw;