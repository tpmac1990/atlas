import React from 'react'
import TypeGroup from './groups/TypeGroup'
import StatusGroup from './groups/StatusGroup'
// import IDBufferGroup from './groups/IDBufferGroup'
import MaterialGroup from './groups/MaterialGroup'


function OccurrenceBuffer () {
    return (
        <div className='full'>
            <IDBufferGroup />
            <TypeGroup />
            <StatusGroup />
            <MaterialGroup />
        </div>
    )
}

// export default OccurrenceBuffer