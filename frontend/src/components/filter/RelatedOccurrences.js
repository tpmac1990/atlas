import React, { Fragment } from 'react'
import TypeGroup from './groups/TypeGroup'
import StatusGroup from './groups/StatusGroup'
import MaterialGroup from './groups/MaterialGroup'
import RelatedFilterHeader from './RelatedFilterHeader'

export default function RelatedOccurrences() {
    return (
        <Fragment>
            <RelatedFilterHeader header='Related Sites' />
            <TypeGroup />
            <StatusGroup />
            <MaterialGroup />
        </Fragment>
    )
}