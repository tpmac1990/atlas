import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetPopupMessage } from '../../redux'

export default function MessageBar() {

    const { type, message, style, trigger } = useSelector(state => state.messageHandler)

    const dispatch = useDispatch()

    const [ visibility, setVisibilty ] = useState(false)

    // if trigger is true then show the message bar with the message passed in
    useEffect(() => {
        if ( trigger ){
            setVisibilty(true)
            setTimeout(() => {
                setVisibilty(false)
                dispatch(resetPopupMessage())
            }, 4000)
        }
    },[trigger])

    // hide the message bar & reset the state of the message bar so it will work again if the same button is clicked again
    function clickHandler(){
        setVisibilty(false)
        dispatch(resetPopupMessage())
    }

    // determines the icon to use by the type 'error', 'success', 'warning' passed
    const dic = {
        error: 'close',
        success: 'check',
        warning: 'warning_amber'
    }

    return (
            visibility
            ? ( <div className={style} >
                    <div className='msg-bar-icon'><span className="material-icons">{dic[type]}</span></div>
                    <div className='msg-bar-msg'><label>{message}</label></div>
                    <div className='msg-bar-cross'><div className='close-c1' onClick={clickHandler}><span>x</span></div></div>
                </div> )
            : null
        )
}
