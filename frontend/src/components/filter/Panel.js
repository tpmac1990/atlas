import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Control from './Control'
import RelatedData from './RelatedData'
import FilterGroups from './FilterGroups'
import { useDispatch, useSelector } from 'react-redux'
import { closeAllGroups, controlSelectionError, storeSpatialData, 
    toggleRelatedFilter, includeRelatedData, resetFilterControl, 
    resetFilterSelection, resetFilterGroupState, setFilterValues, 
    triggerElement, callNoDataSelectedError, toggleFullScreenInactive } from '../../redux'


function Panel () {

    const { filterSelection, spatialData, leafletDraw } = useSelector(state => state)
    // const { filterDataset, filterDirection } = useSelector(state => state.filterDirection)
    const { filterDataset } = useSelector(state => state.filterDirection)
    const { includeRelated, relatedOpen } = filterSelection
    const { filteropen, occs, tens } = spatialData
    const { editHandlers } = leafletDraw
    const { titles, sites } = useSelector(state => state.popupTable)

    const relBtnStyle = includeRelated ? 'btn-c1 showEle' : 'btn-c1 hideEle'
    const panelStyle = filteropen ? 'showPanel' : 'hidePanel'

    const [tableSelect, setTableSelect] = useState(false)

    const dispatch = useDispatch()

    function submitHandler() {
        if ( filterDataset != '' ) {
            const name = filterDataset == 'Tenement' ? 'tens' : 'occs'
            dispatch(storeSpatialData({ name: name, input: filterSelection, dataset: filterDataset}))
            try {
                editHandlers.edit._modes.remove.handler.removeAllLayers()
            } catch(err){}
        } else {
            dispatch(controlSelectionError())
        }
    }

    function RelationHandler() {
        dispatch(closeAllGroups())
        dispatch(toggleRelatedFilter())
    }

    function AddRelatedHandler(e) {
        if (filterDataset != ''){
            dispatch(includeRelatedData(e.target.checked))
            relatedOpen && dispatch(toggleRelatedFilter())
        } else {
            dispatch(controlSelectionError())
        }
    }

    function clearHandler() {
        dispatch(resetFilterControl())
        dispatch(resetFilterGroupState())
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
        if ( !btitle && !bsites ) {
            // popup error message when no data has been selected
            dispatch(callNoDataSelectedError())
        } else if ( btitle && bsites ) {
            // makes page inactive before activating the table select popup
            dispatch(toggleFullScreenInactive())
            setTableSelect(true)
        } else {
            // if only one dtaagroup is on the map, then activate the incative page layer and show table
            const datagroup = btitle ? 'titles' : 'sites'
            dispatch(toggleFullScreenInactive())
            dispatch(triggerElement(datagroup))
        }
    }

    const tableSelectStyles = tableSelect ? 'list-dropdown showEle' : 'hideEle'

    return (
        <div id='panel' className={panelStyle}>
            <div id='panel-header'>
                <h1>Data Control</h1>
                <div>
                    <button className='btn-c1' onClick={listHandler}>List</button>
                    <button className='btn-c1' onClick={clearHandler}>Clear</button>
                </div>
            </div>
            <div className={ tableSelectStyles }>
                {/* link to toggle the inactive page cover and close the datagroup table select popup when both datasets are on the map  */}
                <Link to='#' onClick={() => {setTableSelect(false);dispatch(toggleFullScreenInactive())}}>x</Link>
                <button className='btn-c2' onClick={() => dispatch(triggerElement('sites'))}>Sites Table</button>
                <button className='btn-c2' onClick={() => dispatch(triggerElement('titles'))}>Titles Table</button>
            </div>
            <hr/>
            <div id="filterArea">
                <RelatedData />
                <Control />
                <div id='filter-groups'>
                    <FilterGroups />
                </div>
            </div>
            <div id='panelFooter'>
                <div>
                    <input checked={includeRelated} type='checkbox' id='selectRelatedData' onChange={AddRelatedHandler} />
                    <label htmlFor='selectRelatedData'>Add Related Data to Map?</label><br/>
                </div>
                <button className={relBtnStyle} onClick={RelationHandler}>Relations</button>
                <button id='filterSubmitBtn' className='btn-c1' onClick={submitHandler}>Submit</button>
            </div>
        </div>
    )
}

export default Panel
