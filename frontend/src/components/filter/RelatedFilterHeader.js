import React, { Fragment } from 'react'
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
            {/* <button onClick={RelationHandler}><span>x</span></button> */}
            <h2>{props.header}</h2><hr/>
        </div>
    )
}
