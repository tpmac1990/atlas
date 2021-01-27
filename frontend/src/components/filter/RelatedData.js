import React from 'react'
import { useSelector } from 'react-redux'
import RelatedOccurrences from './RelatedOccurrences'
import RelatedTenements from './RelatedTenements'

export default function RelatedData() {

    const { relatedOpen } = useSelector(state => state.filterSelection)

    const style = relatedOpen ? 'showEle' : 'hideEle'

    const { filterDataset } = useSelector(state => state.filterDirection)

    if ( filterDataset == '' ) {
        var content = (
            <p>...There is no data to relate to!</p>
        )
    } else {
        var content = filterDataset == 'Tenement' ? <RelatedOccurrences /> : <RelatedTenements />
    }

    return (
        <div id='relatedDataComp' className={style}>
            { content }            
        </div>
    )
}
