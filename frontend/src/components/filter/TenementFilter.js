import React, { Fragment } from 'react'
import LocationGroup from './groups/LocationGroup'
import TypeGroup from './groups/TypeGroup'
import StatusGroup from './groups/StatusGroup'
import DateGroup from './groups/DateGroup'
import IDGroup from './groups/IDGroup'
import MaterialGroup from './groups/MaterialGroup'
import HolderGroup from './groups/HolderGroup'


function TenementFilter () {
    return (
        <Fragment>
            <LocationGroup />
            <TypeGroup />
            <StatusGroup />
            <MaterialGroup />
            <HolderGroup />
            <DateGroup />
            <IDGroup />
        </Fragment>
    )
}

export default TenementFilter