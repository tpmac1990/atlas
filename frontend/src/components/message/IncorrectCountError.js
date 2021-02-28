import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

export default function ErrorBar() {

    const { message, type, trigger } = useSelector(state => state.messageHandler.detail)

    const [ visibility, setVisibilty ] = useState('hideEle')

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        setVisibilty('showEle')
        setTimeout(() => {
            setVisibilty('hideEle')
        }, 4000)
    },[trigger])

    var styles = `${visibility} error-c2`

    return <span className={styles}>{message}</span>
}
