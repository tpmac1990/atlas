import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUpdateType } from '../../../redux'
import RadioButtonList from '../elements/RadioButtonList'


export default function UpdateTypeGroup(props) {

    const dispatch = useDispatch()
    const { name } = props

    const { areaStyle } = useSelector(state => state.filterGroup.groups[name])
    const { updatetype } = useSelector(state => state.filterSelection.input)

    function Handler(e){
        dispatch(setUpdateType(e.target.name))
    }

    const radioList = ['Change','Addition','Deactivated','None']

    return (
        <div className={areaStyle}>
            <RadioButtonList lst={radioList} />
        </div>
    )
}
