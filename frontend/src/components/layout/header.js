import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import useViewportStyle from '../reusable/hooks/useViewportStyle'
import logo from '../../assets/images/logo/compasswhite.png'
import MessageBar from '../message/MessageBar'

function header() {

    const { viewportStyle } = useViewportStyle();
    const navLinksStyle = viewportStyle === 'mobile' ? 'ul-mobile' : 'ul-desktop'

    const [ showNavList, setShowNavList ] = useState(viewportStyle === 'mobile' ? false : true)

    // change nav menu display depending on viewpoint size
    useEffect(() => {
        setShowNavList(viewportStyle === 'mobile' ? false : true)
    },[viewportStyle])

    // If in mobile view and an option is clicked, then collapse the burger
    const MenuDropdownHandler = () => {
        viewportStyle === 'mobile' && setShowNavList(false)
    }

    const ToYoutubeHandler = e => {
        e.preventDefault()
        window.open("https://www.youtube.com/channel/UCmOTkRrMXq0hH-uUwmv5Tqw/playlists", "_blank")
    }

    return (
        <nav id="navbar">
            { 
                viewportStyle === 'mobile'
                ? (
                    <div className='burger' onClick={() => setShowNavList(prev => !prev)}>
                        <span className="material-icons">menu</span>
                    </div>
                )
                : null
            }
            {
                showNavList
                ? (
                    <ul className={navLinksStyle} onClick={MenuDropdownHandler}>
                        <li><Link to="/attribution">Attribution</Link></li>
                        <li><a href="https://www.youtube.com/channel/UCmOTkRrMXq0hH-uUwmv5Tqw/playlists" onClick={ToYoutubeHandler} style={{'cursor': 'pointer'}}>Demos</a></li>
                        <li><Link to="/">Map</Link></li>
                        <li><Link to="/detail/home">Detail</Link></li>
                        <li><Link to="/feedback">Feedback</Link></li>
                        <li><Link to="/stayposted">Keep me posted!</Link></li>
                    </ul>
                )
                : null
            }
            <img src={logo} />
            {/* <ul>
                <li><Link to="/feedback">Feedback</Link></li>
                <li><Link to="/stayposted">Keep me posted!</Link></li>
            </ul> */}
            <MessageBar />
        </nav>
    )
}

export default header
