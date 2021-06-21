import React from 'react'
import ErrorPage from './ErrorPage'

export default function Page503() {
    return <ErrorPage error='503' msg='Service Unavailable' />
}
