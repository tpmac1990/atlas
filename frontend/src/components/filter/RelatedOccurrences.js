import React, { Fragment } from 'react'
import TypeGroup from './groups/TypeGroup'
import StatusGroup from './groups/StatusGroup'
import MaterialGroup from './groups/MaterialGroup'
import RelatedFilterHeader from './RelatedFilterHeader'

export default function RelatedOccurrences() {
    return (
        <Fragment>
            <RelatedFilterHeader header='Related Sites' />
            <TypeGroup groupList={['typesimplerelated','typedetailrelated']} name={'typerelated'} />
            <StatusGroup groupList={['statussimplerelated','statusdetailrelated']} name={'statusrelated'} />
            <MaterialGroup groupList={['materialcategoryrelated','materialnamerelated']} name={'materialrelated'} />
        </Fragment>
    )
}