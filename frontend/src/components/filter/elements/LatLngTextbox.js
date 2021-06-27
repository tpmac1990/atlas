import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLatLngsManually } from '../../../redux'

export default function LatLngTextbox(props) {

    const dispatch = useDispatch()

    const { name } = props

    const title = name.substring(2,5) == 'Lat' ? 'Latitude' : 'Longitude'

    const coord = useSelector(state => state.filterSelection.input.rectangle)[name]

    function coordChangeHandler(e){
        dispatch(setLatLngsManually({name: name, value: e.target.value}))
    }

    return (
        <div className='input-group-c3'>
            <label>{title}</label>
            <input type="number" name={name} value={coord} onChange={coordChangeHandler}/>
        </div>        
    )
}
