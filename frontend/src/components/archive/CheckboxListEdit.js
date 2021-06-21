import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import FilterCheckbox from './FilterCheckbox'
// import { oversizeListRequest } from '../../../redux'

// The checkbox for the changeUpdateGroup
function CheckboxList (props) {

    const [data, setData] = useState({loaded: false, data: []})
    const [filterData, setFilterData] = useState([])
    const [filterVal, setFilterVal] = useState('')
    
    const { name: groupName, dict: valuesDict } = props

    const { areaStyle, open } = useSelector(state => state.filterGroup.groups[groupName])
    const { filterSelection } = useSelector(state => state)
    const { filterDataset, filterDirection } = useSelector(state => state.filterDirection)
    const dispatch = useDispatch()

    // dispatch(getFilterCheckboxData({name: name, dataset: filterDataset, input: input, related: related, search: search, offset: offset, limit: limit}))

    useEffect(() => {
        if ( open ) {
            axios
                .post("/filter-data/", { 
                                        name: groupName,
                                        dataset: filterDataset,
                                        direction: filterDirection,
                                        input: filterSelection
                    })
                .then(res => {
                    formatFilterData(res.data)
                    })
                .catch(err => {
                        // dispatch(oversizeListRequest())
                        console.log(err)
                    })
        } else {
            setData({loaded: false, data: []})
        }
    }, [open])

    function filterHandler(e) {
        const val = e.target.value
        setFilterVal(val)
        const fData = []
        data.data.forEach(function(row){
            row.name.toLowerCase().includes(val.toLowerCase()) && fData.push(row);
        });
        setFilterData(fData)
    }


    function formatFilterData(data){
        const nData = []
        data.forEach(row => {
            var { pk, name, fname, original, ind, field } = row
            if (pk != null){
                if (fname != null){
                    var name = fname
                } else if (original != null){
                    var name = original
                } else if (name == null){
                    var name = pk
                }
            } else {
                if (ind != null){
                    var pk = ind
                    var name = ind
                } else if (ind != null){
                    var pk = ind
                    var name = ind
                } else if (field != null){
                    var pk = field
                    var name = valuesDict[field]
                }
            }
            nData.push({pk:pk, name: name})
        })
        setData({loaded: true, data: nData})
        setFilterData(nData)
    }

    return (
        <div className={areaStyle}>
            <input className='inputC1 checkboxFilter' type='text' onChange={filterHandler} value={filterVal} placeholder='Filter' />
            {data.loaded 
            ? filterData.map(row => {
                    return <FilterCheckbox key={row.pk} groupName={groupName} row={row}/>
            })
            : <p>Loading...</p> }
        </div>
    )
}

export default CheckboxList