import React, { useState, lazy, useEffect } from 'react'
import { Route, Link, useRouteMatch } from "react-router-dom";

// import { callDetailIncorrectCountError } from '../../redux';
import { useSelector, useDispatch } from 'react-redux'

import SubTitleDetail from './sub/SubTitleDetail';
// import IncorrectCountError from '../message/IncorrectCountError';
import { useHistory } from "react-router-dom";
import InfinitySelect from '../reusable/infinitySelect/InfinitySelect'

const TitleEdit = lazy(() => import('./edit/TitleEdit'));


function TitleDetail(){

    // const dispatch = useDispatch()

    // const [titleValue, setTitleValue] = useState('')

    let history = useHistory();

    const { dropdown } = useSelector(state => state)

    let { path, url } = useRouteMatch();

    // will direct to the detail page when the selection is changed in the holder seleciton
    useEffect(() => {
        dropdown.active_dropdown == 'title_search' && dropdown.title_search && dropdown.title_search.selected.key !== '' && history.push(`${url}/${dropdown.title_search.selected.key}`)
    },[dropdown])

    // function Handler(e){
    //     if ( titleValue.length != 7 ){
    //         e.preventDefault()
    //         dispatch(callDetailIncorrectCountError())
    //     }
    // }

    const SiteSelect = {name: 'title_search', endpoint: 'site-group', model: 'Tenement', key: 'ind', label: 'ind', styles: 'infinite-select-c2'}

    return (
        <div>
            <h4 className="header-c1">Search For A Title By ID:</h4>
            <div className="lookup-c1">
                <div className='ind-infinity'>
                    <InfinitySelect dict={SiteSelect} />
                </div>
                {/* <div className="search-link-c1">
                    <Link to={`${url}/${titleValue}`} onClick={Handler} >Search</Link>
                </div>
                <div className="selectbox-c2">
                    <input type="text" placeholder="1010101" value={titleValue} onChange={(e) => setTitleValue(e.target.value)} />
                </div>
                <div>
                    <IncorrectCountError />
                </div> */}
            </div><hr/>
            <Route exact path={`${path}/:id`} component={SubTitleDetail} />
            <Route exact path={`${path}/edit/:id`} component={TitleEdit} />
        </div>
    )
}

export default TitleDetail