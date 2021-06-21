import React from 'react'
import { Link } from "react-router-dom";


const EditTitleComponent = props => {

    const { index, title } = props

    return (
        <div className='edit-title'>
            <h2>{title}<span>edit mode</span></h2>
            <div>
                <Link className='link-c2' to={`../${index}`}>detail</Link>
            </div>
        </div>
    )
}


export default EditTitleComponent
