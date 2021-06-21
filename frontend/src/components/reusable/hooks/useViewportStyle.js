import { useState, useEffect } from 'react';
import useWindowDimensions from './useWindowDimensions'

// determines if the viewport is the size for a mobile or desktop. This is used to style components

const getViewportStyle = windowDimensions => {

    const { height, width } = windowDimensions

    if ( width >= 1100 ){
        return {viewportStyle: 'desktop'}
    } else {
        return {viewportStyle: 'mobile'}
    }

}

export default function useViewportStyle() {

    const windowDimensions = useWindowDimensions();
    const [ viewportStyle, setViewportStyle ] = useState(getViewportStyle(windowDimensions))

    useEffect(() => {
        setViewportStyle(getViewportStyle(windowDimensions))
    },[windowDimensions])

    return viewportStyle;
}