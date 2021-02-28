import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleRelatedFilter } from '../../redux'

export default function RelatedFilterHeader(props) {

    const dispatch = useDispatch()

    function RelationHandler() {
        dispatch(toggleRelatedFilter())
    }

    return (
        <div>
            <div className='closeLinkc1'>
                <a href="#" onClick={RelationHandler}>x</a>
            </div>
            <h2 className='headerC1'>{props.header}</h2><hr className='hrC1'/>
        </div>
    )
}
