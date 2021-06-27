import React, { useState } from 'react'
import { setPopupMessage, saveUserEmail } from '../../redux'
import { useDispatch } from 'react-redux'

const EmailDrop = () => {

    const dispatch = useDispatch()

    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ email, setEmail ] = useState('')


    const SubmitHandler = e => {
        e.preventDefault()
        if (firstName === '') {
            dispatch(setPopupMessage({message: "'First Name' is a required field", type: 'error', style: 'error-fixed-user'}))
        } else if ( !email.includes('@') ) {
            dispatch(setPopupMessage({message: "Please enter a valid email", type: 'error', style: 'error-fixed-user'}))
        } else {
            dispatch(saveUserEmail({first_name: firstName, last_name: lastName, email: email}))
        }
    }


    return (
        <div className='basic-form-area'>
            <div className='email-drop-area'>
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
                </form>
            </div>
        </div>
        
    )
}

export default EmailDrop
