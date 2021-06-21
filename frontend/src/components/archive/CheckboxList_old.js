import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import FilterCheckbox from '../elements/FilterCheckbox'
// import { oversizeListRequest } from '../../../redux'

import { formatFilterSelection } from './../functions/formatFilterSelection'

function CheckboxList (props) {

    const [data, setData] = useState({loaded: false, data: []}) // all data returned from request
    const [filterData, setFilterData] = useState([]) // data that equates to the filter value
    const [filterVal, setFilterVal] = useState('') // the value being filtered for
    const [firstRender, setFirstRender] = useState(true) 
    const [ssFilterToggle, setSsFilterToggle] = useState(true) // changes when the ssfilter is run

    // required for infinity scroll
    // const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false) // is the infinity scroll loading more components
    const [hasMore, setHasMore] = useState(true) // are there more rows to load from the db
    const [offset, setOffset] = useState(0) // the start index to get the next lot of data
    const [requiresInfinityScroll, setRequiresInfinityScroll] = useState(null) // is the infinity scroll component required
    const limit = 20 // the number of rows to load each time a request is made
    
    const { name: groupName } = props

    const { areaStyle, open } = useSelector(state => state.filterGroup.groups[groupName])
    const { filterSelection, filterDirection } = useSelector(state => state)
    const { filterDataset } = filterDirection

    const dispatch = useDispatch()

    // Fetch the first lot of data when first opened
    useEffect(() => {
        if ( open ) {
            fetchData()
        } else {
            setData({loaded: false, data: []})
        }
    }, [open])

    const fetchData = () => {
        setLoading(true)
        axios
            .post("/filter-data/", { 
                                    name: groupName,
                                    dataset: filterDataset,
                                    // direction: filterDirection,
                                    input: formatFilterSelection(filterSelection),
                                    filter: filterVal,
                                    offset: offset,
                                    limit: limit
                })
            .then(res => {
                setData({loaded: true, data: [...data.data, ...res.data.data]})
                setFilterData([...data.data, ...res.data.data])
                setHasMore(res.data.has_more)
                // if the requiresInfinityScroll is null then it is the first data load and if hasMore is false then there is no more data to load, 
                //      hence can filter on the client side. otherwise, filter on the server side.
                requiresInfinityScroll == null && setRequiresInfinityScroll(hasMore) // only trigger on the first request or on ssfilter
                setOffset(offset + limit)
                setLoading(false)
                })
            .catch(err => {
                    alert('Error: filter-data api')
                    // dispatch(oversizeListRequest())
                    setLoading(false)
                })
    }

    // if there is more data available then load more when the user has scrolled to the bottom of the div.
    const handleScroll = (e) => {
        if ( hasMore && !loading ) {
            const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
            if (scrollHeight - scrollTop === clientHeight) {
                fetchData()
            }
        }
    }

    // use debouncing in the filter
    useEffect(() => {
        if (!firstRender) {
            const timer = setTimeout(() => {
                requiresInfinityScroll ? ssFilter() : setFilterData(csFilter())
            }, 400);
        
            return () => clearTimeout(timer);
        }
    }, [filterVal]);

    // client side filter if all the rows are returned in the first request
    const csFilter = () => {
        const csfilter = data.data.filter(state => {
            return state[1].toLowerCase().includes(filterVal.toLowerCase());
        });
        return csfilter
    }

    // server side filter if all rows are not returned in the first request
    const ssFilter = async () => {
        setOffset(0)
        setData({loaded: false, data: []})
        setFilterData([])
        setSsFilterToggle(!ssFilterToggle)
    }

    // fetch the data only when ssfiltertoggle has changed. This makes sure the data has been updated before fetching more data.
    useEffect(() => {
        if (!firstRender) {
            fetchData()
        }
    },[ssFilterToggle])


    useEffect(() => {
        setFirstRender(false)
    },[])

    return (
        <div className={areaStyle} onScroll={handleScroll}>
            <input className='inputC1 checkboxFilter' type='text' onChange={e => setFilterVal(e.target.value)} value={filterVal} placeholder='Filter' />
            {data.loaded 
            ? filterData.map(row => {
                    return <FilterCheckbox key={row[0]} groupName={groupName} row={row}/>
            })
            : <p>Loading...</p> }
        </div>
    )

}

export default CheckboxList




// function formatFilterData(data){
//     // const nData = []
//     // data.forEach(row => {
//     //     var { pk, name, fname, original, ind } = row
//     //     if (pk != null){
//     //         if (fname != null){
//     //             var name = fname
//     //         } else if (original != null){
//     //             var name = original
//     //         } else if (name == null){
//     //             var name = pk
//     //         }
//     //     } else {
//     //         if (ind != null){
//     //             var pk = ind
//     //             var name = ind
//     //         } else if (ind != null){
//     //             var pk = ind
//     //             var name = ind
//     //         }
//     //     }
//     //     nData.push({pk:pk, name: name})
//     // })
//     // setData({loaded: true, data: nData})
//     // setFilterData(nData)
//     setData({loaded: true, data: data})
//     setFilterData(data)
// }