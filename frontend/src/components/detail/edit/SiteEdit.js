import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSiteData, postSiteUpdates, resetApiOutcome, resetEditData, setPopupMessage } from '../../../redux';

import ItemsManyDropdownAdd from './ItemsManyDropdownAdd'
import ItemSingleDropdownChange from './ItemSingleDropdownChange'
// import ItemsManyManualAdd from './ItemsManyManualAdd'
import { buildEditDictionary } from './buildEditDictionary'
import EditTitleComponent from './EditTitleComponent'

import { useHistory } from "react-router-dom";
import { Route, Link, useRouteMatch } from "react-router-dom";

import { site_objs } from './editConfigs'

const SiteEdit = ({ match }) => {

    const { id } = match.params

    const dispatch = useDispatch()
    let { path, url } = useRouteMatch();
    let history = useHistory();

    const { site: value } = useSelector(state => state.detailSelection)
    const { sites, site_result } = useSelector(state => state.dataEdit)

    const { groups, columns } = site_objs
    const { nameSelect, occTypeSelect, statusSelect, geoProvinceSelect, majorMaterialSelect, minorMaterialSelect, sizeSelect, oidSelect } = groups

    // const geoProvinceSelect = {name: 'geoprovince', endpoint: 'site-group', model: 'GeologicalProvince', key: '_id', label: 'name', unique_grp: null, styles: 'infinite-select-c1'}
    // const occTypeSelect = {name: 'typ', endpoint: 'site-group', model: 'occType', key: '_id', label: 'original', unique_grp: null, styles: 'infinite-select-c1'}
    // const majorMaterialSelect = {name: 'majmat', endpoint: 'site-group', model: 'Material', key: 'code', label: 'name', unique_grp: 'material', styles: 'infinite-select-c1'}
    // const minorMaterialSelect = {name: 'minmat', endpoint: 'site-group', model: 'Material', key: 'code', label: 'name', unique_grp: 'material', styles: 'infinite-select-c1'}
    // const statusSelect = {name: 'status', endpoint: 'site-group', model: 'OccStatus', key: '_id', label: 'original', unique_grp: null, styles: 'infinite-select-c1'}
    // const sizeSelect = {name: 'size', endpoint: 'site-group', model: 'OccSize', key: 'code', label: 'name', unique_grp: null, styles: 'infinite-select-c1'}
    // const nameSelect = {name: 'name', endpoint: 'site-group', model: 'OccName', key: '_id', label: 'name', unique_grp: null, styles: 'infinite-select-c1'}
    // const oidSelect = {name: 'oid', endpoint: 'site-group', model: 'OccOriginalID', key: 'code', label: 'code', unique_grp: null, styles: 'infinite-select-c1'}

    // const columns = {
    //     name: { field: 'name', is_int: true, is_array: true },
    //     oid: { field: 'code', is_int: false, is_array: true },
    //     typ: { is_int: true, is_array: true },
    //     status: { is_int: true, is_array: false },
    //     geoprovince: { is_int: true, is_array: true },
    //     majmat: { is_int: false, is_array: true },
    //     minmat: { is_int: false, is_array: true },
    //     size: { is_int: false, is_array: false },
    //     govregion: { is_int: true, is_array: false },
    //     localgov: { is_int: true, is_array: false },
    //     state: { is_int: false, is_array: false }
    // }

    // get the site data when the id changes
    useEffect(() => {
        // // when directed to the page, reset the edit data state. There was edit data entered by the user that remained when id was changed which presented the incorrect data
        // dispatch(resetEditData('sites')) 
        // get the data to display on the page
        dispatch(getSiteData(id))
    }, [id])

    // format the data ready for the post api, then send post request if updates have been made.
    const FormHandler = e => {
        e.preventDefault()
        const dict = buildEditDictionary(sites,value,columns,id)
        // console.log(dict)
        // dict['changes'] ? dispatch(postSiteUpdates({id: id, dict: dict, endpoint: 'site'})) : alert('no changes were made!')
        if ( dict['changes'] ){
            dispatch(postSiteUpdates({id: id, dict: dict, endpoint: 'site'}))
        } else {
            window.scrollTo(0, 0)
            dispatch(setPopupMessage({message: 'No Changes Were Made', type: 'warning', style: 'warning-edit'}))
        }
    }

    useEffect(() => {
        const { success, msg } = site_result
        if ( success ){
            history.push(url.replace('edit/',''))
            dispatch(resetApiOutcome('site_result'))
            window.scrollTo(0, 0)
            dispatch(setPopupMessage({message: `Site ${msg} Updated Successfully`, type: 'success', style: 'success-edit'}))
        }
    },[site_result])

    if ( value === null ){
        return null
    } else {
        return (
            <div className='edit-page'>
                <EditTitleComponent title={value.ind} index={value.ind} />
                <form>
                    <ItemsManyDropdownAdd header='Site Names' datagroup='sites' values={value.name} has_input={true} dropdown_dict={nameSelect} />
                    <ItemsManyDropdownAdd header='Site Type' datagroup='sites' values={value.typ} has_input={false} dropdown_dict={occTypeSelect} />
                    <ItemSingleDropdownChange header='Site Status' datagroup='sites' values={value.status} dropdown_dict={statusSelect} />
                    <ItemsManyDropdownAdd header='Geological Provinces' datagroup='sites' values={value.geoprovince} has_input={false} dropdown_dict={geoProvinceSelect} />
                    <ItemsManyDropdownAdd header='Major Materials' datagroup='sites' values={value.majmat} has_input={false} dropdown_dict={majorMaterialSelect} />
                    <ItemsManyDropdownAdd header='Minor Materials' datagroup='sites' values={value.minmat} has_input={false} dropdown_dict={minorMaterialSelect} />
                    <ItemSingleDropdownChange header='Site Size' datagroup='sites' values={value.size} dropdown_dict={sizeSelect} />
                    <ItemsManyDropdownAdd header="Site Related ID's" datagroup='sites' values={value.oid} has_input={true} dropdown_dict={oidSelect} />
                    <button type='submit' className='btn-c5 edit-submit-btn' onClick={FormHandler}>Submit</button>
                </form> 
            </div>
        )
    }
}

export default SiteEdit