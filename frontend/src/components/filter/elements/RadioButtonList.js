import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUpdateType } from '../../../redux'


export default function UpdateTypeGroup(props) {

    const dispatch = useDispatch()

    const { lst } = props

    const { updatetype } = useSelector(state => state.filterSelection.input)

    function Handler(e){
        dispatch(setUpdateType(e.target.name))
    }

    return (lst.map(group => {
        return (
            <Fragment key={group}>
                <input checked={updatetype == group} id={group + 'ctrl'} type="radio" name={group} onChange={Handler} />
                <label htmlFor={group + 'ctrl'} className="label-c1">{group}</label><br/>
            </Fragment>
        )
    }))
}
