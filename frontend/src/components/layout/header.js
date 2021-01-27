import React from 'react'
import { Link } from "react-router-dom"
import logo from '../../assets/images/logo/compasswhite.png'

function header() {

    return (
        <nav id="navbar">
            <ul>
                <li><Link to="/attribution">Attribution</Link></li>
            </ul>
            <img src={logo} />
        </nav>
    )
}

export default header
