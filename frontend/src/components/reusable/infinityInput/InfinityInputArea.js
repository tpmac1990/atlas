import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelection, setUniqueMultiGroupError, addUniqueGroupValues } from '../../../redux';

const InfinityInputArea = props => {

    const dispatch = useDispatch()

    const { scrollHandler, options, name } = props
    // groups such as maj and min materials that can only have unique values between them. This holds that data
    const { names, values } = useSelector(state => state.dropdown.unique_multi_groups)

    const clickHandler = e => {
        const { id, innerHTML } = e.target

        // if name in names then the group i.e. majmat is part of a multi group which must have unique values across all members
        if ( name in names ){
            if ( values[names[name]].includes(innerHTML) ){
                // the value the user is attempting to add exists already across one of the unique multi groups. This will hide the dropdown, clear the
                //      search and set an error in the dropdown state. This error is trigger a use effect in the appropriate parent components which will 
                //      hide the infinity-select box
                dispatch(setUniqueMultiGroupError({name: name, value: innerHTML}))
            } else {
                // the value selected doesn't exist, so it needs to be added to the multi group so it is not added a again in any of the other members of the multi group
                dispatch(addUniqueGroupValues({group: names[name], values: [innerHTML]}))
                dispatch(setSelection({selection: { key: id, label: innerHTML }, name: name}))
            }
        } else {
            // this group is not part of a multi group so only needs to be added to the selection
            dispatch(setSelection({selection: { key: id, label: innerHTML }, name: name}))
        }
    }


    return (
        <div className='infinity-select-dropdown' onScroll={scrollHandler}>
            {options.map(row => {
                return (
                    <p key={row[0]} id={row[0]} onClick={clickHandler}>{row[1]}</p>
                )
            })}          
        </div>
    )
}

export default InfinityInputArea;