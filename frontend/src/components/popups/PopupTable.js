import React, { useMemo, useEffect } from 'react'
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'
import { triggerElement, setData } from '../../redux';

import { SubTable } from './SubTable';
import { COLUMNS } from './columns';


export const PopupTable = () => {

    const dispatch = useDispatch()

    const { active_group } = useSelector(state => state.popupTable)
    const { is_visible, ind_lst, data } = useSelector(state => state.popupTable[active_group])
                                           
    useEffect(() => {
        // get data when table element is opened
        is_visible && dispatch(setData({ind_lst: ind_lst, datagroup: active_group === 'sites' ? 'Occurrence' : 'Tenement'}))
    },[is_visible])

    const columns = useMemo(() => COLUMNS[active_group], [active_group])

    return (
        <div className={ is_visible ? 'cover-c1 showEle' : 'hideEle' }>
            <div className={ is_visible ? 'popup-table-c1 showEle' : 'hideEle' }>
                <Link to="#" onClick={() => dispatch(triggerElement(active_group))} >CLOSE</Link>
                { data != null ? <SubTable data={data} columns={columns} /> : <h1>loading...</h1> }
            </div>
        </div>
    )
}
