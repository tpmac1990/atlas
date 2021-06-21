import React, { useState, lazy, useEffect } from 'react'
import { Route, Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import SubSiteDetail from './sub/SubSiteDetail';
import IncorrectCountError from '../message/IncorrectCountError';
import { useHistory } from "react-router-dom";
import InfinitySelect from '../reusable/infinitySelect/InfinitySelect'

const SiteEdit = lazy(() => import('./edit/SiteEdit'));


function SiteDetail(){

    // const dispatch = useDispatch()

    // const [titleValue, setTitleValue] = useState('')

    let history = useHistory();

    const { dropdown } = useSelector(state => state)

    let { path, url } = useRouteMatch();

    // will direct to the detail page when the selection is changed in the holder dropdown at the top of the page
    useEffect(() => {
        dropdown.active_dropdown == 'site_search' && dropdown.site_search && dropdown.site_search.selected.key !== '' && dropdown.active_dropdown == 'site_search' && history.push(`${url}/${dropdown.site_search.selected.key}`)
    },[dropdown])

    // 

    // function Handler(e){
    //     if ( titleValue.length != 7 ){
    //         e.preventDefault()
    //         dispatch(callDetailIncorrectCountError())
    //     }
    // }

    const SiteSelect = {name: 'site_search', endpoint: 'site-group', model: 'Occurrence', key: 'ind', label: 'ind', styles: 'infinite-select-c2'}

    return (
        <div>
            <h4 className="header-c1">Search For A Site By ID:</h4>
            <div className="lookup-c1">
                <div className='ind-infinity'>
                    <InfinitySelect dict={SiteSelect} />
                </div>
                {/* <div className="search-link-c1">
                    <Link to={`${url}/${titleValue}`} onClick={Handler} >Search</Link>
                </div> */}
                {/* <div className="selectbox-c2">
                    <input type="text" placeholder="1010101" value={titleValue} onChange={(e) => setTitleValue(e.target.value)} />
                </div> */}
                {/* <div>
                    <IncorrectCountError />
                </div> */}
            </div><hr/>
            <Route exact path={`${path}/:id`} component={SubSiteDetail} />
            <Route exact path={`${path}/edit/:id`} component={SiteEdit} />
        </div>
    )
}

export default SiteDetail
