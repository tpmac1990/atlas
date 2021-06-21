import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleRelatedFilter, closeAllGroups } from '../../redux'

export default function RelatedFilterHeader(props) {

    const dispatch = useDispatch()

    function RelationHandler() {
        dispatch(closeAllGroups())
        dispatch(toggleRelatedFilter())
    }

    return (
        <div>
            <div className='close-c2' onClick={RelationHandler}><span>x</span></div>
            <h2 className='headerC1'>{props.header}</h2><hr className='hrC1'/>
        </div>
    )
}
