import React, { useState } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table'
import GlobalFilter from './GlobalFilter';
import ColumnFilter from './columnFilter';
import { Checkbox } from './Checkbox' // use the checkbox to hide columns


export const ClientSideTable = (props) => {

    const { columns, data } = props

    const [contentVisible, setContentVisible] = useState(false)
    const contentGroupStyles = contentVisible ? 'table-content-area-c1 showEle' : 'hideEle'

    const [columnFilter, setColumnFilter] = useState(false)
    const thFilterStyles = columnFilter ? 'showEle' : 'hideEle'

    const defaultColumn = React.useMemo(
        () => ({
            Filter: ColumnFilter
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
        allColumns, // an array of all the columns supplied to the table
        getToggleHideAllColumnsProps, // a method that lets you hide or show all columns at once
        // page, // destructure page instead of rows
        // nextPage, // helper functions that react-table gives us to help navigate across different pages
        // previousPage, // two buttons and click events need to be added in the jsx like 'onClick={() => previousPage()}
        // canPreviousPage, //boolean properties that tell use if we can or not goto the next or previous page
        // canNextPage, // used in the next and previous buttons as 'disabled={!canNextPage}'
        // pageOptions,
        // gotoPage, // allows use to goto a specific page
        // pageCount,
        // setPageSize, // number of rows per page
    } = useTable({
        columns,
        data,
        defaultColumn
    }, 
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    )

    const { globalFilter, pageIndex, pageSize } = state

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
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <div className='checkbox-c2'>
                <input type='checkbox' id='column-filter-checkbox' onChange={() => setColumnFilter(!columnFilter)} />
                <label htmlFor='column-filter-checkbox' >{ columnFilter ? 'Hide Column Filters' : 'Show Column Filters' }</label>
            </div>
            <div className={ contentVisible ? 'table-area-c1 table-height-sm' : 'table-area-c1 table-height-lg' }>
                <table {...getTableProps()} className='table'>
                    <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())} >
                                <div className={column.isSorted
                                    ? column.isSortedDesc
                                        ? 'sort-up-c1'
                                        : 'sort-down-c1'
                                    : 'sort-none-c1'}>
                                    <div>{column.render('Header')}</div>
                                    <div className={thFilterStyles} onClick={(e)=>{e.preventDefault();e.stopPropagation()}} >{column.canFilter ? column.render('Filter') : null}</div>
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
                    {/* <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row)
                        return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                        )
                    })}
                    </tbody> */}
                </table>
            </div>
            {/* <div className='pagination-ctrl'>
                <div className='pagination-btns'>
                    <div>
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                        </button>{' '}
                        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        Previous
                        </button>{' '}
                        <button onClick={() => nextPage()} disabled={!canNextPage}>
                        Next
                        </button>{' '}
                        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                        </button>{' '}
                    </div>
                </div>
                <div className='pagination-pages'>
                    <div>
                        <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                        </span>
                        <span>
                        | Go to page:{' '}
                        <input
                            className='input-c2'
                            type='number'
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                            }}
                            style={{ width: '50px' }}
                        />
                        </span>{' '}
                        <select
                        className='input-c2'
                        value={pageSize}
                        onChange={e => setPageSize(Number(e.target.value))}>
                        {[10, 25, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                            </option>
                        ))}
                        </select>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
