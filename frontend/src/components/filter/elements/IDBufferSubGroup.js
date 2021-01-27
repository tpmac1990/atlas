import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setBufferID, setBufferDistance, idExists, invalidID } from '../../../redux'

function IDBufferSubGroup(props) {

    const name = 'idtypes'

    const dispatch = useDispatch()

    const { areaStyle } = useSelector(state => state.filterGroup.groups[name])
    const { idexists, input } = useSelector(state => state.filterSelection)
    // console.log(input["buffer"])
    console.log('hello')
    // const { radius: bufferdistance, id: bufferid } = input.buffer
    
    const { filterDataset } = useSelector(state => state.filterDirection)

    // const states = ['NSW','VIC','TAS','QLD','NT','SA','WA','OS']

    function testValidID(val) {
        if ( val.length == 7 ) {
            return true
        } else {
            dispatch(invalidID())
            return false
        }
    }

    function changeHandler(e) {
        const val = e.target.value
        dispatch(setBufferID(val))
        testValidID(val) && dispatch(idExists({filterDataset: filterDataset, id: val}))
    }

    function bufferChangeHandler(e) {
        dispatch(setBufferDistance(e.target.value))
    }

    const idBorderStyle = idexists ? 'successBorder' : 'failBorder'

    return (
        <Fragment>
            <div className={areaStyle} >
                <div className='inputGroupC2'>
                    <label>Gplore ID</label>
                    <input type='text' className={idBorderStyle} value={bufferid} onChange={changeHandler} /><br/>
                </div>
                <div className='inputGroupC2'>
                    <label>Radius (km)</label>
                    <input className='noNumberBtns' type='number' value={bufferdistance} onChange={bufferChangeHandler} />
                </div>
            </div>
        </Fragment>
    )
}

// export default IDBufferSubGroup