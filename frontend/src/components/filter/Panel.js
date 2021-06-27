import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import { closeAllGroups, storeSpatialData, 
    toggleRelatedFilter, includeRelatedData, resetFilterControl, 
    resetFilterSelection, resetFilterGroupState, setFilterValues, 
    triggerElement, toggleFullScreenInactive, 
    resetMapDataOffset, setMapIsLoading, toggleFilterPanel, setPopupMessage, setMapNotLoading, setDataLimit,
    updateActiveFilters } from '../../redux'

import { updateFilterList } from './filterLists'
import useViewportStyle from '../reusable/hooks/useViewportStyle'
// import { formatForCheckboxList } from './functions/formatFilterSelection'
import Control from './Control'
import RelatedData from './RelatedData'
import FilterGroups from './FilterGroups'


const TooltipC1 = props => {
     return (
        <div>
            <div></div>
            <div>{props.msg}</div>
        </div>
     )
}

// The 'clear filter' & 'display data in table form' icon buttons at the top of the panel and their tooltips
const IconBtn = props => {

    const { clickHandler, iconStyle, tooltip } = props

    const { viewportStyle } = useViewportStyle();
    const is_large = ['tv','desktop','laptop'].includes(viewportStyle)

    const [ show, setShow ] = useState(false)
    const [ delayHandler, setDelayHandler ] = useState(null)

    const handleMouseEnter = () => {
        setDelayHandler(setTimeout(() => {
            setShow(true)
        }, 500))
    }

    const handleMouseLeave = () => {
        clearTimeout(delayHandler)
        setShow(false)
    }

    // only show the tooltip if on a large screen
    return (
        <div>
            <span className="material-icons" onClick={clickHandler} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >{iconStyle}</span>
            {( show && is_large )
            ? <TooltipC1 msg={tooltip} />
            : null }
        </div>
    )
}


const FilterToggle = () => {

    const dispatch = useDispatch()

    const filterToggleHandler = () => {
        dispatch(toggleFilterPanel())
    }

    return (
        <div className='filter-toggle' onClick={filterToggleHandler}>
            <span className="material-icons">double_arrow</span>
        </div>
    )
}



