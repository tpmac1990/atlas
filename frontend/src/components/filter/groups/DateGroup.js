import React, { Fragment } from 'react'
import GroupButton from '../elements/GroupButton'
import { useSelector } from 'react-redux'
import DateSubArea from '../elements/DateSubArea'


function DateGroup (props) {

    const items = useSelector(state => state.filterGroup.groups)

    return (
        <Fragment>
            <GroupButton name='date' />
            <div className={items.date.areaStyle}>
                <GroupButton name='subdate' />
                <DateSubArea name={'subdate'}/>
            </div>
        </Fragment>
    )
}


export default DateGroup

