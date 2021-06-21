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
            <TypeGroup groupList={['typesimple','typedetail']} name={'type'} />
            <StatusGroup groupList={['statussimple','statusdetail']} name={'status'} />
            <MaterialGroup groupList={['materialcategory','materialname']} name={'material'} />
            <HolderGroup />
            <DateGroup />
            <IDGroup />
            <UpdateGroup name='addition' title='Title Additions Dates' />
            {/* <UpdateGroup name='inactive' title='Title deactivation Dates' /> */}
            <ChangeUpdateGroup />
        </Fragment>
    )
}

export default TenementFilter