import React from 'react'
import LocationGroup from './groups/LocationGroup'
import TypeGroup from './groups/TypeGroup'
import StatusGroup from './groups/StatusGroup'
import IDGroup from './groups/IDGroup'
import MaterialGroup from './groups/MaterialGroup'
import NameGroup from './groups/NameGroup'


function OccurrenceFilter () {
    return (
        <div className='full'>
            <LocationGroup />
            <TypeGroup />
            <StatusGroup />
            <MaterialGroup />
            <NameGroup />
            <IDGroup />
        </div>
    )
}

export default OccurrenceFilter