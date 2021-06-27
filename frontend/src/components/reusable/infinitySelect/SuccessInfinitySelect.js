import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLoading, setSearch, setDropdownVisibility, hideAllDropdowns } from '../../../redux';

import ClientSideInfinitySelect from './ClientSideInfinitySelect'
import ServerSideInfinitySelect from './ServerSideInfinitySelect'


const SuccessInfinitySelect = props => {

    const { name } = props

    const dispatch = useDispatch()

    const ref = useRef(null);
    // const inputRef = useRef(null);

    const [ firstRender, setFirstRender ] = useState(true)

    const {dropdown} = useSelector(state => state)
    const { active_dropdown } = dropdown
    const {selected, styles, search, is_client_dropdown, visible} = dropdown[name]


    // This loads the data when the input of the dropdown is first clicked on
    const initialSearch = () => {
        if ( firstRender ) {
            dispatch(setLoading(name));
            setFirstRender(false);
        }
        // inputRef.current.focus()
    }

    // make dropdown visible for infinitySelect/Input clicked
    const ClickHandler = () => {
        !visible && dispatch(setDropdownVisibility({name: name, visible: true}))
    }

    // loop through all infinity dropdowns and hide them if user clicks outside of them. 
    // the ClickHandler above will show the new dropdown for the input clicked
    const handleClickOutside = e => {
        // !ref.current.contains(e.target): a click occurs outside the element
        // active_dropdown === name: the active_dropdown is of this element. There will be click events for each infinity dropdown, so this
        //      will prevent a dispatch occurring when a click occurs outside another infinity dropdown
        ref.current && !ref.current.contains(e.target) && active_dropdown === name && dispatch(hideAllDropdowns())
    };

    // When this component is first rendered this sets an event listener on the document. 
    // every click triggers handleClickOutside
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    // clear the search state when the search box is hidden
    useEffect(() => {
        !visible && dispatch(setSearch({value: '', name: name}))
    },[visible])

    return (
        <div ref={ref} className={styles} onClick={ClickHandler}>
            <div className={`infinity-select-input ${visible ? 'blue' : 'grey'}`} onClick={initialSearch}>
                <input 
                    autoComplete="off"
                    type='text' 
                    value={search} 
                    placeholder={selected.label}
                    onChange={e => dispatch(setSearch({value: e.target.value, name: name}))}
                />
                <div className='infinity-down-arrow'>
                    <div className="material-icons">keyboard_arrow_down</div>
                </div>
            </div>
            { visible && (
                is_client_dropdown 
                ? <ClientSideInfinitySelect name={name} /> 
                : <ServerSideInfinitySelect name={name} /> 
            )}
        </div>
    )
}

export default SuccessInfinitySelect
