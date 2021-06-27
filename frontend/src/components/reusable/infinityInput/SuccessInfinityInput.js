import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLoading, setSearch, setDropdownVisibility, setSelection, incrementCreatedId, 
        hideAllDropdowns, setPopupMessage } from '../../../redux';

import ClientSideInfinityInput from './ClientSideInfinityInput'
import ServerSideInfinityInput from './ServerSideInfinityInput'


const SuccessInfinityInput = props => {

    const { name } = props

    const dispatch = useDispatch()

    const ref = useRef(null);
    // const inputRef = useRef(null);

    const [ firstRender, setFirstRender ] = useState(true)
    // const [ inputStyle, setInputStyle ] = useState('grey')

    const {selected, styles, data, search, is_client_dropdown, visible, created_id} = useSelector(state => state.dropdown[name])  

    // ??? see SuccessInfinitySelect for docs on this component
    const initialSearch = () => {
        if ( firstRender ) {
            dispatch(setLoading(name));
            setFirstRender(false);
        }
        // inputRef.current.focus()
    }

    const ClickHandler = e => {
        !e.target.tagName === 'BUTTON' && !visible && dispatch(setDropdownVisibility({name: name, visible: true}))
    }

    const handleClickOutside = (event) => {
        ref.current && !ref.current.contains(event.target) && dispatch(hideAllDropdowns())
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    // each time the component is created the created id will have a 1 added to it to make it unique
    useEffect(() => {
        dispatch(incrementCreatedId({name: name}))
    },[])

    useEffect(() => {
        if ( !visible ) {
            dispatch(setSearch({value: '', name: name}))
        }
    },[visible])

    const AddHandler = e => {
        e.preventDefault()
        if ( search === '' ){
            dispatch(setPopupMessage({message: "Cannot add a blank value", type: 'warning', style: 'warning-fixed-user'}))
        } else {
            let i;
            var success = false
            for (i = 0; i < data.length; i++) {
                if ( data[i][1].toLowerCase() === search.toLowerCase() ) {
                    dispatch(setSelection({selection: { key: data[i][0], label: data[i][1] }, name: name}))
                    success = true
                    break;
                }
            }
            !success && dispatch(setSelection({selection: { key: created_id, label: search }, name: name}))
            dispatch(setDropdownVisibility({name: name, visible: false}))
        }
    }


    return (
        <div ref={ref} className={`${styles} infinity-with-add`} onClick={ClickHandler}>
            <div className={`infinity-select-input ${visible ? 'blue' : 'grey'}`} onClick={initialSearch}>
                <input 
                    type='text' 
                    autoComplete="off"
                    value={search} 
                    placeholder={selected.label} 
                    onChange={e => dispatch(setSearch({value: e.target.value, name: name}))}
                />
                <div className='infinity-down-arrow'>
                    <div className="material-icons">keyboard_arrow_down</div>
                </div>
            </div>
            <button className='btn-c5' onClick={AddHandler}>Add</button>
            { visible && (
                is_client_dropdown 
                ? <ClientSideInfinityInput name={name} /> 
                : <ServerSideInfinityInput name={name} /> 
            )}
        </div>
    )
}

export default SuccessInfinityInput
