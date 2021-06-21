import React from 'react'
import { useSelector } from 'react-redux'
import DateBox from './DateBox'

function DateSubArea(props) {

    const { name } = props

    const { areaStyle, opened, open } = useSelector(state => state.filterGroup.groups[name])

    const dateTypes = [
        {name: 'lodge', display: 'Lodge Date:'}, 
        {name: 'start', display: 'Start Date:'},
        {name: 'end', display: 'End Date:'},
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

export default DateSubArea

