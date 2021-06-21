import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addEditDataHolder, setEditData, removeEditData, addEditDictKey, updateEditCell } from '../../../redux'
import InfinityInput from '../../reusable/infinityInput/InfinityInput'

import EditTableManualEditCell from './EditTableManualEditCell'
import EditTableDropDownEditCell from './EditTableDropDownEditCell'

// when the component is first loaded there will be no data, this will return null and fetch the data. 
// once the data is returned, the component will rerender displaying it
const InvalidItemsManyHolder = props => {

    const dispatch = useDispatch()

    const { datagroup, name } = props

    useEffect(() => {
        dispatch(addEditDictKey({datagroup: datagroup, name: name}))
    },[])

    return null
}

// this component will run when the data is returned successfully
const ValidItemsManyHolder = props => {

    const dispatch = useDispatch()

    const { data, values, dropdown_dict, header, datagroup } = props

    const [ addVisible, setAddVisible ] = useState(false)

    const { name } = dropdown_dict
    const { dropdown } = useSelector(state => state)

    useEffect(() => {
        if ( dropdown[name] !== undefined ) {
            const { selected } = dropdown[name]
            if ( selected !== undefined && selected.key !== '' ) {
                const { key, label } = selected
                if ( !(key in data) ){
                    dispatch(addEditDataHolder({ name: name, datagroup: datagroup, key: key, label: label, percown: 0, position: 'Direct Holder' }))
                    setAddVisible(false)
                }   
            } 
        }
    },[dropdown])

    useEffect(() => {
        const dict = {}
        const { key, label } = dropdown_dict
        values.forEach(row => {
            dict[row[key]] = {id: row[key], label: row[label], percown: row.percown, position: row.position, current: true, remove: false, add: false}
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
                    <thead>
                        <tr className='row'>
                            <th className='col-4'>Name</th>
                            <th className='col-3'>Percentage Owned</th>
                            <th className='col-3'>Holder Position</th>
                            <th className='col-2'></th>
                        </tr>
                    </thead>
                    <tbody>
                        { Object.keys(data).map(row => {
                            var key = data[row].id
                            var styles = data[row].remove ? 'remove' : ''
                            var action_string = data[row].remove ? 'Re-add' : 'Remove'
                            return (
                                <tr key={key} className={`${styles} row`}>
                                    <td className='col-4'>{ data[row].label }</td>
                                    <td className='col-3'><EditTableManualEditCell defualtValue={data[row].percown} id={key} datagroup={datagroup} name={name} /></td>
                                    <td className='col-3'><EditTableDropDownEditCell defualtValue={data[row].position} id={key} datagroup={datagroup} name={name} /></td>
                                    <td className='col-2'><span id={key} onClick={ removeHandler }>{ action_string }</span></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className='edit-add' onClick={() => setAddVisible(prevState => !prevState)}><span>Add +</span></div>
                {addVisible && (
                    <div className='add-select'>
                        <InfinityInput dict={dropdown_dict} />
                    </div>
                )}
            </div>
        </>
    )
}



const ItemsManyHolder = props => {

    const { dropdown_dict, datagroup } = props

    const { name } = dropdown_dict
    const { dataEdit } = useSelector(state => state)
    const data = dataEdit[datagroup][name]

    if ( data === undefined ){
        return <InvalidItemsManyHolder datagroup={datagroup} name={name} />
    } else {
        return <ValidItemsManyHolder {...props} data={data} />
    }
}

export default ItemsManyHolder
