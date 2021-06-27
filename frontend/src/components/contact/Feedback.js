import React, { useState } from 'react'
import StarRating from '../reusable/rating/StarRating'
import { setPopupMessage, saveUserFeedback } from '../../redux'
import { useDispatch } from 'react-redux'

const Feedback = () => {

    const dispatch = useDispatch()

    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ feedback, setFeedback ] = useState('')
    const [ clickRate, setClickRate ] = useState(null)

    const SubmitHandler = e => {
        e.preventDefault()
        if ( !email.includes('@') && email !== '' ) {
            dispatch(setPopupMessage({message: "Please enter a valid email", type: 'error', style: 'error-fixed-user'}))
        } else if ( !clickRate ) {
            dispatch(setPopupMessage({message: "Please leave a rating", type: 'error', style: 'error-fixed-user'}))
        } else {
            dispatch(saveUserFeedback({name: name,email: email,feedback: feedback,rating: clickRate}))
        }
    }

    return (
        <div className="basic-form-area">
            <div className='feedback-area'>
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
                </form>
            </div>
        </div>
    )
}

export default Feedback