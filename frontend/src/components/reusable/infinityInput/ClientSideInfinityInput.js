import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getInfinityDropdownData } from '../../../redux'
import InfinityInputArea from './InfinityInputArea'

const ClientSideInfinityInput = props => {

    const dispatch = useDispatch()

    const { name } = props

    const { model, key, label, search, data, limit, loading: redux_loading, clientmax, endpoint } = useSelector(state => state.dropdown[name])

    const [ hasMore, setHasMore ] = useState(data.length > limit)
    const [ loading, setLoading ] = useState(false)
    const [ offset, setOffset ] = useState(0)
    const [ options , setOptions ] = useState(data)
    const [ slicedOptions , setSlicedOptions ] = useState([])
    const [ isReset, setIsReset ] = useState(true)
    const [ firstRender, setFirstRender ] = useState(true)

    // when loading is set to true the action is dispatched to get data
    useEffect(() => {
        if ( redux_loading ) {
            dispatch(getInfinityDropdownData({name,model,key,label,search,offset,limit,clientmax},endpoint))
        }
    },[redux_loading])

    useEffect(() => {
        setLoading(true)
    },[data])

    // When search changes reset the offset rerender the options
    useEffect(() => {
        if (!firstRender) {
            const timer = setTimeout(() => {
                setOffset(0)
                setIsReset(true)
                setLoading(true)
            }, 500);
        
            return () => clearTimeout(timer);
        }
    },[search])

    // Append more rows if they exist when the user scrolls to the bottom of the element
    const scrollHandler = e => {
        if ( hasMore && !loading ) {
            const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
            if ( scrollHeight - scrollTop === clientHeight ) {
                setIsReset(false)
                setLoading(true)
            }
        }
    }

    // set the slice options to render in the dropdown. If its a reset from a search change then reset the options aswell
    useEffect(() => {
        if ( loading ){
            if ( isReset ) {
                setOptions(data.filter(item => item[1].toLowerCase().includes(search.toLowerCase())))
                setHasMore(options.length > offset + limit);
            } else {
                setHasMore(options.length > offset + limit);
                setSlicedOptions(prevSlicedOptions => { return [...prevSlicedOptions, ...options.slice(offset, offset + limit)] })
                setOffset(prevOffset => { return prevOffset + limit })
                setLoading(false)
            }
        } 
    },[loading])

    // if the options change because of a reset then rerender the sliced options.
    useEffect(() => {
        if ( isReset ) {
            setSlicedOptions(options.slice(offset, offset + limit))
            setOffset(offset + limit)
            setLoading(false)
        } 
    },[options])

    useEffect(() => {
        setFirstRender(false)
    },[])

    return <InfinityInputArea scrollHandler={scrollHandler} options={slicedOptions} name={name} />

}

export default ClientSideInfinityInput;
