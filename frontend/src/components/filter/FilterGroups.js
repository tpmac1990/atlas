import React from 'react'
import TenementFilter from './TenementFilter'
import TenementBuffer from './TenementBuffer'
import OccurrenceFilter from './OccurrenceFilter'
import OccurrenceBuffer from './OccurrenceBuffer'
import { useSelector } from 'react-redux'


function FilterGroups () {

    const { filterDataset } = useSelector(state => state.filterDirection)
    const direction = filterDataset

    switch(direction) {
        case 'Tenement':
            return <TenementFilter />;
        case 'Occurrence':
            return <OccurrenceFilter />;
        default:
            return null;
    }


    // const { filterDataset, filterDirection } = useSelector(state => state.filterDirection)
    // const direction = `${filterDataset} ${filterDirection}`

    // switch(direction) {
    //     case 'Tenement Filter':
    //         return <TenementFilter />;
    //     case 'Tenement Buffer':
    //         return <TenementBuffer />;
    //     case 'Occurrence Filter':
    //         return <OccurrenceFilter />;
    //     case 'Occurrence Buffer':
    //         return <OccurrenceBuffer />;
    //     default:
    //         return null;
    // }
}

export default FilterGroups
