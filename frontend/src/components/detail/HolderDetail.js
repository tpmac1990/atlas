import React, { useState, lazy, useEffect } from 'react'
import { AsyncPaginate } from "react-select-async-paginate";
import { Route, Link, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { getDropdownData, createNewHolder } from './../../redux';
// import loadHolderOptions from './sub/loadHolderOptions';
import SubHolderDetail from './sub/SubHolderDetail';
// import dataEditReducer from '../../redux/dataEdit/dataEditReducer';
import InfinitySelect from '../reusable/infinitySelect/InfinitySelect'
import { useHistory } from "react-router-dom";

const HolderEdit = lazy(() => import('./edit/HolderEdit'));

// put value in redux
// create another route to go one deeper
function HolderDetail(){

    const dispatch = useDispatch()
    let history = useHistory();

    // const [ holderLookup, setHolderLookup ] = useState({value: '', label: ''})
    const [ showAddHolder, setShowAddHolder ] = useState(false)

    const { dataEdit, dropdown } = useSelector(state => state)
    const { HolderType } = dataEdit.dropdowns

    let { path, url } = useRouteMatch();

    // function Handler(e){
    //     if ( holderLookup.value == '' ){
    //         e.preventDefault()
    //     }
    // }

    // will direct to the detail page when the selection is changed in the holder seleciton
    useEffect(() => {
        dropdown.active_dropdown == 'holder_search' && dropdown.holder_search && dropdown.holder_search.selected.key !== '' && history.push(`${url}/${dropdown.holder_search.selected.key}`)
    },[dropdown])

    // clicking on the link 'add a holder' will toggle the had a holder component
    const AddHolderHandler = e => {
        e.preventDefault()
        setShowAddHolder(prev => !prev)
    }

    // display a form to enter a new holder name and the type of company/holder it is.
    const AddHolder = () => {

        const [ nameSearch, setNameSearch ] = useState('')
        const [ typeValue, setTypeValue ] = useState(1)

        // if HolderType dropdown state is empty then fetch it.
        useEffect(() => {
            !HolderType && dispatch(getDropdownData({model: 'HolderType', 'key': '_id', 'label': 'original'}))
        }, [])

        // need to add error handling
        const SubmitHolderHandler = e => {
            e.preventDefault()
            if (nameSearch !== '') {
                dispatch(createNewHolder({name: nameSearch, typ: typeValue}))
                setShowAddHolder(false) 
            }   
        }

        // form to handle creating a new holder. add name and type
        return (
            <>
                <hr/>
                <form className='add-holder'>
                    <div>
                        <div>
                            <label>Name:</label>
                            <input className='input-c4' type='text' onChange={ e => setNameSearch(e.target.value) } value={ nameSearch } />
                        </div>
                        <div>
                            <label>Type:</label>
                            { HolderType
                            ? (
                                <select className='input-c4' value={typeValue} onChange={ e => setTypeValue(e.target.value) }>
                                    {HolderType.map(row => 
                                        <option key={row[0]} value={row[0]}>{row[1]}</option>
                                    )}
                                </select>
                            )
                            : null
                            }
                        </div>
                    </div>
                    <button className='btn-c5' onClick={SubmitHolderHandler}>Submit</button>
                    <Link to='#' onClick={() => setShowAddHolder(false)}>hide</Link>
                </form>
            </>
        )
    }

    const holderSelect = {name: 'holder_search', endpoint: 'site-group', model: 'Holder', key: '_id', label: 'name', styles: 'infinite-select-c2'}

    return (
        <div>
            <h4 className="header-c1">Search For A Title Holder:</h4>
            <div className="lookup-c1">
                <div className='holder-infinity'>
                    <InfinitySelect dict={holderSelect} />
                </div>
                <div className='link-add-value'>
                    <Link to="#" onClick={AddHolderHandler}>Add a Holder!</Link>
                </div>
            </div>
            { showAddHolder
                ? <AddHolder />
                : null 
            }
            <hr/>
            <Route exact path={`${path}/:id`} component={SubHolderDetail} />
            <Route exact path={`${path}/edit/:id`} component={HolderEdit} />
        </div>
    )
}

export default HolderDetail



// import { useHistory } from "react-router-dom";

// const { dataEdit, dropdown } = useSelector(state => state)

// // will direct to the detail page when the selection is changed in the holder seleciton
// useEffect(() => {
//     dropdown.holder_search && dropdown.holder_search.selected.key !== '' && history.push(`${url}/${dropdown.holder_search.selected.key}`)
// },[dropdown])


// <div className='holder-infinity'>
//     <InfinitySelect dict={holderSelect} />
// </div>
