// when a filter is added or removed in either the primary or related filter, this method will find what has changed and update the array of filters
//      that are currently applied. This is handled in the 'filterLists' file
// These filter arrays inform if and how many filters have been applied, which can be used to restrict users accessing the related filter without first 
//      applying a primary filter and in the future could be used to give the user a summary of the filters applied

// determine if the group is to be added to the filter array. this returns a boolean
const isToAdd = (group,input) => {
    if ( group === 'rectangle' ){
        return input[group].NELat != ''
    } else if ( group === 'buffer' ){
        return input[group].valid
    } else if ( group.includes('date') ){
        return input[group] != ''
    } else {
        return input[group].length > 0
    }
}

// this formats the group name if the name recorded in the list is different to the orginal group name. This is only relevant for date fields which have
//      both a 'to' and 'from' field. This removes the 'to' or 'from' so the name recorded is the same for both and only recorded once
const formatGroup = group => {
    return group.includes('date') ? group.replace('from','').replace('to','') : group
}

// group: the filter group held in the input in state e.g. ausstate, region, province 
// input: the state of the filters, what has been selected, what will be filtered for
// filters: the current list of filters that are currently active e.g. ausstate, region, province
export const updateFilterList = (group,input,filters) => {
    const category = group.includes('related') ? 'related' : 'primary'
    const formatted_group = formatGroup(group)
    const update_filters = isToAdd(group,input)
        ? !filters.includes(formatted_group)
            ? [ ...filters, formatted_group ]
            : filters
        : filters.includes(formatted_group)
            ? filters.map(row => {return row !== formatted_group})
            : filters

    return {group: category, filters: update_filters}
}



//     let update_filters
//     if ( group === 'rectangle' ){
//         update_filters = input[group].NELat != ''
//             ? !filters.includes(group)
//                 ? [ ...filters, group ]
//                 : filters
//             : filters.includes(group)
//                 ? filters.map(row => {return row !== group})
//                 : filters
//     } else if ( group === 'buffer' ){
//         update_filters = input[group].valid
//             ? filters.includes(group)
//                 ? [ ...filters, group ]
//                 : filters
//             : filters.includes(group)
//                 ? filters.map(row => {return row !== group})
//                 : filters
//     } else if ( group.includes('date') ){
//         const recorded_name = group.replace('from','').replace('to','')
//         update_filters = input[group].valid
//             ? filters.includes(group)
//                 ? [ ...filters, recorded_name ]
//                 : filters
//             : filters.includes(group)
//                 ? filters.map(row => {return row !== recorded_name})
//                 : filters
//     } else {
//         update_filters = input[group].length > 0
//             ? filters.includes(group)
//                 ? [ ...filters, group ]
//                 : filters
//             : filters.includes(group)
//                 ? filters.map(row => {return row !== group})
//                 : filters
//     }

//     return {group: category, filters: update_filters}
// }



// if (last_group_changed.includes('related')){
            //     if ( input[last_group_changed].length > 0 ) {
            //         // if the filter is not in the list then add it
            //         !rel_filters.includes(last_group_changed) && dispatch(updateActiveFilters({group: 'related', filters: [...rel_filters,last_group_changed]}))
            //     } else {
            //         // if array is 0 then no items are selected and thus it needs to be removed from filters if it exists
            //         rel_filters.includes(last_group_changed) && dispatch(updateActiveFilters({group: 'related', filters: rel_filters.map(row => {return row !== last_group_changed})}))
            //     }
            // } else {
            //     if ( last_group_changed === 'rectangle' ){
            //         if ( input[last_group_changed].NELat != '' ) {
            //             !pri_filters.includes(last_group_changed) && dispatch(updateActiveFilters({group: 'primary', filters: [...rel_filters,last_group_changed]}))
            //         } else {
            //             pri_filters.includes(last_group_changed) && dispatch(updateActiveFilters({group: 'primary', filters: rel_filters.map(row => {return row !== last_group_changed})}))
            //         }
            //     } else if ( last_group_changed === 'buffer' ) {
            //         if ( input[last_group_changed].valid ) {
            //             !pri_filters.includes(last_group_changed) && dispatch(updateActiveFilters({group: 'primary', filters: [...rel_filters,last_group_changed]}))
            //         } else {
            //             pri_filters.includes(last_group_changed) && dispatch(updateActiveFilters({group: 'primary', filters: rel_filters.map(row => {return row !== last_group_changed})}))
            //         }
            //     } else if ( last_group_changed.includes('date')) {
            //         const recorded_name = last_group_changed.replace('from','').replace('to','')
            //         if ( input[last_group_changed] != '' ) {
            //             !pri_filters.includes(recorded_name) && dispatch(updateActiveFilters({group: 'primary', filters: [...rel_filters,recorded_name]}))
            //         } else {
            //             pri_filters.includes(recorded_name) && dispatch(updateActiveFilters({group: 'primary', filters: rel_filters.map(row => {return row !== recorded_name})}))
            //         }
            //     } else {
            //         if ( input[last_group_changed].length > 0 ) {
            //             // if the filter is not in the list then add it
            //             !pri_filters.includes(last_group_changed) && dispatch(updateActiveFilters({group: 'primary', filters: [...rel_filters,last_group_changed]}))
            //         } else {
            //             // if array is 0 then no items are selected and thus it needs to be removed from filters if it exists
            //             pri_filters.includes(last_group_changed) && dispatch(updateActiveFilters({group: 'primary', filters: rel_filters.map(row => {return row !== last_group_changed})}))
            //         }
            //     }
            // }