import React, { lazy, Fragment } from 'react'
import { Route, Link, useRouteMatch } from "react-router-dom";


const TitleDetail = lazy(() => import('./TitleDetail'));
const SiteDetail = lazy(() => import('./SiteDetail'));
const HolderDetail = lazy(() => import('./HolderDetail'));

const SubHomeDetail = () => {
    return (
        <h6 className='sub-header-tip'>Select one of the above groups to begin a detailed search ...</h6>
    )
}

function HomeDetail() {

    let { path, url } = useRouteMatch();
    
    return (
        <Fragment>
            <ul className="sub-header-c1">
                <li><Link to={`${url}/title`} name="title" >Title</Link></li>
                <li><Link to={`${url}/site`} name="site" >Site</Link></li>
                <li><Link to={`${url}/holder`} name="holder" >Holder</Link></li>
            </ul>   
            <div id="detail-groups">
                <Route path={`${path}/home`} component={SubHomeDetail} />
                <Route path={`${path}/title`} component={TitleDetail} />
                <Route path={`${path}/site`} component={SiteDetail} />
                <Route path={`${path}/holder`} component={HolderDetail} />
            </div>
        </Fragment>
    )
}

export default HomeDetail
