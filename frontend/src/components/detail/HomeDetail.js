import React, { lazy, Fragment } from 'react'
import { Route, Link, useRouteMatch } from "react-router-dom";


const TitleDetail = lazy(() => import('./TitleDetail'));
const SiteDetail = lazy(() => import('./SiteDetail'));
const HolderDetail = lazy(() => import('./HolderDetail'));

function HomeDetail() {

    let { path, url } = useRouteMatch();

    return (
        <Fragment>
            <ul id="detail-header">
                <li><Link to={`${url}/title`} name="title" >Title</Link></li>
                <li><Link to={`${url}/site`} name="site" >Site</Link></li>
                <li><Link to={`${url}/holder`} name="holder" >Holder</Link></li>
            </ul>   
            <div id="detail-groups">
                <Route path={`${path}/title`} component={TitleDetail} />
                <Route path={`${path}/site`} component={SiteDetail} />
                <Route path={`${path}/holder`} component={HolderDetail} />
            </div>
        </Fragment>
    )
}

export default HomeDetail
