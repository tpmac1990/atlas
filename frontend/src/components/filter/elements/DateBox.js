import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilterDates } from '../../../redux'


function DateBox(props) {

    const { name, display } = props.dic

    const dispatch = useDispatch()

    // the name passed as a prop is only the core piece of the string. Add 'fromdate' & 'todate' suffix to manage the two values in state
    const fromDateName = `${name}fromdate`
    const toDateName = `${name}todate`
    const { input } = useSelector(state => state.filterSelection)
    const fromDate = input[fromDateName]
    const toDate = input[toDateName]


    const fromHandler = e => {
        dispatch(setFilterDates({name: fromDateName, date: e.target.value}))
    }

    const toHandler = e => {
        dispatch(setFilterDates({name: toDateName, date: e.target.value}))
    }

    return (  
        <div className='input-group-c5'>
            <label className='title'>{display}</label>
            <div>
                <input type='date' required value={fromDate} onChange={fromHandler} />
                <span>-</span>
                <input type='date' required value={toDate} onChange={toHandler} />
            </div>
        </div>     
    )
}

export default DateBox