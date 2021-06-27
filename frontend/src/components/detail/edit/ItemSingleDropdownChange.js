import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setEditData, addEditDictKey } from '../../../redux'

import InfinitySelect from '../../reusable/infinitySelect/InfinitySelect'


const InvalidItemSingleDropdownChange = props => {

    const dispatch = useDispatch()

    const { datagroup, name } = props

    useEffect(() => {
        dispatch(addEditDictKey({datagroup: datagroup, name: name}))
    },[])

    return null
}


const ValidItemSingleDropdownChange = props => {

    const dispatch = useDispatch()

    const { data, values, dropdown_dict, header, datagroup } = props

    const [ addVisible, setAddVisible ] = useState(false)

    const { name } = dropdown_dict
    const { dropdown } = useSelector(state => state)
    

    const updateChangeDict = data => {
        var dict = {}
        Object.keys(data).forEach(row => {
            dict[row] = {
                        ...data[row],
                            remove: true
                    }
        })
        return dict
    }

    useEffect(() => {
        if ( dropdown[name] !== undefined ) {
            const { selected } = dropdown[name]
            if ( selected !== undefined && selected.key !== '' ) {
                const { key, label } = selected
                if ( !(key in data) ){
                    var dict = updateChangeDict(data)
                    dict[key] = {id: key, label: label, current: false, remove: false, add: true}
                    dispatch(setEditData({ data: dict, name: name, datagroup: datagroup }))
                    setAddVisible(false)
                } else if ( data[key].remove ){
                    // re-add a previously removed line. The line will maintain any changes made before being changed.
                    var dict = updateChangeDict(data)
                    dict[key] = {id: key, label: label, current: dict[key].current, remove: false, add: dict[key].add}
                    dispatch(setEditData({ data: dict, name: name, datagroup: datagroup }))
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

    useEffect(() => {
        const dict = {}
        dict[values[dropdown_dict.key]] = {id: values[dropdown_dict.key], label: values[dropdown_dict.label], current: true, remove: false, add: false}
        dispatch(setEditData({ data: dict, name: name, datagroup: datagroup }))
    }, [])

    const removeHandler = e => {
        const id = e.target.id
        var dict = {}
        Object.keys(data).forEach(key => {
            dict[key] = {
                        ...data[key],
                            remove: key === id ? false : true
                    }
        })
        dispatch(setEditData({ data: dict, name: name, datagroup: datagroup }))
    }

    return (
        <>
            <h5>{header}</h5>
            <div className='edit-table-c1'>
                <table className='table'>
                    <tbody>
                        { Object.keys(data).map(row => {
                            var key = data[row].id
                            {/* var styles = data[row].remove ? 'remove' : '' */}
                            {/* var action_string = data[row].remove ? 'Re-select' : '' */}
                            return (data[row].remove
                                ? null
                                : (
                                    <tr key={key} className='row'>
                                        <td className='col-12'>{ data[row].label }</td>
                                        {/* <td className='col-4'><span id={key} onClick={ removeHandler }>{ action_string }</span></td> */}
                                    </tr>
                                )
                            )
                        })}
                    </tbody>
                </table>
                <div className='edit-add' onClick={() => setAddVisible(prevState => !prevState)}><span>Change +</span></div>
                {addVisible && (
                    <div className='add-select'>
                        <InfinitySelect dict={dropdown_dict} />
                    </div>
                )}
            </div>
        </>
    )
}



const ItemSingleDropdownChange = props => {

    const { dropdown_dict, datagroup } = props

    const { name } = dropdown_dict
    const { dataEdit } = useSelector(state => state)
    const data = dataEdit[datagroup][name]

    if ( data === undefined ){
        return <InvalidItemSingleDropdownChange datagroup={datagroup} name={name} />
    } else {
        return <ValidItemSingleDropdownChange {...props} data={data} />
    }

}

export default ItemSingleDropdownChange
