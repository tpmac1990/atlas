import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openPrimary, openSecondary, closePrimary, closeSecondary } from '../../../redux'


function GroupButton(props) { 

    const dispatch = useDispatch()

    const { name } = props

    const { category, open, display, btnStyle } = useSelector(state => state.filterGroup.groups[name])

    // const style = category == 'a' ? 'filterGroupBtn btn-c2 ' + btnStyle : 'filterGroupBtn btn-c3 ' + btnStyle
    const style = category == 'a' ? `filter-grp-btn-pri btn-c2 ${btnStyle}` : `filter-grp-btn-sec btn-c3 ${btnStyle}`

    const symbol = open === true ? '-' : '+' 


    function groupClickHandler() {
        if ( open && category == 'a' ) {
            dispatch(closePrimary(name))
        } else if ( category == 'a' ) {
            dispatch(openPrimary(name))
        } else if ( open && category == 'b' ) {
            dispatch(closeSecondary(name))
        } else if ( category == 'b' ) {
            dispatch(openSecondary(name))
        }
    }

    return (
        <button name={name} className={style} onClick={groupClickHandler}>
            <label>{display}</label>
            <span>{symbol}</span>
        </button>
    )
}

export default GroupButton
