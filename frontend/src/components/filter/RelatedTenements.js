import React, { Fragment } from 'react'
import TypeGroup from './groups/TypeGroup'
import StatusGroup from './groups/StatusGroup'
import MaterialGroup from './groups/MaterialGroup'
import DateGroup from './groups/DateGroup'
import RelatedFilterHeader from './RelatedFilterHeader'

export default function RelatedTenements() {
    return (
        <Fragment>
            <RelatedFilterHeader header='Related Tenements' />
            <TypeGroup />
            <StatusGroup />
            <MaterialGroup />
            <DateGroup />
        </Fragment>
    )
}
