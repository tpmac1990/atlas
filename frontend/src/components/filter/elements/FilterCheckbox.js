import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { unselectItem, selectItem } from '../../../redux'


function FilterCheckbox(props) {
    var { groupName, row } = props
    const [ pk, name ] = row

    const dispatch = useDispatch()

    const { input } = useSelector(state => state.filterSelection)

    const checked = input[groupName].includes(pk.toString())

    function changeHandler(e) {
        const dic = { value: groupName, pk: e.target.value }
        e.target.checked ? dispatch(selectItem(dic)) : dispatch(unselectItem(dic))
    }

    return (
        <label key={pk} className='filter-checkbox'>
            <input checked={checked} value={pk} type="checkbox" onChange={changeHandler}/>{name}
        </label>
    )
}

export default FilterCheckbox
