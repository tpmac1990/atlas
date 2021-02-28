import React from 'react'

// ColumnFilter will automatically recieve the column as its props. 
const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column 
  return (
    <input
    className='input-c3'
    placeholder='Search...'
    value={filterValue || ''}
    onChange={e => setFilter(e.target.value)}
    />
  )
}

export default ColumnFilter