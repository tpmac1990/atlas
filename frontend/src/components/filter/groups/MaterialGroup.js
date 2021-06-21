import React, { Fragment } from 'react'
import CheckboxList from '../elements/CheckboxList'
import GroupButton from '../elements/GroupButton'
import { useSelector } from 'react-redux'

export default function MaterialGroup(props) {

    const { groupList, name } = props

    const items = useSelector(state => state.filterGroup.groups)

    // const { is_open } = useSelector(state => state.filterSelection.related)
    
    // if ( is_open ){
    //     var checkboxGroupList = ['materialcategoryrelated','materialnamerelated']
    //     var name = 'materialrelated'
    //     var style = items.materialrelated.areaStyle
    // } else {
    //     var checkboxGroupList = ['materialcategory','materialname']
    //     var name = 'material'
    //     var style = items.material.areaStyle
    // }

    const style = name == 'material' ? items.material.areaStyle : items.materialrelated.areaStyle

    const checkboxGroups = groupList.map(group => {
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
