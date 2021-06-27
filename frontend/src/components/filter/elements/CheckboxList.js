import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FilterCheckbox from './FilterCheckbox'
import { getFilterCheckboxData, setCheckBoxListIsLoading, 
        setCheckboxSearch, filterCheckBoxListClientSide, resetCheckBoxListOffset } from '../../../redux'


const CheckboxList = props => {

    const dispatch = useDispatch()

    const [firstRender, setFirstRender] = useState(true)

    const { name, dict } = props
    const { checkBoxList, filterGroup, filterSelection, filterDirection } = useSelector(state => state)
    const { all_data, filter_data, search, is_serverside, loading, offset, limit, loaded, has_more} = checkBoxList[name]
    const { last_group_changed } = filterSelection

    const { areaStyle, open } = filterGroup.groups[name]
    const { filterDataset } = filterDirection

    const [ dataRows, setDataRows ] = useState(null)

    // if the group hasn't been loaded then load the original set of data, if it has, but last_group_changed is different
    // meaning that changes have occurred in another checkbox list, then reset the offset, which will reload the data
    useEffect(() => {
        if ( open && !loaded ){
            dispatch(setCheckBoxListIsLoading(name))
        } else if ( open && last_group_changed != name ){
            dispatch(resetCheckBoxListOffset(name))
        }
        // open && !loaded && dispatch(setCheckBoxListIsLoading(name))
    }, [open])


    // fetch the data to display as the checkbox options
    useEffect(() => {
        if ( loading  ) {
            const { input, related } = filterSelection
            dispatch(getFilterCheckboxData({name: name, dataset: filterDataset, input: input, related: related, search: search, offset: offset, limit: limit}))
        }
    },[loading])

    // If there is a dic included in the props to convert the display values to something else, then this will do the conversion
    useEffect(() => {
        if ( dict != undefined ) {
            setDataRows(filter_data.map(row => {
                return [row[0],dict[row[1]]]
            }))
        } else {
            setDataRows(filter_data)
        }
    },[filter_data])


    // if there is more data available then load more when the user has scrolled to the bottom of the div.
    const handleScroll = (e) => {
        if ( has_more && !loading ) {
            const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
            if (scrollHeight - scrollTop - 1 <= clientHeight) dispatch(setCheckBoxListIsLoading(name))
        }
    }

    // update the seach on change
    const SearchHandler = e => {
        dispatch(setCheckboxSearch({search: e.target.value, name: name}))
    }

    // filter list on search, delayed by 400ms.
    useEffect(() => {
        if (!firstRender) {
            const timer = setTimeout(() => {
                is_serverside 
                ? dispatch(resetCheckBoxListOffset(name)) // reset offset to trigger serverside data fetch
                : dispatch(filterCheckBoxListClientSide(name)) // all data has already been collected, so filter data on the clientside
            }, 400);
            return () => clearTimeout(timer);
        }
    },[search])

    // if the offset is reset back to 0, which is the case of the search changing, and is_serverside then fetch data
    useEffect(() => {
        // !firstRender && is_serverside && offset === 0 && !loading && dispatch(setCheckBoxListIsLoading(name))
        if ( !firstRender && offset === 0 && !loading ) dispatch(setCheckBoxListIsLoading(name))
    },[offset])


    useEffect(() => {
        setFirstRender(false)
    },[])

    return (
        dataRows
        ? (<div className={`${areaStyle} scrollbar-c1`} onScroll={handleScroll}>
            <input className='input-c1 checkbox-filter' type='text' onChange={SearchHandler} value={search} placeholder='Filter' />
            {loaded 
            ? dataRows.map(row => {
                    return <FilterCheckbox key={row[0]} groupName={name} row={row}/>
            })
            : <p>Loading...</p> }
        </div>)
        : null
    )
}

export default CheckboxList


// const CheckboxListInvalid = props => {

//     const dispatch = useDispatch()
//     const { name } = props

//     dispatch(createCheckListState(name))

//     return null
// }


// function CheckboxList (props) {

//     const { name } = props
//     const { checkBoxList } = useSelector(state => state)
//     const check_list_state = checkBoxList[name]

//     // either undefined or last check was not the same 'name'. this will reload it
//     return (
//         check_list_state === undefined
//         ? <CheckboxListInvalid {...props}/>
//         : <CheckboxListValid {...props}/>
//     )
// }
