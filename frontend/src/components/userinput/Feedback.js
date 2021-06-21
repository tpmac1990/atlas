import React, { useState, useEffect } from 'react'
import StarRating from '../reusable/rating/StarRating'
import axios from 'axios';

const Feedback = () => {

    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ feedback, setFeedback ] = useState('')
    const [ msg, setMsg ] = useState('')
    const [ showMsg, setShowMsg ] = useState(false)
    const [ msgType, setMsgType ] = useState(null)
    const [ clickRate, setClickRate ] = useState(null)

    const SubmitHandler = e => {
        e.preventDefault()
        if ( !email.includes('@') && email !== '' ) {
            setMsg('Please enter a valid email')
            setMsgType('error')
        } else if ( !clickRate ) {
            setMsg('Please leave a rating')
            setMsgType('error')
        } else {
            postFeedback({name: name,email: email,feedback: feedback,rating: clickRate})
        }
    }

    const postFeedback = dict => {
        axios
            .post(`/create-feedback/`,dict)
            .then(res => {
                setMsg('Thanks for your feedback!')
                setMsgType('success')
                })
            .catch(err => {
                setMsg('Sorry, there was an issue submitting your feedback!')
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
        <div className='container-c1 feedback'>
            <h1>Feedback</h1>
            <h2>The good, the bad, we want it!</h2>
            <hr />
            <form>
                <label>Name:</label>
                <input type='text' placeholder='John' className='input-c4' value={name} onChange={e => setName(e.target.value)} />
                <label>Email:</label>
                <input type='email' placeholder='john.doe@gmail.com' className='input-c4' value={email} onChange={e => setEmail(e.target.value)} /><br/>
                <label>Rate your experience:</label>
                <StarRating clickRate={clickRate} setClickRate={setClickRate} />
                <label>Feedback:</label>
                <textarea type='textarea' className='input-c4' value={feedback} onChange={e => setFeedback(e.target.value)} />
                <button className='btn-c5' onClick={SubmitHandler}>Submit</button>               
                { showMsg
                ? <div className={msgType}>{ msg }</div>
                : null }
            </form>
        </div>
    )
}

export default Feedback