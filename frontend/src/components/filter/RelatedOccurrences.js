import React, { Fragment } from 'react'
import TypeGroup from './groups/TypeGroup'
import StatusGroup from './groups/StatusGroup'
import MaterialGroup from './groups/MaterialGroup'
import RelatedFilterHeader from './RelatedFilterHeader'

export default function RelatedOccurrences() {
    return (
        <Fragment>
            <RelatedFilterHeader header='Related Occurrences' />
            <TypeGroup />
            <StatusGroup />
            <MaterialGroup />
        </Fragment>
    )
}