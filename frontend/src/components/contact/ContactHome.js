import React, { lazy, Fragment } from 'react'
import { Route, Link, useRouteMatch } from "react-router-dom";


const Feedback = lazy(() => import('./Feedback'));
const EmailDrop = lazy(() => import('./EmailDrop'));
const ContactInfo = lazy(() => import('./ContactInfo'));

const SubContactHome = () => {
    return (
        <h6 className='sub-header-tip'>Select one of the above groups to begin ...</h6>
    )
}

function ContactHome() {

    let { path, url } = useRouteMatch();
    
    return (
        <Fragment>
            <ul className="sub-header-c1">
                <li><Link to={`${url}/feedback`} name="feedback" >Feedback</Link></li>
                <li><Link to={`${url}/join-mail-list`} name="maillist" >Join Mail List</Link></li>
                <li><Link to={`${url}/contact-info`} name="contactinfo" >Contact Info</Link></li>
            </ul>   
            <div id="contact-groups">
                <Route path={`${path}/home`} component={SubContactHome} />
                <Route path={`${path}/feedback`} component={Feedback} />
                <Route path={`${path}/join-mail-list`} component={EmailDrop} />
                <Route path={`${path}/contact-info`} component={ContactInfo} />
            </div>
        </Fragment>
    )
}

export default ContactHome
