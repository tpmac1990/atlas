import React, { Fragment } from 'react'
import LocationGroup from './groups/LocationGroup'
import TypeGroup from './groups/TypeGroup'
import StatusGroup from './groups/StatusGroup'
import DateGroup from './groups/DateGroup'
import IDGroup from './groups/IDGroup'
import MaterialGroup from './groups/MaterialGroup'
import HolderGroup from './groups/HolderGroup'
import UpdateGroup from './groups/UpdateGroup'
import ChangeUpdateGroup from './groups/ChangeUpdateGroup'


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
            <UpdateGroup name='addition' />
            <UpdateGroup name='inactive' />
            <ChangeUpdateGroup />
        </Fragment>
    )
}

export default TenementFilter