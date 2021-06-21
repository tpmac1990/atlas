import React, { Fragment } from 'react'
import CheckboxList from '../elements/CheckboxList'
import GroupButton from '../elements/GroupButton'
import { useSelector } from 'react-redux'

export default function HolderGroup() {

    const { areaStyle } = useSelector(state => state.filterGroup.groups.holder)
    
    const checkboxGroupList = ['holderparent','holdertype','holdername']

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
            <GroupButton name='holder' />
            <div className={areaStyle}>
                { checkboxGroups }
            </div>
        </Fragment>
    )
}
