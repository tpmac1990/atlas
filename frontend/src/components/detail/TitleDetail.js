import React, { lazy, useEffect } from 'react'
import { Route, useRouteMatch } from "react-router-dom";
import { useSelector } from 'react-redux'

import SubTitleDetail from './sub/SubTitleDetail';
import { useHistory } from "react-router-dom";
import InfinitySelect from '../reusable/infinitySelect/InfinitySelect'

const TitleEdit = lazy(() => import('./edit/TitleEdit'));


function TitleDetail(){

    let history = useHistory();

    const { dropdown } = useSelector(state => state)

    let { path, url } = useRouteMatch();

    // will direct to the detail page when the selection is changed in the holder seleciton
    useEffect(() => {
        dropdown.active_dropdown == 'title_search' && dropdown.title_search && dropdown.title_search.selected.key !== '' && history.push(`${url}/${dropdown.title_search.selected.key}`)
    },[dropdown])

    const SiteSelect = {name: 'title_search', endpoint: 'site-group', model: 'Tenement', key: 'ind', label: 'ind', styles: 'infinite-select-c2'}

    return (
        <div>
            <h4 className="header-c1">Search For A Title By ID:</h4>
            <div className="lookup-c1">
                <div className='ind-infinity'>
                    <InfinitySelect dict={SiteSelect} />
                </div>
            </div><hr/>
            <Route exact path={`${path}/:id`} component={SubTitleDetail} />
            <Route exact path={`${path}/edit/:id`} component={TitleEdit} />
        </div>
    )
}

export default TitleDetail