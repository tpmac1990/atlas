import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTitleData } from '../../../redux';

import DetailTableC1 from './DetailTableC1';
import SingleColumnTableC1 from './SingleColumnTableC1';
import Loading from '../../loading/Loading';
import { TitleComponent } from './TitleComponent';


function SubTitleDetail({ match }){

    const { id } = match.params

    const dispatch = useDispatch()

    const { title: value } = useSelector(state => state.detailSelection)

    useEffect(() => {
        dispatch(getTitleData(id))    
    }, [id])

    const DateDict = {
        value: value,
        header: "Dates",
        table_data: [
            {th: "Lodge Date", td: ["lodgedate"], multi: null, format: 'date'},
            {th: "Start Date", td: ["startdate"], multi: null, format: 'date'},
            {th: "End Date", td: ["enddate"], multi: null, format: 'date'}
        ]
    }

    const LocationDict = {
        value: value,
        header: "Location",
        table_data: [
            {th: "Onshore / Offshore", td: ["shore","name"], multi: null, format: null},
            {th: "State", td: ["state","name"], multi: null, format: null},
            {th: "Local Governments", td: ["localgov"], multi: "name", format: null},
            {th: "Government Regions", td: ["govregion"], multi: "name", format: null},
            {th: "Geological Provinces", td: ["geoprovince"], multi: "name", format: null}
        ]
    }

    const TypeDict = {
        value: value,
        header: "Title Type",
        table_data: [
            {th: "General Group", td: ["typ","simple"], multi: null, format: null},
            {th: "Detailed Group", td: ["typ","original"], multi: null, format: null},
            {th: "Act", td: ["typ","act"], multi: null, format: null},
        ]
    }

    const StatusDict = {
        value: value,
        header: "Title Status",
        table_data: [
            {th: "General Group", td: ["status","simple"], multi: null, format: null},
            {th: "Detailed Group", td: ["status","original"], multi: null, format: null},
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
            {th: "ID's", td: ["oid"], multi: "code", format: null},
        ]
    }

    const ParentsDict = {
        value: value,
        header: "Title Holders Parent Companies",
        table_data: [
            {th: "Names", td: ["parents"], multi: null, format: null},
        ]
    }

    const RelatedSitesDict = {
        value: value,
        styles: "detail-sub-info-c1",
        lookup: "occurrence",
        header: "Related Sites",
        table_headers: ["ID","Name","Type","Status"],
        table_data: [["ind"],["name"],["typ"],["status"]]
    }


    const HoldersDict = {
        value: value,
        styles: "detail-sub-info-c1",
        lookup: "holder",
        header: "Title Holders",
        table_headers: ["Name","Percentage Ownership"],
        table_data: [["name"],["percown"]]
    }



    if (value == null){
        return <Loading />
    } else {
        return (
            <div className="detail-info-c1">
                <TitleComponent group='title' title={value.ind} index={value.ind} />
                <SingleColumnTableC1 dict={DateDict} />
                <SingleColumnTableC1 dict={LocationDict} />
                <SingleColumnTableC1 dict={TypeDict} />
                <SingleColumnTableC1 dict={StatusDict} />
                <SingleColumnTableC1 dict={MaterialsDict} />
                <SingleColumnTableC1 dict={AlternateSourceDict} />
                <SingleColumnTableC1 dict={ParentsDict} />
                <DetailTableC1 dict={HoldersDict} />
                <DetailTableC1 dict={RelatedSitesDict} />
            </div>
        )
    }
}

export default SubTitleDetail