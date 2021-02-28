import React from 'react'
import { useSelector } from 'react-redux'
import DateBox from './DateBox'

function BetweenDates(props) {

    const { name } = props
    const subgroup = `${name}date`


    const { areaStyle } = useSelector(state => state.filterGroup.groups[subgroup])

    const dateTypes = [
        {name: `${name}fromdate`, display: 'From Date:'}, 
        {name: `${name}todate`, display: 'To Date:'},
        ]

    const dateGroups = dateTypes.map(dic => {
        return <DateBox key={ dic.name } dic={dic}/>
    })

    return (
        <div className={areaStyle}>
            { dateGroups }
        </div>
    )
}

export default BetweenDates
