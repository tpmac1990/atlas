import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setState } from '../../../redux';

import SuccessInfinityInput from './SuccessInfinityInput'


const ThroughInfinityInput = props => {

    const { name } = props

    const groupState = useSelector(state => state.dropdown[name])  

    return groupState === undefined ? null : <SuccessInfinityInput name={name} />
}


const InfinityInput = props => {

    const dispatch = useDispatch()

    const { name, styles, model, key, label, endpoint } = props.dict

    useEffect(() => {
        dispatch(setState({name: name, styles: styles, model: model, key: key, label: label, endpoint: endpoint}))
    }, [name])

    return <ThroughInfinityInput name={name} />
}

export default InfinityInput;