import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSiteData } from '../../../redux';

import DetailTableC1 from './DetailTableC1';
import SingleColumnTableC1 from './SingleColumnTableC1';
import Loading from '../../loading/Loading';


function SubSiteDetail({ match }){

    const { id } = match.params

    const dispatch = useDispatch()

    const { site: value } = useSelector(state => state.detailSelection)

    useEffect(() => {
        dispatch(getSiteData(id))    
    }, [id])

    const RelatedTitlesDict = {
        value: value,
        styles: "detail-sub-info-c1",
        lookup: "tenements",
        header: "Related Titles",
        table_headers: ["ID","Type","Status"],
        table_data: [["ind"],["typ"],["status"]]
    }

    const NameDict = {
        value: value,
        header: "Site Names",
        table_data: [
            {th: "Names", td: ["name"], multi: "", format: null},
        ]
    }

    const TypeDict = {
        value: value,
        header: "Site Type",
        table_data: [
            {th: "General Group", td: ["typ"], multi: "simple", format: null},
            {th: "Detailed Group", td: ["typ"], multi: "original", format: null},
            {th: "Resource Size", td: ["size"], multi: null, format: null},
        ]
    }

    const StatusDict = {
        value: value,
        header: "Site Status",
        table_data: [
            {th: "General Group", td: ["status","simple"], multi: null, format: null},
            {th: "Detailed Group", td: ["status","original"], multi: null, format: null},
        ]
    }

    const LocationDict = {
        value: value,
        header: "Location",
        table_data: [
            {th: "State", td: ["state","name"], multi: null, format: null},
            {th: "Local Governments", td: ["localgov","name"], multi: null, format: null},
            {th: "Government Regions", td: ["govregion","name"], multi: null, format: null},
            {th: "Geological Provinces", td: ["geoprovince"], multi: "name", format: null}
        ]
    }

    const MaterialsDict = {
        value: value,
        header: "Materials",
        table_data: [
            {th: "Major Materials", td: ["majmat"], multi: "name", format: null},
            {th: "Minor Materials", td: ["minmat"], multi: "name", format: null},
        ]
    }

    const AlternateSourceDict = {
        value: value,
        header: "Alternate Source ID's",
        table_data: [
            {th: "ID's", td: ["oid"], multi: "", format: null},
        ]
    }


    if (value == null){
        return <Loading />
    } else {
        return (
            <div className="detail-info-c1">
                <h2>{ value.ind }</h2>
                <SingleColumnTableC1 dict={NameDict} />
                <SingleColumnTableC1 dict={TypeDict} />
                <SingleColumnTableC1 dict={StatusDict} />
                <SingleColumnTableC1 dict={LocationDict} />
                <SingleColumnTableC1 dict={MaterialsDict} />
                <SingleColumnTableC1 dict={AlternateSourceDict} />
                <DetailTableC1 dict={RelatedTitlesDict} />
            </div>
        )
    }
}

export default SubSiteDetail