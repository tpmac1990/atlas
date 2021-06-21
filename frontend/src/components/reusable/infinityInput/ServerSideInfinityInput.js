import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setLoading, resetOffset, getInfinityDropdownData } from '../../../redux'
import InfinityInputArea from './InfinityInputArea'

const ServerSideInfinityInput = props => {

    const dispatch = useDispatch()

    const { name } = props

    const { model, key, label, search, data, limit, offset, hasMore, loading, clientmax, endpoint } = useSelector(state => state.dropdown[name])
    const [ firstRender, setFirstRender ] = useState(true)

    // resets the data and loads new data when a change is made in the search
    useEffect(() => {
        if (!firstRender) {
            const timer = setTimeout(() => {
                dispatch(resetOffset(name))
                dispatch(setLoading(name))
            }, 500);
        
            return () => clearTimeout(timer);
        }
    }, [search]);


    // when loading is set to true the action is dispatched to get data
    useEffect(() => {
        if ( loading ) {
            dispatch(getInfinityDropdownData({name,model,key,label,search,offset,limit,clientmax},endpoint))
        }
    },[loading])

    // if user has scrolled to the bottom of the div and there is more data to fetch it will fetch more data
    const scrollHandler = e => {
        if ( hasMore ) {
            const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
            if ( scrollHeight - scrollTop === clientHeight ) {
                dispatch(setLoading(name))
            }
        }
    }

    useEffect(() => {
        setFirstRender(false)
    },[])

    return <InfinityInputArea name={name} scrollHandler={scrollHandler} options={data} />

}

export default ServerSideInfinityInput;
