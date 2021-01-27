import React, { Fragment } from 'react'
import GroupButton from '../elements/GroupButton'
// import IDBufferSubGroup from '../elements/IDBufferSubGroup'
import { useSelector } from 'react-redux'

function IDBufferGroup() {

    const items = useSelector(state => state.filterGroup.groups)

    return (
        <Fragment>
            <GroupButton name='idbuffer' />
            <div className={items.idbuffer.areaStyle}>
                <GroupButton name='idtypes' />
                <IDBufferSubGroup />
            </div>
        </Fragment>
    )
}

// export default IDBufferGroup