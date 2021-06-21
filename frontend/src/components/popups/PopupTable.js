import React, { useMemo, useEffect, useState } from 'react'
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'
import { triggerElement, setData, isInfinityTable, clearData, toggleFullScreenInactive } from '../../redux';

import { ClientSideTable } from './ClientSideTable';
import { ServerSideTable } from './ServerSideTable';
import { COLUMNS } from './columns';


export const PopupTable = () => {

    const dispatch = useDispatch()

    // const [firstRender, setFirstRender] = useState(true)

    const { active_group } = useSelector(state => state.popupTable)
    const { is_visible, ind_lst, data, loading, offset, limit, has_more, is_infinite } = useSelector(state => state.popupTable[active_group])

    // If there are more rows than the limit then use the server side table instead of the client side table
    useEffect(() => {
        if (has_more){
            dispatch(isInfinityTable({datagroup: active_group, is_infinite: true}))
        }
    },[has_more])

    // // reset the offset if the data
    // useEffect(() => {
    //     setFirstRender(false)
    // },[data])

    // useEffect(() => {
    //     setFirstRender(false)
    // },[])
                                           
    useEffect(() => {
        // get data when table element is opened
        const datagroup = active_group === 'sites' ? 'Occurrence' : 'Tenement'
        if (is_visible) {
            dispatch(isInfinityTable({datagroup: active_group, is_infinite: false}))
            dispatch(clearData(active_group))
            dispatch(setData({
                            ind_lst: ind_lst, 
                            datagroup: datagroup, 
                            offset: 0, 
                            limit: limit, 
                            sortdict: {field: '', asc: false}, 
                            colfiltersdict: {},
                            globalfilter: ''
                        })) // sortdict does nothing here
        }
    },[is_visible])

    const columns = useMemo(() => COLUMNS[active_group], [active_group])
    
    // when clicking the close link, close the table and hide the inactive layer
    const CloseClickHandler = () => {
        dispatch(triggerElement(active_group))
        dispatch(toggleFullScreenInactive(false))
    }

    return (
        <div className={ is_visible ? 'cover-c1 showEle' : 'hideEle' }>
            <div className={ is_visible ? 'popup-table-c1 showEle' : 'hideEle' }>
                {/* <Link to="#" onClick={CloseClickHandler}>x</Link> */}
                <div className='close-c3' onClick={CloseClickHandler}><span>x</span></div>
                { data === null ? 
                <h1>loading...</h1>
                : is_infinite
                    ? <ServerSideTable data={data} columns={columns} />
                    : <ClientSideTable data={data} columns={columns} />
                }
            </div>
        </div>
    )
}

