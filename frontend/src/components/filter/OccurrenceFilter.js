import React from 'react'
import LocationGroup from './groups/LocationGroup'
import TypeGroup from './groups/TypeGroup'
import StatusGroup from './groups/StatusGroup'
import IDGroup from './groups/IDGroup'
import MaterialGroup from './groups/MaterialGroup'
import NameGroup from './groups/NameGroup'
import UpdateGroup from './groups/UpdateGroup'
import ChangeUpdateGroup from './groups/ChangeUpdateGroup'


function OccurrenceFilter () {
    return (
        <div className='full'>
            <LocationGroup />
            <TypeGroup />
            <StatusGroup />
            <MaterialGroup />
            <NameGroup />
            <IDGroup />
            <UpdateGroup name='addition' />
            <ChangeUpdateGroup />
        </div>
    )
}

export default OccurrenceFilter