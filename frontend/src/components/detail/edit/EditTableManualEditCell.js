import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addEditDataHolder, setEditData, removeEditData, addEditDictKey, updateEditCell } from '../../../redux'
import InfinityInput from '../../reusable/infinityInput/InfinityInput'


const EditTableManualEditCell = props => {

    const dispatch = useDispatch()
    
    const { defualtValue, id, datagroup, name, input_type } = props

    const [ value, setValue ] = useState(defualtValue)

    const BlurHandler = () => {
        dispatch(updateEditCell({key: id, field: 'percown', name: name, datagroup: datagroup,  value: value}))
    }

    return <input type={input_type} className='cell-edit-input' id={id} value={value} onChange={e => setValue(e.target.value)} onBlur={BlurHandler} autoComplete="off"></input>
}

export default EditTableManualEditCell