function Panel () {

    const { filterSelection, leafletDraw } = useSelector(state => state)
    // const { filterDataset, filterDirection } = useSelector(state => state.filterDirection)
    const { filterDataset } = useSelector(state => state.filterDirection)
    // const { includeRelated, relatedOpen, filteropen, occs, tens } = filterSelection
    const { map_data, related, input, map_infinity, last_group_changed, active_filters } = filterSelection
    const { primary: pri_filters, related: rel_filters } = active_filters
    const { offset, limit, loading } = map_infinity
    const { filteropen, occs, tens } = map_data
    const { include, is_open } = related
    // const { filteropen, occs, tens } = spatialData
    const { editHandlers } = leafletDraw
    // const { titles, sites } = useSelector(state => state.popupTable)

    const relBtnStyle = include ? 'btn-c1 showEle' : 'btn-c1 hideEle'
    const panelStyle = filteropen ? 'showPanel' : 'hidePanel'

    const { viewportStyle } = useViewportStyle();
    const is_small = ['tablet','mobile'].includes(viewportStyle)

    const [tableSelect, setTableSelect] = useState(false)

    const dispatch = useDispatch()

    // calculate and set the data limit by determining the dataset and if related data is included
    // include: true if related data is also part of the search
    // related_count: the number of related items to filter for
    useEffect(() => {
        let new_limit
        if (filterDataset === 'Tenement'){
            new_limit = !include 
                        ? 400 
                        : rel_filters.length > 0
                            ? 250
                            : 100
        } else {
            new_limit = include ? 400 : 600 
        }
        dispatch(setDataLimit(new_limit))
    },[filterDataset,include,rel_filters])


    // when a filter is added or removed in either the primary or related filter, this method will find what has changed and update the array of filters
    //      that are currently applied. This is handled in the 'filterLists' file
    // These filter arrays inform if and how many filters have been applied, which can be used to restrict users accessing the related filter without first 
    //      applying a primary filter and in the future could be used to give the user a summary of the filters applied
    useEffect(() => {
        if ( last_group_changed !== '' ){
            const filters = last_group_changed.includes('related') ? rel_filters : pri_filters
            dispatch(updateActiveFilters(updateFilterList(last_group_changed, input, filters)))
        }
    },[input])


    function submitHandler() {
        // only submit if not loading and a Dataset has been selected (titles or sites)
        if ( !loading ){
            if ( filterDataset != '' ) {
                // Reseting the offset will result in a new set of data, not appending onto existing data
                dispatch(resetMapDataOffset())
                // set loading which will trigger the useEffect below that will fetch the geospatial data
                dispatch(setMapIsLoading())
                // if the screen is small then hide the filter to reveal the map
                is_small && dispatch(toggleFilterPanel())
            } else {
                // dispatch(controlSelectionError())
                dispatch(setPopupMessage({message: "Select 'Titles' or 'Sites' to begin filtering", type: 'warning', style: 'warning-map'}))
            }
        }
    }

    useEffect(() => {
        // when offset is 0 and loading is true then fetch the geospatial data. This will replace all existing data.
        if ( offset === 0 && loading ){
            const name = filterDataset == 'Tenement' ? 'tens' : 'occs'
            // Do a few checks before sending api
            let filter_error = false
            const { id, valid, valid_id, radius } = input.buffer
            // The id is invalid
            if ( id.length != 0 && !valid_id ){
                var msg = `The filtering buffer id '${id}' is not valid`
                filter_error = true
            // the id is valid but the radius has not been applied
            } else if ( !valid && valid_id ) {
                var msg = `No radius has been applied for the buffering id: '${id}'`
                filter_error = true
            }

            // Make api call if there were no error found in the filter
            if (filter_error){
                dispatch(setPopupMessage({message: msg, type: 'error', style: 'error-map'}))
                // no longer going to fetch data, so set loading to false
                dispatch(setMapNotLoading())
            } else {
                dispatch(storeSpatialData({name: name, dataset: filterDataset, input: input, related: related, 
                    offset: offset, limit: limit, current_extent: null}))
                try {
                    editHandlers.edit._modes.remove.handler.removeAllLayers()
                } catch(err){}
            }
        }
    }, [loading])

    function RelationHandler() {
        if ( pri_filters.length === 0 ){
            dispatch(setPopupMessage({message: "Filter the primary data before trying to filter its related data", type: 'error', style: 'error-map'}))
        } else {
            dispatch(closeAllGroups())
            dispatch(toggleRelatedFilter())
        }
    }

    function AddRelatedHandler(e) {
        if (filterDataset != ''){
            dispatch(includeRelatedData(e.target.checked))
            is_open && dispatch(toggleRelatedFilter())
        } else {
            // dispatch(controlSelectionError())
            dispatch(setPopupMessage({message: "Select 'Titles' or 'Sites' to begin filtering", type: 'warning', style: 'warning-map'}))
        }
    }

    function clearHandler() {
        // if the related filter is open, close it
        is_open && dispatch(toggleRelatedFilter())
        // if the 'include related data' is active then deactivate it
        dispatch(includeRelatedData(false))
        dispatch(resetFilterControl())
        dispatch(resetFilterGroupState())
        // clear the filter selections and the filter arrays
        dispatch(resetFilterSelection())
    }

    // Handles the events for dealing with listing the map results in a table
    function listHandler() {
        // Add the ind values from the map to the popupTable state
        const dict = {titles: null, sites: null}
        const groups = [[tens,'titles'],[occs,'sites']];
        groups.forEach(group => {
            if ( group[0].features.length !=0 ) {
                var arr = group[0].features.map(row => {
                    return row.properties.pk
                })
                dispatch(setFilterValues({ind_lst: arr, datagroup: group[1]}))
                dict[group[1]] = arr.length != 0
            }
        })
        // If there are ind vals for both titles and sites then display popup box to allow the user to select the data to view.
        const btitle = dict.titles
        const bsites = dict.sites
        if ( !btitle && !bsites ){
            // popup error message when no data has been selected
            dispatch(setPopupMessage({message: "Your search has return no data to display", type: 'warning', style: 'warning-map'}))
        } else if ( btitle && bsites ){
            // makes page inactive before activating the table select popup
            dispatch(toggleFullScreenInactive(true))
            setTableSelect(true)
        } else {
            // if only one datagroup is on the map, then activate the incative page layer and show table
            const datagroup = btitle ? 'titles' : 'sites'
            dispatch(toggleFullScreenInactive(true))
            dispatch(triggerElement(datagroup))
        }
    }


    const list_msg = 'Display the map data in table form'
    const clear_msg = 'Clear the filter'

    return (
        <div id='panel' className={panelStyle}>
            <div id='panel-subarea'>
                <div id='panel-header'>
                    <FilterToggle />
                    <div className='panel-title'>
                        <h1>Data Control</h1>
                    </div>
                    <div className='header-icons'>
                        <IconBtn clickHandler={listHandler} iconStyle='list' tooltip={list_msg} />
                        <IconBtn clickHandler={clearHandler} iconStyle='delete_sweep' tooltip={clear_msg} />
                    </div>
                </div>
                { tableSelect
                ? <div className='list-dropdown'>
                        <button className='close-c4' onClick={() => {setTableSelect(false);dispatch(toggleFullScreenInactive(false))}}><span>x</span></button>
                        <button className='btn-c5 lst-dd-btn-1' onClick={() => dispatch(triggerElement('sites'))}>Sites Table</button>
                        <button className='btn-c5 lst-dd-btn-2' onClick={() => dispatch(triggerElement('titles'))}>Titles Table</button>
                </div>
                : null}
                <hr/>
                <div id="filter-area">
                    <RelatedData />
                    <Control />
                    <div id='filter-groups' className='scrollbar-c1'>
                        <FilterGroups />
                    </div>
                </div>
                <div id='panel-footer'>
                    <div id='related-data-toggle' className='checkbox-c4'>
                        <input checked={include} type='checkbox' id='selectRelatedData' onChange={AddRelatedHandler} />
                        <label htmlFor='selectRelatedData'>Combine Related Data</label><br/>
                    </div>
                    <div id='footer-btns'>
                        <button className={relBtnStyle} onClick={RelationHandler}>Relations</button>
                        <button id='filter-submit-btn' className='btn-c1' onClick={submitHandler}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Panel
