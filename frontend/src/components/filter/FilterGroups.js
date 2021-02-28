import React from 'react'
import TenementFilter from './TenementFilter'
import OccurrenceFilter from './OccurrenceFilter'
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
}

export default FilterGroups
