import React, { Fragment } from 'react'
import GroupButton from '../elements/GroupButton'
import BetweenDates from '../elements/BetweenDates'
import { useSelector } from 'react-redux'

export default function UpdateGroup(props) {

    const { name } = props
    const group = `${name}update`
    const subgroup = `${name}date`

    const { areaStyle } = useSelector(state => state.filterGroup.groups[group])
    
    return (
        <Fragment>
            <GroupButton name={group} />
            <div className={areaStyle}>
                <GroupButton name={subgroup} />
                <BetweenDates {...props} />
            </div>
        </Fragment>
    )
}
