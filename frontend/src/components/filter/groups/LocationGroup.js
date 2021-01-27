import React, { Fragment } from 'react'
import CheckboxList from '../elements/CheckboxList'
import GroupButton from '../elements/GroupButton'
import { useSelector } from 'react-redux'
import DrawSubArea from '../elements/DrawSubArea'
import BufferSubArea from '../elements/BufferSubArea'


function LocationGroup () {

    const items = useSelector(state => state.filterGroup.groups)

    const checkboxGroupList = ['ausstate','region','local','province']

    const checkboxGroups = checkboxGroupList.map(group => {
        return (
            <Fragment key={group}>
                <GroupButton name={group} />
                <CheckboxList name={group} /> 
            </Fragment>
        )
    })

    return (
        <Fragment>
            <GroupButton name='location' />
            <div className={items.location.areaStyle}>
                { checkboxGroups }
                <GroupButton name='draw' />
                <DrawSubArea name={'draw'} />
                <GroupButton name='buffer' />
                <BufferSubArea name={'buffer'} />
            </div>
        </Fragment>
    )
}


export default LocationGroup