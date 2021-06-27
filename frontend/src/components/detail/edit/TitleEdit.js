import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTitleData, postSiteUpdates, resetApiOutcome, setPopupMessage } from '../../../redux';

import ItemsManyDropdownAdd from './ItemsManyDropdownAdd'
import ItemSingleDropdownChange from './ItemSingleDropdownChange'
import ItemsManyDropdownAddMulti from './ItemsManyDropdownAddMulti'
import { buildEditDictionary } from './buildEditDictionary'
import EditTitleComponent from './EditTitleComponent'
import useViewportStyle from '../../reusable/hooks/useViewportStyle'

import { useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

import { title_objs } from './editConfigs'

const TitleEdit = ({ match }) => {

    const { id } = match.params

    const dispatch = useDispatch()
    let { url } = useRouteMatch();
    let history = useHistory();

    const { title: value } = useSelector(state => state.detailSelection)
    const { titles, title_result } = useSelector(state => state.dataEdit)

    const { groups, columns, multis } = title_objs
    const { typeSelect, statusSelect, geoProvinceSelect, holderSelect, oidSelect } = groups
    const { holderMulti } = multis

    const { viewportStyle } = useViewportStyle();
    const is_large = ['tv','desktop','laptop'].includes(viewportStyle)


    // get the site data when the id changes 
    useEffect(() => {
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
            dispatch(setPopupMessage({message: 'No changes were made', type: 'warning', style: 'warning-edit'}))
        }
    }

    useEffect(() => {
        const { success, msg } = title_result
        if ( success ){
            history.push(url.replace('edit/',''))
            dispatch(resetApiOutcome('title_result'))
            window.scrollTo(0, 0)
            dispatch(setPopupMessage({message: `Site ${msg} updated successfully`, type: 'success', style: 'success-edit'}))
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
                    <ItemsManyDropdownAdd is_large={is_large} header='Geological Provinces' datagroup='titles' values={value.geoprovince} has_input={false} dropdown_dict={geoProvinceSelect} />
                    <ItemsManyDropdownAddMulti is_large={is_large} header='Holders' datagroup='titles' values={value.holder} has_input={false} columns={holderMulti} dropdown_dict={holderSelect} />
                    <ItemsManyDropdownAdd is_large={is_large} header="Title Related ID's" datagroup='titles' values={value.oid} has_input={true} dropdown_dict={oidSelect} />
                    <button type='submit' className='btn-c5 edit-submit-btn' onClick={FormHandler}>Submit</button>
                </form>
            </div>
        )
    }
}

export default TitleEdit