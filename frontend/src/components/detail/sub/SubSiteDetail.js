import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSiteData, triggerElement, setFilterValues } from '../../../redux';

import DetailTableC1 from './DetailTableC1';
import SingleColumnTableC1 from './SingleColumnTableC1';
import Loading from '../../loading/Loading';
import { TitleComponent } from './TitleComponent';

import { site_objs } from './detailConfigs'


function SubSiteDetail({ match }){

    const { id } = match.params

    const dispatch = useDispatch()

    const { site: value } = useSelector(state => state.detailSelection)

    const { RelatedTitlesDict, NameDict, TypeDict, StatusDict, LocationDict, MaterialsDict, AlternateSourceDict } = site_objs

    useEffect(() => {
        dispatch(getSiteData(id))    
    }, [id])

    useEffect(() => {
        value && dispatch(setFilterValues({ind_lst: value.tenements.map(x => x.ind), datagroup: 'titles'}))
    }, [value])


    if (value == null){
        return <Loading />
    } else {
        return (
            <div className="detail-info-c1">
                <TitleComponent group='site' title={value.ind} index={value.ind} />
                <div className='list-table-btn-lng'>
                    <button className='btn-c5' onClick={() => dispatch(triggerElement('titles'))} >Related Titles Table</button>
                </div>
                <SingleColumnTableC1 dict={NameDict} value={value} />
                <SingleColumnTableC1 dict={TypeDict} value={value} />
                <SingleColumnTableC1 dict={StatusDict} value={value} />
                <SingleColumnTableC1 dict={LocationDict} value={value} />
                <SingleColumnTableC1 dict={MaterialsDict} value={value} />
                <SingleColumnTableC1 dict={AlternateSourceDict} value={value} />
                <DetailTableC1 dict={RelatedTitlesDict} value={value} />
            </div>
        )
    }
}

export default SubSiteDetail


// // Setout for a 'DetailTableC1' component. 
// const RelatedTitlesDict = {
//     value: value,
//     styles: "detail-sub-info-c1",
//     lookup: "tenements",
//     header: "Related Titles",
//     table_headers: ["ID","Type","Status"],
//     table_data: [["ind"],["typ"],["status"]]
// }

// const NameDict = {
//     value: value,
//     header: "Site Names",
//     table_data: [
//         {th: "Names", td: ["name"], multi: "name", format: null},
//     ]
// }

// // resource size: multi is null meaning there is only one object, all data is in the 'size' key and then we access the value to display with 'name'
// const TypeDict = {
//     value: value,
//     header: "Site Type",
//     table_data: [
//         {th: "General Group", td: ["typ"], multi: "simple", format: null},
//         {th: "Detailed Group", td: ["typ"], multi: "original", format: null},
//         {th: "Resource Size", td: ["size","name"], multi: null, format: null},
//     ]
// }

// const StatusDict = {
//     value: value,
//     header: "Site Status",
//     table_data: [
//         {th: "General Group", td: ["status","simple"], multi: null, format: null},
//         {th: "Detailed Group", td: ["status","original"], multi: null, format: null},
//     ]
// }

// const LocationDict = {
//     value: value,
//     header: "Location",
//     table_data: [
//         {th: "State", td: ["state","name"], multi: null, format: null},
//         {th: "Local Governments", td: ["localgov","name"], multi: null, format: null},
//         {th: "Government Regions", td: ["govregion","name"], multi: null, format: null},
//         {th: "Geological Provinces", td: ["geoprovince"], multi: "name", format: null}
//     ]
// }

// // td: the group name
// // multi: the key name of the value to write when td is an array of data
// const MaterialsDict = {
//     value: value,
//     header: "Materials",
//     table_data: [
//         {th: "Major Materials", td: ["majmat"], multi: "name", format: null},
//         {th: "Minor Materials", td: ["minmat"], multi: "name", format: null},
//     ]
// }

// const AlternateSourceDict = {
//     value: value,
//     header: "Alternate Source ID's",
//     table_data: [
//         {th: "ID's", td: ["oid"], multi: "code", format: null},
//     ]
// }