import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTitleData, getInfinityDropdownData, postSiteUpdates, getHolderData, resetApiOutcome, resetEditData, setPopupMessage } from '../../../redux';

import ItemsManyDropdownAddMulti from './ItemsManyDropdownAddMulti'
import { buildEditDictionary } from './buildEditDictionary'
import EditTitleComponent from './EditTitleComponent'

import { useHistory } from "react-router-dom";
import { Route, Link, useRouteMatch } from "react-router-dom";

import { holder_objs } from './editConfigs'

const HolderEdit = ({ match }) => {

    const { id } = match.params

    const dispatch = useDispatch()
    let { path, url } = useRouteMatch();
    let history = useHistory();

    const { holder: value } = useSelector(state => state.detailSelection)
    const { holders, holder_result } = useSelector(state => state.dataEdit)

    const { groups, columns, multis } = holder_objs
    const { parentSelect, subsidiarySelect, listedSelect } = groups
    const { relatedMulti, listedMulti } = multis

    // const parentSelect = {name: 'parent_company', endpoint: 'site-group', model: 'Holder', key: '_id', label: 'name', unique_grp: 'holder', styles: 'infinite-select-c1'}
    // const subsidiarySelect = {name: 'subsidiaries', endpoint: 'site-group', model: 'Holder', key: '_id', label: 'name', unique_grp: 'holder', styles: 'infinite-select-c1'}
    // const listedSelect = {name: 'listed_simple', endpoint: 'site-group', model: 'Listed', key: '_id', label: 'ticker', unique_grp: null, styles: 'infinite-select-c1'}

    // const relatedMulti = [
    //     {
    //         header: 'Name',
    //         label: 'label', // the core field is always labelled 'label'
    //         edit_type: null,
    //         style: 'col-6'
    //     },
    //     {
    //         header: '% Owned',
    //         label: 'percown',
    //         edit_type: 'input',
    //         input_type: 'Number',
    //         default: 0,
    //         style: 'col-4'
    //     },
    // ]

    // const listedMulti = [
    //     {
    //         header: 'Ticker',
    //         label: 'label',
    //         edit_type: null,
    //         style: 'col-4'
    //     },
    //     {
    //         header: 'Exchange',
    //         label: 'exchange_id',
    //         edit_type: 'select',
    //         default: 'ASX',
    //         model: 'Exchange',
    //         select_key: 'code',
    //         select_label: 'name',
    //         style: 'col-6'
    //     }
    // ]
    
    // const columns = {
    //     parent_company: { is_int: true, is_array: true, multi: [
    //                                                 {name: 'name', format: 'integer', value: '_id'},
    //                                                 {name: 'percown', format: 'float', value: 'in_multi'}] },
    //     subsidiaries: { is_int: true, is_array: true, multi: [
    //                                                 {name: 'name', format: 'integer', value: '_id'},
    //                                                 {name: 'percown', format: 'float', value: 'in_multi'}] },
    //     listed_simple: { field: 'ticker', is_int: true, is_array: true, multi: [
    //                                                 {name: 'ticker', format: 'string', value: '_id'},
    //                                                 {name: 'exchange_id', format: 'string', value: 'in_multi'}] },
    // }

    // get the site data when the id changes    
    useEffect(() => {
        // // when directed to the page, reset the edit data state. There was edit data entered by the user that remained when id was changed which presented the incorrect data
        // dispatch(resetEditData('holders'))
        // get the data to display on the page
        dispatch(getHolderData(id))
    }, [id])

    // format the data ready for the post api, then send post request if updates have been made.
    const FormHandler = e => {
        e.preventDefault()
        const dict = buildEditDictionary(holders,value,columns,id)
        // console.log(dict)
        if ( dict['changes'] ){
            dispatch(postSiteUpdates({id: id, dict: dict, endpoint: 'holder'}))
        } else {
            window.scrollTo(0, 0)
            dispatch(setPopupMessage({message: 'No Changes Were Made', type: 'warning', style: 'warning-edit'}))
        }
    }

    useEffect(() => {
        const { success, msg } = holder_result
        if ( success ){
            // removing the 'edit/' from the url will direct the page pack to the detail page
            history.push(url.replace('edit/',''))
            // This sets the outcome back to null. 
            dispatch(resetApiOutcome('holder_result'))
            window.scrollTo(0, 0)
            dispatch(setPopupMessage({message: `Holder ${msg} Updated Successfully`, type: 'success', style: 'success-edit'}))
        }
    },[holder_result])

    if ( value === null ){
        return null
    } else {
        return (
            <div className='edit-page'>
                <EditTitleComponent title={value.holder_name} index={id} />
                <form>
                    <ItemsManyDropdownAddMulti header='Parents' datagroup='holders' values={value.parent_company} has_input={false} columns={relatedMulti} dropdown_dict={parentSelect} />
                    <ItemsManyDropdownAddMulti header='Subsidiaries' datagroup='holders' values={value.subsidiaries} has_input={false} columns={relatedMulti} dropdown_dict={subsidiarySelect} />
                    <ItemsManyDropdownAddMulti header='Listed' datagroup='holders' values={value.listed_simple} has_input={true} columns={listedMulti} dropdown_dict={listedSelect} />
                    <button type='submit' className='btn-c5 edit-submit-btn' onClick={FormHandler}>Submit</button>
                </form> 
            </div>
        )
    }
}

export default HolderEdit