import React, { Fragment } from 'react'
import TypeGroup from './groups/TypeGroup'
import StatusGroup from './groups/StatusGroup'
import DateGroup from './groups/DateGroup'
// import IDBufferGroup from './groups/IDBufferGroup'
import MaterialGroup from './groups/MaterialGroup'
import HolderGroup from './groups/HolderGroup'


function TenementBuffer () {
    return (
        <Fragment>
            <IDBufferGroup />
            <TypeGroup />
            <StatusGroup />
            <MaterialGroup />
            <HolderGroup />
            <DateGroup />
        </Fragment>
    )
}

// export default TenementBuffer