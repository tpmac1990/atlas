import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setState } from '../../../redux';

import SuccessInfinitySelect from './SuccessInfinitySelect'


const ThroughInfinitySelect = props => {

    const { name } = props

    const groupState = useSelector(state => state.dropdown[name])  

    return groupState === undefined ? null : <SuccessInfinitySelect name={name} />
}


const InfinitySelect = props => {

    const dispatch = useDispatch()

    const { name, styles, model, key, label, endpoint } = props.dict

    useEffect(() => {
        dispatch(setState({name: name, styles: styles, model: model, key: key, label: label, endpoint: endpoint}))
    }, [name])

    return <ThroughInfinitySelect name={name} />
}

export default InfinitySelect;

