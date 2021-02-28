import React, { useState } from 'react'
import { Route, Link, useRouteMatch } from "react-router-dom";
import { useDispatch } from 'react-redux'

import { callDetailIncorrectCountError } from '../../redux';
import SubSiteDetail from './sub/SubSiteDetail';
import IncorrectCountError from '../message/IncorrectCountError';


function SiteDetail(){

    const dispatch = useDispatch()

    const [titleValue, setTitleValue] = useState('')

    let { path, url } = useRouteMatch();

    function Handler(e){
        if ( titleValue.length != 7 ){
            e.preventDefault()
            dispatch(callDetailIncorrectCountError())
        }
    }


    return (
        <div>
            <h4 className="header-c1">Search For A Site By ID:</h4>
            <div className="lookup-c1">
                <div className="search-link-c1">
                    <Link to={`${url}/${titleValue}`} onClick={Handler} >Search</Link>
                </div>
                <div className="selectbox-c2">
                    <input type="text" placeholder="1010101" value={titleValue} onChange={(e) => setTitleValue(e.target.value)} />
                </div>
                <div>
                    <IncorrectCountError />
                </div>
            </div><hr/>
            <Route exact path={`${path}/:id`} component={SubSiteDetail} />
        </div>
    )
}

export default SiteDetail