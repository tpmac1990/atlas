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
        <div className='related-filter-header'>
            <div className='close-c2' onClick={RelationHandler}><span>x</span></div>
            <h2>{props.header}</h2><hr/>
        </div>
    )
}
