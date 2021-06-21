import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTitleData, getInfinityDropdownData, postSiteUpdates, resetApiOutcome, resetEditData, setPopupMessage } from '../../../redux';

import ItemsManyDropdownAdd from './ItemsManyDropdownAdd'
import ItemSingleDropdownChange from './ItemSingleDropdownChange'
import ItemsManyDropdownAddMulti from './ItemsManyDropdownAddMulti'
import { buildEditDictionary } from './buildEditDictionary'
import EditTitleComponent from './EditTitleComponent'

import { useHistory } from "react-router-dom";
import { Route, Link, useRouteMatch } from "react-router-dom";

import { title_objs } from './editConfigs'

const TitleEdit = ({ match }) => {

    const { id } = match.params

    const dispatch = useDispatch()
    let { path, url } = useRouteMatch();
    let history = useHistory();

    const { title: value } = useSelector(state => state.detailSelection)
    // console.log(value)
    const { titles, title_result } = useSelector(state => state.dataEdit)

    const { groups, columns, multis } = title_objs
    const { typeSelect, statusSelect, geoProvinceSelect, holderSelect, oidSelect } = groups
    const { holderMulti } = multis

    // // configs for the infinity select box in the respective groups
    // // name: the key for which all state is stored within for the dropdown in redux
    // // endpoint: the api endpoint to fetch the data for the dropdown from
    // // model: the model to get the data to populate the select box with
    // // key: the key of the value to display. this is the pk in the database and is used to update the database
    // // label: the values displayed in the dropdown
    // // unique_grp: name of the multi group for which all values need to be unique. Used when unique values required across multiple groups
    // // styles: the style to apply to the dropdown
    // const geoProvinceSelect = {name: 'geoprovince', endpoint: 'site-group', model: 'GeologicalProvince', key: '_id', label: 'name', unique_grp: null, styles: 'infinite-select-c1'}
    // const typeSelect = {name: 'typ', endpoint: 'site-group', model: 'TenType', key: '_id', label: 'fname', unique_grp: null, styles: 'infinite-select-c1'}
    // // dropped this as a titles materials should be a collection of its sites
    // // const majorMaterialSelect = {name: 'majmat', endpoint: 'site-group', model: 'Material', key: 'code', label: 'name', styles: 'infinite-select-c1'}
    // // const minorMaterialSelect = {name: 'minmat', endpoint: 'site-group', model: 'Material', key: 'code', label: 'name', styles: 'infinite-select-c1'}
    // const statusSelect = {name: 'status', endpoint: 'site-group', model: 'TenStatus', key: '_id', label: 'original', unique_grp: null, styles: 'infinite-select-c1'}
    // const oidSelect = {name: 'oid', endpoint: 'site-group', model: 'TenOriginalID', key: 'code', label: 'code', unique_grp: null, styles: 'infinite-select-c1'}
    // const holderSelect = {name: 'holder', endpoint: 'site-group', model: 'Holder', key: '_id', label: 'name', unique_grp: null, styles: 'infinite-select-c1'}


    // configs to manage the multicolumn tables and how or if they are editable
    // style: the bootstrap column width. they should equal to 10 with 2 left for the final 'remove' action column.
    // header: the column header as multiple column tables have column headers
    // edit_type: the type of edit. null = not editable, input = manual input, select = select from dropdown (requires other configs)
    // input_type: for 'edit_type' input. this is the type of input to display such as 'text' or 'Number'
    // model: for 'edit_type' select: the model to get the dropdown data from
    // select_key: for 'edit_type' select: the field of the model to use as the keys in the dropdown
    // select_label: for 'edit_type' select: the field of the model to display in the dropdown
    // default: for 'edit_type' select: the default value to display when a new entry is added.
    // const holderMulti = [
    //     {
    //         header: 'Name',
    //         label: 'label', // the core field is always labelled 'label'
    //         edit_type: null,
    //         style: 'col-5'
    //     },
    //     {
    //         header: 'Percentage Held',
    //         label: 'percown',
    //         edit_type: 'input',
    //         input_type: 'Number', // formates the input to accept numbers only
    //         default: 0,
    //         style: 'col-5'
    //     },
    //     // {
    //     //     header: 'Holder Position',
    //     //     label: 'position_id',
    //     //     edit_type: 'select',
    //     //     default: 2,
    //     //     model: 'HolderPosition',
    //     //     select_key: '_id',
    //     //     select_label: 'name',
    //     //     style: 'col-3'
    //     // }
    // ]
    
    // columns is used to format the data to be sent in the post request
    // field: required when using 'ItemsManyManualAdd'. this is the model field name to be updated
    // is_int: if the key is an integer it will use pareseInt to convert it to integer form from string
    // is_array: if the field is an m2m then the result needs to be in array form, otherwise it should'nt
    // multi: required for tables with multiple columns. it takes a list of the columns accept for the title id column. this is sorted in the backend
        //  name: name of field. It should be the same as the field in the model
        // format: the format of the value to be sent to the backend
        // value: used to identify how to format the value in buildEditDictionary.
    // const columns = {
    //     // holder: { is_int: true, is_array: true, multi: [
    //     //                                             // {name: 'tenement', format: 'string', value: 'obj_id'},
    //     //                                             {name: 'name', format: 'integer', value: '_id'},
    //     //                                             {name: 'percown', format: 'float', value: 'in_multi'},
    //     //                                             {name: 'position_id', format: 'integer', value: 'in_multi'}] },
    //     holder: { is_int: true, is_array: true, multi: [
    //                                                     // {name: 'tenement', format: 'string', value: 'obj_id'},
    //                                                     {name: 'name', format: 'integer', value: '_id'},
    //                                                     {name: 'percown', format: 'float', value: 'in_multi'}] },
    //     oid: { field: 'code', is_int: false, is_array: true },
    //     typ: { is_int: true, is_array: false },
    //     status: { is_int: true, is_array: false },
    //     geoprovince: { is_int: true, is_array: true },
    //     // majmat: { is_int: false, is_array: true },
    //     // minmat: { is_int: false, is_array: true }
    // }

    // get the site data when the id changes 
    useEffect(() => {
        // when directed to the page, reset the edit data state. There was edit data entered by the user that remained when id was changed which presented the incorrect data
        // dispatch(resetEditData('titles'))
        // get the data to display on the page
        dispatch(getTitleData(id))
    }, [id])

    // format the data ready for the post api, then send post request if updates have been made.
    const FormHandler = e => {
        e.preventDefault()
        const dict = buildEditDictionary(titles,value,columns,id)
        if ( dict['changes'] ){
            dispatch(postSiteUpdates({id: id, dict: dict, endpoint: 'title'}))
        } else {
            window.scrollTo(0, 0)
            dispatch(setPopupMessage({message: 'No Changes Were Made', type: 'warning', style: 'warning-edit'}))
        }
    }

    useEffect(() => {
        const { success, msg } = title_result
        if ( success ){
            history.push(url.replace('edit/',''))
            dispatch(resetApiOutcome('title_result'))
            window.scrollTo(0, 0)
            dispatch(setPopupMessage({message: `Site ${msg} Updated Successfully`, type: 'success', style: 'success-edit'}))
        }
    },[title_result])

    if ( value === null ){
        return null
    } else {
        return (
            <div className='edit-page'>
                <EditTitleComponent title={value.ind} index={value.ind} />
                <form>
                    <ItemSingleDropdownChange header='Title Type' datagroup='titles' values={value.typ} dropdown_dict={typeSelect} />
                    <ItemSingleDropdownChange header='Title Status' datagroup='titles' values={value.status} dropdown_dict={statusSelect} />
                    <ItemsManyDropdownAdd header='Geological Provinces' datagroup='titles' values={value.geoprovince} has_input={false} dropdown_dict={geoProvinceSelect} />
                    {/* <ItemsManyDropdownAdd header='Major Materials' datagroup='titles' values={value.majmat} has_input={false} dropdown_dict={majorMaterialSelect} />
                    <ItemsManyDropdownAdd header='Minor Materials' datagroup='titles' values={value.minmat} has_input={false} dropdown_dict={minorMaterialSelect} /> */}
                    <ItemsManyDropdownAddMulti header='Holders' datagroup='titles' values={value.holder} has_input={false} columns={holderMulti} dropdown_dict={holderSelect} />
                    <ItemsManyDropdownAdd header="Title Related ID's" datagroup='titles' values={value.oid} has_input={true} dropdown_dict={oidSelect} />
                    <button type='submit' className='btn-c5 edit-submit-btn' onClick={FormHandler}>Submit</button>
                </form>
            </div>
        )
    }
}

export default TitleEdit