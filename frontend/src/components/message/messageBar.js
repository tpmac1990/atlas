import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

export default function ErrorBar() {

    const { message, type, trigger } = useSelector(state => state.messageHandler.map_page)

    const [ visibility, setVisibilty ] = useState('hideEle')

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        setVisibilty('showEleGrid')
        setTimeout(() => {
            setVisibilty('hideEle')
        }, 4000)
    },[trigger])

    function clickHandler(){
        setVisibilty('hideEle')
    }

    if ( type == 'error' ){
        var style = `${visibility} error-c1`
        var icon = 'close'
    } else {
        var style = `${visibility} success-c1`
        var icon = 'check'
    }

    return (
        <div id='messageBar' className={style}>
            <div><span className="material-icons">{icon}</span></div>
            <div><label>{message}</label></div>
            <div><span onClick={clickHandler}>x</span></div>
        </div>
    )
}
