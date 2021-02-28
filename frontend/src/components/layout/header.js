import React from 'react'
import { Link } from "react-router-dom"
import logo from '../../assets/images/logo/compasswhite.png'

function header() {

    return (
        <nav id="navbar">
            <ul>
                <li><Link to="/attribution">Attribution</Link></li>
                <li><Link to="/">Map</Link></li>
                <li><Link to="/detail">Detail</Link></li>
            </ul>
            <img src={logo} />
            <ul>
                <li><Link to="/attribution">Keep me posted!</Link></li>
            </ul>
        </nav>
    )
}

export default header
