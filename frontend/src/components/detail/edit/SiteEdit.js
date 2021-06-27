import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSiteData, postSiteUpdates, resetApiOutcome, setPopupMessage } from '../../../redux';

import ItemsManyDropdownAdd from './ItemsManyDropdownAdd'
import ItemSingleDropdownChange from './ItemSingleDropdownChange'
import { buildEditDictionary } from './buildEditDictionary'
import EditTitleComponent from './EditTitleComponent'
import useViewportStyle from '../../reusable/hooks/useViewportStyle'

import { useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

import { site_objs } from './editConfigs'

const SiteEdit = ({ match }) => {

    const { id } = match.params

    const dispatch = useDispatch()
    let { url } = useRouteMatch();
    let history = useHistory();

    const { site: value } = useSelector(state => state.detailSelection)
    const { sites, site_result } = useSelector(state => state.dataEdit)

    const { groups, columns } = site_objs
    const { nameSelect, occTypeSelect, statusSelect, geoProvinceSelect, majorMaterialSelect, minorMaterialSelect, sizeSelect, oidSelect } = groups

    const { viewportStyle } = useViewportStyle();
    const is_large = ['tv','desktop','laptop'].includes(viewportStyle)


    // get the site data when the id changes
    useEffect(() => {
        // get the data to display on the page
        dispatch(getSiteData(id))
    }, [id])

    // format the data ready for the post api, then send post request if updates have been made.
    const FormHandler = e => {
        e.preventDefault()
        const dict = buildEditDictionary(sites,value,columns,id)
        if ( dict['changes'] ){
            dispatch(postSiteUpdates({id: id, dict: dict, endpoint: 'site'}))
        } else {
            window.scrollTo(0, 0)
            dispatch(setPopupMessage({message: 'No changes were made', type: 'warning', style: 'warning-edit'}))
        }
    }

    useEffect(() => {
        const { success, msg } = site_result
        if ( success ){
            history.push(url.replace('edit/',''))
            dispatch(resetApiOutcome('site_result'))
            window.scrollTo(0, 0)
            dispatch(setPopupMessage({message: `Site ${msg} updated successfully`, type: 'success', style: 'success-edit'}))
        }
    },[site_result])

    if ( value === null ){
        return null
    } else {
        return (
            <div className='edit-page'>
                <EditTitleComponent title={value.ind} index={value.ind} />
                <form>
                    <ItemsManyDropdownAdd is_large={is_large} header='Site Names' datagroup='sites' values={value.name} has_input={true} dropdown_dict={nameSelect} />
                    <ItemsManyDropdownAdd is_large={is_large} header='Site Type' datagroup='sites' values={value.typ} has_input={false} dropdown_dict={occTypeSelect} />
                    <ItemSingleDropdownChange header='Site Status' datagroup='sites' values={value.status} dropdown_dict={statusSelect} />
                    <ItemsManyDropdownAdd is_large={is_large} header='Geological Provinces' datagroup='sites' values={value.geoprovince} has_input={false} dropdown_dict={geoProvinceSelect} />
                    <ItemsManyDropdownAdd is_large={is_large} header='Major Materials' datagroup='sites' values={value.majmat} has_input={false} dropdown_dict={majorMaterialSelect} />
                    <ItemsManyDropdownAdd is_large={is_large} header='Minor Materials' datagroup='sites' values={value.minmat} has_input={false} dropdown_dict={minorMaterialSelect} />
                    <ItemSingleDropdownChange header='Site Size' datagroup='sites' values={value.size} dropdown_dict={sizeSelect} />
                    <ItemsManyDropdownAdd is_large={is_large} header="Site Related ID's" datagroup='sites' values={value.oid} has_input={true} dropdown_dict={oidSelect} />
                    <button type='submit' className='btn-c5 edit-submit-btn' onClick={FormHandler}>Submit</button>
                </form> 
            </div>
        )
    }
}

export default SiteEdit