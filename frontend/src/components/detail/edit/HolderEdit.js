import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { postSiteUpdates, getHolderData, resetApiOutcome, setPopupMessage } from '../../../redux';

import ItemsManyDropdownAddMulti from './ItemsManyDropdownAddMulti'
import { buildEditDictionary } from './buildEditDictionary'
import EditTitleComponent from './EditTitleComponent'
import useViewportStyle from '../../reusable/hooks/useViewportStyle'

import { useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

import { holder_objs } from './editConfigs'

const HolderEdit = ({ match }) => {

    const { id } = match.params

    const dispatch = useDispatch()
    let { url } = useRouteMatch();
    let history = useHistory();

    const { holder: value } = useSelector(state => state.detailSelection)
    const { holders, holder_result } = useSelector(state => state.dataEdit)

    const { groups, columns, multis } = holder_objs
    const { parentSelect, subsidiarySelect, listedSelect } = groups
    const { relatedMulti, listedMulti } = multis

    const { viewportStyle } = useViewportStyle();
    const is_large = ['tv','desktop','laptop'].includes(viewportStyle)


    // get the site data when the id changes    
    useEffect(() => {
        // get the data to display on the page
        dispatch(getHolderData(id))
    }, [id])

    // format the data ready for the post api, then send post request if updates have been made.
    const FormHandler = e => {
        e.preventDefault()
        const dict = buildEditDictionary(holders,value,columns,id)
        if ( dict['changes'] ){
            dispatch(postSiteUpdates({id: id, dict: dict, endpoint: 'holder'}))
        } else {
            window.scrollTo(0, 0)
            dispatch(setPopupMessage({message: 'No changes were made', type: 'warning', style: 'warning-edit'}))
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
            dispatch(setPopupMessage({message: `Holder ${msg} updated successfully`, type: 'success', style: 'success-edit'}))
        }
    },[holder_result])

    if ( value === null ){
        return null
    } else {
        return (
            <div className='edit-page'>
                <EditTitleComponent title={value.holder_name} index={id} />
                <form>
                    <ItemsManyDropdownAddMulti is_large={is_large} header='Parents' datagroup='holders' values={value.parent_company} has_input={false} columns={relatedMulti} dropdown_dict={parentSelect} />
                    <ItemsManyDropdownAddMulti is_large={is_large} header='Subsidiaries' datagroup='holders' values={value.subsidiaries} has_input={false} columns={relatedMulti} dropdown_dict={subsidiarySelect} />
                    <ItemsManyDropdownAddMulti is_large={is_large} header='Listed' datagroup='holders' values={value.listed_simple} has_input={true} columns={listedMulti} dropdown_dict={listedSelect} />
                    <button type='submit' className='btn-c5 edit-submit-btn' onClick={FormHandler}>Submit</button>
                </form> 
            </div>
        )
    }
}

export default HolderEdit