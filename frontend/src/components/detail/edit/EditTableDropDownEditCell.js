import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updateEditCell } from '../../../redux'

const EditTableDropDownEditCell = props => {

    const dispatch = useDispatch()

    const { defualtValue, id, datagroup, name, model, field } = props

    // the dropdown data is held in state under the model name
    const { [model]: lst } = useSelector(state => state.dataEdit.dropdowns)

    // display the Success component once the dropdown data has been returned.
    const Success = () => {
        // update the state with the value selected from the dropdown
        const ChangeHandler = e => {
            const { value } = e.target
            dispatch(updateEditCell({key: id, field: field, name: name, datagroup: datagroup,  value: value}))
        }
        
        return (
            <select className='cell-edit-input' value={defualtValue} onChange={ChangeHandler}>
                {lst.map(row => {
                    return <option key={row[0]} value={row[0]}>{row[1]}</option>
                })}
            </select>
        )
    }

    // This will momentarily display none until the axios call has fetched the data to display in the dropdown
    return (
        lst === undefined
        ? null
        : <Success />
    )
}

export default EditTableDropDownEditCell