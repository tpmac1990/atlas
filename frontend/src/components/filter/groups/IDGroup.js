import React, { Fragment } from 'react'
import GroupButton from '../elements/GroupButton'
import { useSelector } from 'react-redux'
import CheckboxList from '../elements/CheckboxList'


function IDGroup (props) {

    const items = useSelector(state => state.filterGroup.groups)

    const checkboxGroupList = ['givenids','newids']

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
            <GroupButton name='id' />
            <div className={items.id.areaStyle}>
                { checkboxGroups }
            </div>
        </Fragment>
    )
}

export default IDGroup