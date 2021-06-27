import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addEditData, setEditData, removeEditData, addEditDictKey, addEditDataHolder, 
        getDropdownData, setPopupMessage, setUniqueDropdownGroup, addUniqueGroupValues } from '../../../redux'
import InfinitySelect from '../../reusable/infinitySelect/InfinitySelect'
import InfinityInput from '../../reusable/infinityInput/InfinityInput'
import EditTableManualEditCell from './EditTableManualEditCell'
import EditTableDropDownEditCell from './EditTableDropDownEditCell'


const InvalidItemsManyDropdownAddMulti = props => {

    const dispatch = useDispatch()

    const { datagroup, name } = props

    useEffect(() => {
        dispatch(addEditDictKey({datagroup: datagroup, name: name}))
    },[])

    return null
}


const ValidItemsManyDropdownAddMulti = props => {

    const dispatch = useDispatch()

    const { data, values, dropdown_dict, header, datagroup, has_input, columns, is_large } = props

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
                // console.log(label)
                if ( !(key in data) ){
                    var temp = {name: name, datagroup: datagroup, key: key, label: label}
                    columns.forEach((line,index) => {
                        if ( index !== 0 ) temp[line.label] = line.default
                    })
                    dispatch(addEditDataHolder(temp))
                    // dispatch(addEditDataHolder({ name: name, datagroup: datagroup, key: key, label: label, percown: 0, position: 'Direct Holder' }))
                    setAddVisible(false)
                } else if ( data[key].remove ){
                    // re-add a previously removed line. The line will maintain any changes made before being changed.
                    dispatch(removeEditData({name: name, datagroup: datagroup, key: key}))
                    setAddVisible(false)
                } else if ( !data[key].remove ) {
                    // it already exists in the list, so do nothing and close the add box
                    setAddVisible(false)
                } else {
                    console.log('ItemsManyDropdownAddMulti component. uncaught')
                }
            } 
        }
    },[dropdown])

    // Build the initial state
    // current: original value
    // remove: value to be removed
    // add: value added. if current & add are both true, then the value existsed already, but it has been updated (only in a multicolumn table)
    useEffect(() => {
        const dict = {}
        const { key, label } = dropdown_dict
        // console.log(values)
        values.forEach(row => {
            var temp = {id: row[key], label: row[label], current: true, remove: false, add: false}
            columns.forEach((line,index) => {
                if ( index !== 0 ) temp[line.label] = row[line.label]
            })
            dict[row[key]] = temp
            // console.log(dict)
            // dict[row[key]] = {id: row[key], label: row[label], percown: row.percown, position: row.position, current: true, remove: false, add: false}
        })
        dispatch(setEditData({ data: dict, name: name, datagroup: datagroup }))
    }, [])

    // fetch the data required for the EditTableDropDownEditCell columns (if there are any) and set it to state
    useEffect(() => {
        columns.forEach(row => {
            row.edit_type === 'select' && dispatch(getDropdownData({model: row.model, key: row.select_key, label: row.select_label}))
        })
    },[])

    // when 'Remove' is clicked the line will be hidden. If it is re-added, the same value will be re-displayed. If this is a multi column then anychanges 
    //  made previously will still exist.
    // the dropdown data is stored under its model name.
    const removeHandler = e => {
        const key = e.target.id
        dispatch(removeEditData({ name: name, datagroup: datagroup, key: key }))
    }

    // const openAddHandler = () => {
    //     // console.log('hello')
    //     setAddVisible(prevState => !prevState)
    // }

    // {`${is_large ? lg_style : sm_style} ${edit_type === 'select' ? 'wide-td' : ''}`}

    return (
        <>
            <h5>{header}</h5>
            <div className='edit-table-c1'>
                <table className='table'>
                    <thead>
                        <tr className='row'>
                            {columns.map(col => {
                                return (
                                    <th key={col.header} className={is_large ? col.lg_style : col.sm_style}>{col.header}</th>
                                )
                            })}
                            <th className={is_large ? 'col-2' : 'col-1'}></th>
                        </tr>
                    </thead>
                    <tbody>
                        { Object.keys(data).map(row => {
                            const key = data[row].id
                            return (data[row].remove
                            ? null
                            : ( <tr key={key} className='row'>
                                    {columns.map(col => {
                                        const { header, lg_style, sm_style, label, edit_type, model, input_type, default: default_val } = col
                                        return (!edit_type
                                        ? <td key={header} className={is_large ? lg_style : sm_style}>{ data[row][label] }</td>
                                        : <td key={header} className={is_large ? lg_style : sm_style}>{
                                            edit_type === 'select'
                                            ? <EditTableDropDownEditCell defualtValue={data[row][label]} id={key} datagroup={datagroup} name={name} model={model} field={label} />
                                            : <EditTableManualEditCell defualtValue={data[row][label]} id={key} datagroup={datagroup} name={name} input_type={input_type} />
                                        }</td>
                                        )
                                    })}
                                    <td className={is_large ? 'col-2' : 'col-1'}><span id={key} onClick={ removeHandler }>{is_large ? 'Remove' : 'x'}</span></td>
                                </tr>
                                )
                            )
                        })}
                    </tbody>    
                </table>
                <div className='edit-add' onClick={() => setAddVisible(prevState => !prevState)}><span>Add +</span></div>
                {addVisible 
                ? (
                    <div className='add-select'>
                        {
                            has_input 
                            ? <InfinityInput dict={dropdown_dict} />
                            : <InfinitySelect dict={dropdown_dict} />
                        }
                    </div>)
                : null
                }
            </div>
        </>
    )
}



const ItemsManyDropdownAddMulti = props => {

    const { dropdown_dict, datagroup } = props

    const { name } = dropdown_dict

    const { dataEdit } = useSelector(state => state)
    const data = dataEdit[datagroup][name]

    if ( data === undefined ){
        return <InvalidItemsManyDropdownAddMulti datagroup={datagroup} name={name} />
    } else {
        return <ValidItemsManyDropdownAddMulti {...props} data={data} />
    }
}

export default ItemsManyDropdownAddMulti
