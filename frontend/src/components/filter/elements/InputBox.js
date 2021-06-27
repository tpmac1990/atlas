import React from 'react'
import { useSelector } from 'react-redux'

function InputBox(props) {

    const { display, name, type, changeHandler } = props.dic

    const value = useSelector(state => state.filterSelection.input[name])

    return (
        // <div className='filter-textbox'>
        <div>
            <label>{display}</label><br/>
            <input type={type} name={name} value={value} onChange={changeHandler} />
        </div>     
    )
}

export default InputBox

