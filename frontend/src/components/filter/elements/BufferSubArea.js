import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setBufferID, setBufferDistance, getBufferIDCentroid, invalidBufferID } from '../../../redux'


function DrawSubArea (props) {

    const dispatch = useDispatch()
    const { name } = props

    const { areaStyle } = useSelector(state => state.filterGroup.groups[name])
    const { input } = useSelector(state => state.filterSelection)
    const { radius: bufferdistance, id: bufferid, valid_id: validbufferid, Lat: bufferLat, Lng: bufferLng } = input.buffer
    
    const { filterDataset } = useSelector(state => state.filterDirection)

    function changeHandler(e) {
        const val = e.target.value
        // sets the gplore id to state
        dispatch(setBufferID(val))
        // If the id is 7 values long (all ids are 7 long) then check to see if it exists in the db.
        val.length == 7 ? dispatch(getBufferIDCentroid({filterDataset: filterDataset, id: val})) : dispatch(invalidBufferID())
    }

    function bufferChangeHandler(e) {
        const val = e.target.value
        // set the buffer radius to state
        dispatch(setBufferDistance(val))
    }

    const idBorderStyle = validbufferid ? 'success-border' : 'fail-border'

    return (
        <div id="buffer-sub-area" className={areaStyle}>
            <div className='input-group-c2'>
                <label>Gplore ID</label>
                <input type='text' className={idBorderStyle} value={bufferid} onChange={changeHandler} /><br/>
            </div>
            <div className='sub-details-c1'>
                <p>{`Lng: ${bufferLng}`}</p>
                <p>{`Lat: ${bufferLat}`}</p>
            </div>
            <div className='input-group-c2'>
                <label>Radius (km)</label>
                <input className='no-number-btns' type='number' value={bufferdistance} onChange={bufferChangeHandler} />
            </div>
        </div>
    )
}

export default DrawSubArea








// import React, { Fragment } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { setBufferID, setBufferDistance, idExists, invalidID } from '../../../redux'

// function IDBufferSubGroup(props) {

//     const name = 'idtypes'

//     const dispatch = useDispatch()

//     const { areaStyle } = useSelector(state => state.filterGroup.groups[name])
//     const { idexists, input } = useSelector(state => state.filterSelection)
//     const { bufferdistance, bufferid } = input
    
//     const { filterDataset } = useSelector(state => state.filterDirection)

//     // const states = ['NSW','VIC','TAS','QLD','NT','SA','WA','OS']

    // function testValidID(val) {
    //     if ( val.length == 7 ) {
    //         return true
    //     } else {
    //         dispatch(invalidID())
    //         return false
    //     }
    // }

    // function changeHandler(e) {
    //     const val = e.target.value
    //     dispatch(setBufferID(val))
    //     testValidID(val) && dispatch(idExists({filterDataset: filterDataset, id: val}))
    // }

    // function bufferChangeHandler(e) {
    //     dispatch(setBufferDistance(e.target.value))
    // }

//     const idBorderStyle = idexists ? 'success-border' : 'failBorder'

//     return (
//         <Fragment>
//             <div className={areaStyle} >
//                 <div className='input-group-c2'>
//                     <label>Gplore ID</label>
//                     <input type='text' className={idBorderStyle} value={bufferid} onChange={changeHandler} /><br/>
//                 </div>
//                 <div className='input-group-c2'>
//                     <label>Buffer Radius(km)</label>
//                     <input className='no-number-btns' type='number' value={bufferdistance} onChange={bufferChangeHandler} />
//                 </div>
//             </div>
//         </Fragment>
//     )
// }

// export default IDBufferSubGroup