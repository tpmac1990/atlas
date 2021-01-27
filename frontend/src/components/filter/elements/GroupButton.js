import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openPrimary, openSecondary, closePrimary, closeSecondary, noBufferIDSelected } from '../../../redux'


function GroupButton(props) { 

    const dispatch = useDispatch()

    const { name } = props
    // console.log(name)

    const { category, open, display, btnStyle, group } = useSelector(state => state.filterGroup.groups[name])
    // console.log
    const { filterDirection } = useSelector(state => state.filterDirection)
    const { idexists } = useSelector(state => state.filterSelection)

    const style = category == 'a' ? 'filterGroupBtn btn-c2 ' + btnStyle : 'filterGroupBtn btn-c3 ' + btnStyle

    const symbol = open === true ? '-' : '+'

    const canOpen = filterDirection != 'Buffer' || idexists || group == 'idbuffer'
    
    function groupClickHandler() {
        if ( canOpen ) {
            if ( open && category == 'a' ) {
                dispatch(closePrimary(name))
            } else if ( category == 'a' ) {
                dispatch(openPrimary(name))
            } else if ( open && category == 'b' ) {
                dispatch(closeSecondary(name))
            } else if ( category == 'b' ) {
                dispatch(openSecondary(name))
            }
        } else {
            dispatch(noBufferIDSelected())
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
