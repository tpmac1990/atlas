import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addEditData, setEditData, removeEditData, addEditDictKey, setUniqueDropdownGroup, 
        addUniqueGroupValues, setPopupMessage } from '../../../redux'
import InfinitySelect from '../../reusable/infinitySelect/InfinitySelect'
import InfinityInput from '../../reusable/infinityInput/InfinityInput'


const InvalidItemsManyDropdownAdd = props => {

    const dispatch = useDispatch()

    const { datagroup, name } = props

    useEffect(() => {
        dispatch(addEditDictKey({datagroup: datagroup, name: name}))
    },[])

    return null
}


const ValidItemsManyDropdownAdd = props => {

    const dispatch = useDispatch()

    const { data, values, dropdown_dict, header, datagroup, has_input, is_large } = props

    const [ addVisible, setAddVisible ] = useState(false)

    const { name, unique_grp } = dropdown_dict
    const { dropdown } = useSelector(state => state)
    const { error, names } = dropdown.unique_multi_groups

    const firstRender = useRef(true);

    // if an error is recorded from the infinity-select or infintiy-input then this will hide the dropdown and trigger an error mesaage informing the user
    //      that an already existent value in the unique group has attempted to be added again. e.g. gold in both maj and min materials
    useEffect(() => {
        // console.log(dropdown)
        if ( error.name === name ){
            setAddVisible(false)
            dispatch(setPopupMessage({message: `Values need to be unique across all ${names[name]} groups `, type: 'error', style: 'error-fixed-edit'}))
        }
    },[error])


    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            // Finds if this dropdown ia part of a group of dropdowns that require unique values across all of them. If so, this builds the state for it
            unique_grp && dispatch(setUniqueDropdownGroup({name: name, group: unique_grp}))
        } else {
            // add all the values to the combined group
            unique_grp && dispatch(addUniqueGroupValues({group: unique_grp, values: Object.keys(data).map(row => data[row].label)}))
        }
    },[data])
    

    // Add a value to the table by selecting it in the infinitySelect / InfinityInput
    useEffect(() => {
        if ( dropdown[name] !== undefined ) {
            const { selected } = dropdown[name]
            if ( selected !== undefined && selected.key !== '' ) {
                const { key, label } = selected
                if ( !(key in data) ){
                    dispatch(addEditData({ name: name, datagroup: datagroup, key: key, label: label }))
                    setAddVisible(false)
                }
                setAddVisible(false)
            }
        }
    },[dropdown])

    useEffect(() => {
        const dict = {}
        const { key, label } = dropdown_dict
        values.forEach(row => {
            dict[row[key]] = {id: row[key], label: row[label], current: true, remove: false, add: false}
        })
        dispatch(setEditData({ data: dict, name: name, datagroup: datagroup }))
    }, [])

    const removeHandler = e => {
        const key = e.target.id
        dispatch(removeEditData({ name: name, datagroup: datagroup, key: key }))
    }

    return (
        <>
            <h5>{header}</h5>
            <div className='edit-table-c1'>
                <table className='table'>
                    <tbody>
                        { Object.keys(data).map(row => {
                            const key = data[row].id
                            return (data[row].remove
                            ? null
                            :   (
                                    <tr key={key} className='row'>
                                        <td className='col-10'>{ data[row].label }</td>
                                        <td className='col-2'><span id={key} onClick={ removeHandler }>{is_large ? 'Remove' : 'x'}</span></td>
                                    </tr>
                                )
                            )
                        })}
                    </tbody>
                </table>
                <div className='edit-add' onClick={() => setAddVisible(prevState => !prevState)}><span>Add +</span></div>
                {addVisible && (
                    <div className='add-select'>
                        {
                            has_input 
                            ? <InfinityInput dict={dropdown_dict} />
                            : <InfinitySelect dict={dropdown_dict} />
                        }
                    </div>
                )}
            </div>
        </>
    )
}


const ItemsManyDropdownAdd = props => {

    const { dropdown_dict, datagroup } = props

    const { name } = dropdown_dict

    const { dataEdit } = useSelector(state => state)
    const data = dataEdit[datagroup][name]

    if ( data === undefined ){
        return <InvalidItemsManyDropdownAdd datagroup={datagroup} name={name} />
    } else {
        return <ValidItemsManyDropdownAdd {...props} data={data} />
    }
}

export default ItemsManyDropdownAdd
