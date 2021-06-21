import React, { useState, useEffect } from 'react'
import axios from 'axios';

const EmailDrop = () => {

    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ msg, setMsg ] = useState('')
    const [ showMsg, setShowMsg ] = useState(false)
    const [ msgType, setMsgType ] = useState(null)

    const SubmitHandler = e => {
        e.preventDefault()
        if (firstName === '') {
            setMsg('First Name is a required field')
            setMsgType('error')
        } else if ( !email.includes('@') ) {
            setMsg('Please enter a valid email')
            setMsgType('error')
        } else {
            postEmail({first_name: firstName, last_name: lastName, email: email})
        }
    }

    const postEmail = dict => {
        axios
            .post(`/create-keep-posted/`,dict)
            .then(res => {
                setMsg("You are now on the mail list!")
                setMsgType('success')
                })
            .catch(err => {
                setMsg('Sorry, there was an issue adding you to the mail list!')
                setMsgType('error')
                });
    }

    useEffect(() => {
        if (msg !== ''){
            setShowMsg(true)
            setTimeout(() => {
                setShowMsg(false)
                setMsg('')
            }, 2000)
        }
    }, [msg])

    return (
        <div className='container-c1 email-drop'>
            <h1>Stay Posted</h1>
            <h2>with everything Gplore</h2>
            <hr />
            <form>
                <label>First Name:</label>
                <input type='text' placeholder='John' className='input-c4' value={firstName} onChange={e => setFirstName(e.target.value)} />
                <label>Last Name:</label>
                <input type='text' placeholder='Doe' className='input-c4' value={lastName} onChange={e => setLastName(e.target.value)} />
                <label>Email:</label>
                <input type='email' placeholder='john.doe@gmail.com' className='input-c4' value={email} onChange={e => setEmail(e.target.value)} /><br/>
                <button className='btn-c5' onClick={SubmitHandler}>Submit</button>
                { showMsg
                ? <div className={msgType}>{ msg }</div>
                : null }
            </form>
        </div>
        
    )
}

export default EmailDrop
