import React from 'react'
import { Link } from "react-router-dom";


export const TitleComponent = props => {

    const { group, index, title } = props

    return (
        <div className='detail-title'>
            <h2>{ title }</h2>
            <div>
                <Link className='link-c2' to={`../../../detail/${group}/edit/${index}`}>edit</Link>
            </div>
        </div>
    )
}
