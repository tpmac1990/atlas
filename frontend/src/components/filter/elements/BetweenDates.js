import React from 'react'
import { useSelector } from 'react-redux'
import DateBox from './DateBox'

function BetweenDates(props) {

    const { name, title } = props
    const subgroup = `${name}date`
    const dic = {name: name, display: `${title}:`}

    const { areaStyle } = useSelector(state => state.filterGroup.groups[subgroup])

    return (
        <div className={areaStyle}>
            <DateBox key={name} dic={dic}/>
        </div>
    )
}

export default BetweenDates
