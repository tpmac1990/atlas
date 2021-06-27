import React, { useState, useEffect } from 'react'
import { useTable } from 'react-table'
import { Checkbox } from './Checkbox' // use the checkbox to hide columns

import { useSelector, useDispatch } from 'react-redux'
import { setData } from '../../redux';


export const ServerSideTable = (props) => {

    const dispatch = useDispatch()

    const { columns } = props

    const { active_group } = useSelector(state => state.popupTable)
    const { ind_lst, data, limit, has_more } = useSelector(state => state.popupTable[active_group])

    const [firstRender,setFirstRender] = useState(true)
    const [loading, setLoading] = useState(false)
    const [offset, setOffset] = useState(20)
    const [globalFilter, setGlobalFilter] = useState('')
    const [colFilter, setColFilter] = useState({})
    const [colFiltersDict, setColFiltersDict] = useState({})
    const [contentVisible, setContentVisible] = useState(false)
    const contentGroupStyles = contentVisible ? 'table-content-area-c1 showEle' : 'hideEle'

    const [columnFilter, setColumnFilter] = useState(false)
    const thFilterStyles = columnFilter ? 'showEle' : 'hideEle'

    const [sortDict,setSortDict] = useState({field: '', asc: false})


    const handleScroll = (e) => {
        if ( has_more && !loading ) {
            const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
            if ( scrollHeight - scrollTop <= clientHeight + 20 ) {
                setLoading(true)
            }
        }
    }

    useEffect(() => {
        if (!firstRender && loading){
            const datagroup = active_group === 'sites' ? 'Occurrence' : 'Tenement'
            dispatch(setData({ 
                            ind_lst: ind_lst, 
                            datagroup: datagroup, 
                            offset: offset, 
                            limit: limit, 
                            sortdict: sortDict, 
                            colfiltersdict: colFiltersDict,
                            globalfilter: globalFilter }))
        }
    }, [loading])

    // when new data has been returned, add to the offset so the infinity scroll will collect the next lot of data and set loading to false
    useEffect(() => {
        if (!firstRender){
            setOffset(prevState => { return prevState + 20 })
            setLoading(false)
        }
    },[data])

    // used to prevent rendering on the initial render
    useEffect(() => {
        setFirstRender(false)
    },[])

    // sorting feature state. true is asc, false is des, non existent is no sorting
    const sortHandler = id => {
        const { field, asc } = sortDict
        if ( sortDict.field === '' ){
            setSortDict({field: id, asc: true});
        } else if ( field === id && asc ){
            setSortDict({field: id, asc: false});
        } else if ( field === id && !asc ){
            setSortDict({field: '', asc: false});
        } else {
            setSortDict({field: id, asc: true});
        }
        setOffset(0)
        setLoading(true)
    }

    // Global filter: use debouncing
    useEffect(() => {
        if (!firstRender) {
            const timer = setTimeout(() => {
                setOffset(0)
                setLoading(true)
            }, 500);
        
            return () => clearTimeout(timer);
        }
    }, [globalFilter]);

    // Column Filter: use debouncing
    useEffect(() => {
        if (!firstRender) {
            const timer = setTimeout(() => {
                updateFilters()
            }, 500);
        
            return () => clearTimeout(timer);
        }
    }, [colFilter]);

    // fetch new data with the adjusted column filter value
    const updateFilters = () => {
        const { value, field } = colFilter
        setColFiltersDict(prevState => {
            return { ...prevState, [field]: value }
        });
        setOffset(0)
        setLoading(true)
    }

    // react-table
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        allColumns, // an array of all the columns supplied to the table
        getToggleHideAllColumnsProps, // a method that lets you hide or show all columns at once
    } = useTable({
        columns,
        data
    })

    return (
        <div className='greater-table-area-c1'>
            <div className='checkbox-c3 hide-portrait'>
                <input type='checkbox' id='column-ctrl-checkbox' onChange={() => setContentVisible(!contentVisible)} />
                <label htmlFor='column-ctrl-checkbox' >{ contentVisible ? 'Hide Column Control' : 'Show Column Control' }</label>
            </div>
            <div className={`${contentGroupStyles} hide-portrait`}>
                <Checkbox {...getToggleHideAllColumnsProps()} />
                {allColumns.map(column => (
                <div className='checkbox-c1' key={column.id}>
                    <input type='checkbox' id={column.id} {...column.getToggleHiddenProps()} />
                    <label htmlFor={column.id} >{column.Header}</label>
                </div>
                ))}
            </div>
            <input type='text' placeholder='Search all columns...' className='input-c2' onChange={(e) => setGlobalFilter(e.target.value)} />
            <div className='checkbox-c2'>
                <input type='checkbox' id='column-filter-checkbox' onChange={() => setColumnFilter(!columnFilter)} />
                <label htmlFor='column-filter-checkbox' >{ columnFilter ? 'Hide Column Filters' : 'Show Column Filters' }</label>
            </div>
            <div className={ contentVisible ? 'table-area-c1 table-height-sm' : 'table-area-c1 table-height-lg' } onScroll={handleScroll}>
                <table {...getTableProps()} className='table'>
                    <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} onClick={() => sortHandler(column.ssSort)}>
                                <div className={column.ssSort === sortDict.field
                                    ? sortDict.asc 
                                        ? 'sort-down-c1'
                                        : 'sort-up-c1'
                                    : 'sort-none-c1'}>
                                    <div>{column.render('Header')}</div>
                                    <div className={thFilterStyles} onClick={(e)=>{e.preventDefault();e.stopPropagation()}} >
                                        <input type='text' placeholder='Search...' className='input-c3' onChange={(e) => setColFilter({value: e.target.value, field: column.ssSort})} />
                                    </div>
                                </div>
                            </th>
                        ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


// // sorting feature state. true is asc, false is des, non existent is no sorting
    // const sortHandler = id => {
    //     if ( sortDict.asc.includes(id) ){
    //         setSortDict(prevState => {
    //             return { ...prevState, 
    //                         asc: prevState.asc.filter(item => item !== id), 
    //                         des: [...prevState.des,id]
    //                     }
    //         });
    //     } else if ( sortDict.des.includes(id) ){
    //         setSortDict(prevState => {
    //             return { ...prevState, des: prevState.des.filter(item => item !== id) }
    //         });
    //     } else {
    //         setSortDict(prevState => {
    //             return { ...prevState, asc: [...prevState.asc,id] }
    //         });
    //     }
    //     const datagroup = active_group === 'sites' ? 'Occurrence' : 'Tenement'
    //     resetOffset(datagroup)
    //     setLoading(true)
    // } 
