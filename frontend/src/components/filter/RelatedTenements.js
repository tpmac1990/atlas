import React, { Fragment } from 'react'
import TypeGroup from './groups/TypeGroup'
import StatusGroup from './groups/StatusGroup'
import MaterialGroup from './groups/MaterialGroup'
import DateGroup from './groups/DateGroup'
import RelatedFilterHeader from './RelatedFilterHeader'

export default function RelatedTenements() {
    return (
        <Fragment>
            <RelatedFilterHeader header='Related Titles' />
            <div className='related-filter-area'>
                <TypeGroup groupList={['typesimplerelated','typedetailrelated']} name={'typerelated'} />
                <StatusGroup groupList={['statussimplerelated','statusdetailrelated']} name={'statusrelated'} />
                <MaterialGroup groupList={['materialcategoryrelated','materialnamerelated']} name={'materialrelated'} />
                <DateGroup />
            </div>
        </Fragment>
    )
}
