import React from 'react'
import Control from './Control'
import RelatedData from './RelatedData'
import FilterGroups from './FilterGroups'
import { useDispatch, useSelector } from 'react-redux'
import { closeAllGroups, controlSelectionError } from '../../redux'
import { storeSpatialData, toggleRelatedFilter, includeRelatedData, resetFilterControl, resetFilterSelection, resetFilterGroupState } from '../../redux'


function Panel () {

    const { filterSelection, spatialData, leafletDraw } = useSelector(state => state)
    const { filterDataset, filterDirection } = useSelector(state => state.filterDirection)
    const { includeRelated, relatedOpen } = filterSelection
    const { filteropen } = spatialData
    const { editHandlers } = leafletDraw

    const relBtnStyle = includeRelated ? 'btn-c1 showEle' : 'btn-c1 hideEle'
    const panelStyle = filteropen ? 'showPanel' : 'hidePanel'

    const dispatch = useDispatch()

    function submitHandler() {
        if ( filterDataset != '' ) {
            const name = filterDataset == 'Tenement' ? 'tens' : 'occs'
            dispatch(storeSpatialData({ name: name, input: filterSelection, dataset: filterDataset, direction: filterDirection}))
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
        if (filterDataset != '' && filterDirection != ''){
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

    return (
        <div id='panel' className={panelStyle}>
            <div id='panel-header'>
                <h1>Data Control</h1>
                <div>
                    <button className='btn-c1' onClick={clearHandler}>Clear</button>
                </div>
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
