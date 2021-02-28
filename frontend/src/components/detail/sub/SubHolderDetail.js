import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getHolderData, setFilterValues, triggerElement } from '../../../redux';

import DetailTableC1 from './DetailTableC1';
import SingleColumnTableC1 from './SingleColumnTableC1';
import Loading from '../../loading/Loading';


function SubHolderDetail({ match }){

    const { id } = match.params

    const dispatch = useDispatch()

    const { holder: value } = useSelector(state => state.detailSelection)

    useEffect(() => {
        dispatch(getHolderData(id))    
    }, [id])

    useEffect(() => {
        if (value) {
            dispatch(setFilterValues({ind_lst: value.title_count, datagroup: 'titles'}))
            dispatch(setFilterValues({ind_lst: value.site_count, datagroup: 'sites'}))
        }
    }, [value])
  

    const SubsidiariesDict = {
        value: value,
        styles: "detail-sub-info-c1",
        lookup: "subsidiaries",
        header: "Subsidiaries",
        table_headers: ["Name","Percent Owned","Type","Listed"],
        table_data: [["holder_name"],["percown"],["typ"],["listed"]]
    };

    const OwnersDict = {
        value: value,
        styles: "detail-sub-info-c1",
        lookup: "parent_company",
        header: "Parent Companies",
        table_headers: ["Name","Percent Owned","Type","Listed"],
        table_data: [["holder_name"],["percown"],["typ"],["listed"]]
    };

    const TickerDict = {
        value: value,
        styles: "detail-sub-info-c1",
        lookup: "listed",
        header: "Listed Locations",
        table_headers: ["Ticker","Exchange Code","Exchange Name"],
        table_data: [["ticker"],["exchange","code"],["exchange","name"]]
    };

    const BasicDict = {
        value: value,
        header: "General Info",
        table_data: [
            {th: "Holder/Company Type", td: ["company_type","original"], multi: null, format: null},
            {th: "Is Listed", td: ["listed"], multi: null, format: 'length_boolean'},
            {th: "Number of Owners", td: ["parent_company"], multi: null, format: 'length'},
            {th: "Number of Subsidiaries", td: ["subsidiaries"], multi: null, format: 'length'},
            {th: "Number of Titles", td: ["title_count"], multi: null, format: 'length'},
            {th: "Number of Sites", td: ["site_count"], multi: null, format: 'length'},
            {th: "States Holding Titles", td: ["states"], multi: '', format: null},
        ]
    }


    if (value == null){
        return <Loading />
    } else {
        return (
            <div className="detail-info-c1">
                <h2>{ value.holder_name }</h2>
                <div className='list-table-btn-group'>{['titles','sites'].map(item => {
                    return <button key={item} className='btn-c5' onClick={() => dispatch(triggerElement(item))} >{item.charAt(0).toUpperCase() + item.slice(1)} List Table</button>
                })}</div>
                <SingleColumnTableC1 dict={BasicDict} />
                <DetailTableC1 dict={TickerDict} />
                <DetailTableC1 dict={OwnersDict} />
                <DetailTableC1 dict={SubsidiariesDict} />
            </div>
        )
    }
}

export default SubHolderDetail