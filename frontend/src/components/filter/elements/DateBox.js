import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilterDates } from '../../../redux'


function DateBox(props) {

    const { name, display } = props.dic

    const dispatch = useDispatch()

    const date = useSelector(state => state.filterSelection.input[name])

    function changeHandler(e) {
        dispatch(setFilterDates({name: name, date: e.target.value}))
    }

    return (
        <div className='inputGroupC4'>
            <label>{display}</label>
            <input type='date' required name={name} value={date} onChange={changeHandler} />
        </div>     
    )
}

export default DateBox