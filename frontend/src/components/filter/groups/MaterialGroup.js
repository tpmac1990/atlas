import React, { Fragment } from 'react'
import CheckboxList from '../elements/CheckboxList'
import GroupButton from '../elements/GroupButton'
import { useSelector } from 'react-redux'

export default function MaterialGroup() {

    const items = useSelector(state => state.filterGroup.groups)

    const { relatedOpen } = useSelector(state => state.filterSelection)
    
    if ( relatedOpen ){
        var checkboxGroupList = ['materialcategoryrelated','materialnamerelated']
        var name = 'materialrelated'
        var style = items.materialrelated.areaStyle
    } else {
        var checkboxGroupList = ['materialcategory','materialname']
        var name = 'material'
        var style = items.material.areaStyle
    }

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
            <GroupButton name={name} />
            <div className={style}>
                { checkboxGroups }
            </div>
        </Fragment>
    )
}
