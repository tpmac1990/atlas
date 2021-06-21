import React from 'react'

const ErrorPage = props => {
    const { error, msg } = props
    return (
        <div className='error-page'>
            <div>
                <h1>{error}</h1>
                <h4>{msg}</h4>
            </div>
        </div>
    )
}

export default ErrorPage;