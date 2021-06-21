import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { storeSpatialData, setMapIsLoading } from '../../redux'


const ButtonWithToolTip = () => {

    const dispatch = useDispatch()

    const [ show, setShow ] = useState(false)
    const [ delayHandler, setDelayHandler ] = useState(null)

    const { filterSelection, filterDirection } = useSelector(state => state)
    const { filterDataset } = filterDirection
    const { map_data, related, input, map_infinity } = filterSelection

    const ClickHandler = e => {
        const { offset, limit, loading } = map_infinity
        if ( !loading ){
            const name = filterDataset === 'Tenement' ? 'tens' : 'occs'
            dispatch(setMapIsLoading())
            dispatch(storeSpatialData({name: name, dataset: filterDataset, input: input, related: related, 
                                        offset: offset, limit: limit, current_extent: map_data.extent}))
        }
    }

    const ToolTip = () => {

        const values = map_infinity
        const { total_count, limit, offset } = values

        return (
            <div className='add-data-tooltip'>
                <div></div>
                <div>{`Currently showing ${offset} of ${total_count}. Click to add another ${limit}.`}</div>
            </div>
        )
    }

    const handleMouseEnter = () => {
        // show the tooltip after a 500ms delay
        setDelayHandler(setTimeout(() => {
            setShow(true)
        }, 500))
    }

    const handleMouseLeave = () => {
        // Clears the timeout event so the tooltip will not show if the cursor has moved off the button
        clearTimeout(delayHandler)
        setShow(false)
    }

    return (
        <div>
            <button className='btn-c6' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={ClickHandler}>Add More</button>
            { show ? <ToolTip /> : null }
        </div>
    )
}


const MapDataAdd = () => {

    const { map_infinity } = useSelector(state => state.filterSelection)

    return (
        <div className='add-data-area'>
            {(map_infinity.hasMore && map_infinity.total_count)
                ? <ButtonWithToolTip />
                : null
            }
        </div>
      )
}

export default MapDataAdd
