import React from 'react'
import { useSelector } from 'react-redux'
import RelatedOccurrences from './RelatedOccurrences'
import RelatedTenements from './RelatedTenements'

export default function RelatedData() {

    const { is_open } = useSelector(state => state.filterSelection.related)

    const style = is_open ? 'showEle' : 'hideEle'

    const { filterDataset } = useSelector(state => state.filterDirection)

    const content = is_open ? filterDataset == 'Tenement' ? <RelatedOccurrences /> : <RelatedTenements /> : null


    return (
        <div id='related-data-comp' className={style}>
            { content }            
        </div>
    )
}
