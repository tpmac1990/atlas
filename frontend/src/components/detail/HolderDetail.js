import React, { useState } from 'react'
import { AsyncPaginate } from "react-select-async-paginate";
import { Route, Link, useRouteMatch } from "react-router-dom";

import loadHolderOptions from './sub/loadHolderOptions';
import SubHolderDetail from './sub/SubHolderDetail';

// put value in redux
// create another route to go one deeper
function HolderDetail(){

    const [holderLookup, setHolderLookup] = useState({value: '', label: ''})

    let { path, url } = useRouteMatch();

    function Handler(e){
        if ( holderLookup.value == '' ){
            e.preventDefault()
        }
    }
    
    return (
        <div>
            <h4 className="header-c1">Search For A Title Holder:</h4>
            <div className="lookup-c1">
                <div className="search-link-c1">
                    <Link to={`${url}/${holderLookup.value}`} onClick={Handler} >Search</Link>
                </div>
                <div className="selectbox-c1">
                    <AsyncPaginate
                        label="Title Holder"
                        name="title_holder"
                        placeholder="Company Pty Ltd"
                        value={holderLookup}
                        loadOptions={loadHolderOptions}
                        onChange={(e) => setHolderLookup(e)}
                    />
                </div>
            </div><hr/>
            <Route exact path={`${path}/:id`} component={SubHolderDetail} />
        </div>
    )
}

export default HolderDetail
