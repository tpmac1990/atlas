import React from 'react'

// this is a checkbox that cators to an indeterminate state in the react-table

// we have created a checkbox component that accepts some props and applies them on the native input checkbox element.
// you can get this component from the react-table docs

export const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
        <div className='checkbox-c1'>
            <input type='checkbox' id='toggle-all' ref={resolvedRef} {...rest} />
            <label htmlFor='toggle-all' >Toggle All</label>
        </div>
    )
})