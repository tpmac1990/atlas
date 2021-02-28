import React, { Fragment } from 'react'
import GroupButton from '../elements/GroupButton'
import { useSelector } from 'react-redux'
import CheckboxList from '../elements/CheckboxList'


function TypeGroup (props) {

    const items = useSelector(state => state.filterGroup.groups)

    const { relatedOpen } = useSelector(state => state.filterSelection)

    if ( relatedOpen ) {
        var checkboxGroupList = ['typesimplerelated','typedetailrelated']
        var name = 'typerelated'
    } else {
        var checkboxGroupList = ['typesimple','typedetail']
        var name = 'type'
    }

    const style = items[name].areaStyle

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

export default TypeGroup