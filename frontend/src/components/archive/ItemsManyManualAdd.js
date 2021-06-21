import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addEditData, setEditData, removeEditData, addEditDictKey } from '../../../redux'
import InfinityInput from '../../reusable/infinityInput/InfinityInput'


const InvalidItemsManyManualAdd = props => {

    const dispatch = useDispatch()

    const { datagroup, name } = props

    useEffect(() => {
        dispatch(addEditDictKey({datagroup: datagroup, name: name}))
    },[])

    return null
}


const ValidItemsManyManualAdd = props => {

    const dispatch = useDispatch()

    const { data, values, dropdown_dict, header, datagroup } = props

    const [ addVisible, setAddVisible ] = useState(false)

    const { name } = dropdown_dict
    const { dropdown } = useSelector(state => state)

    useEffect(() => {
        if ( dropdown[name] !== undefined ) {
            const { selected } = dropdown[name]
            if ( selected !== undefined && selected.key !== '' ) {
                const { key, label } = selected
                if ( !(key in data) ){
                    dispatch(addEditData({ name: name, datagroup: datagroup, key: key, label: label }))
                    setAddVisible(false)
                }
            } 
        }
    },[dropdown])

    useEffect(() => {
        const dict = {}
        const { key, label } = dropdown_dict
        values.forEach(row => {
            dict[row[key]] = {id: row[key], label: row[label], current: true, remove: false, add: false}
        })
        dispatch(setEditData({ data: dict, name: name, datagroup: datagroup }))
    }, [])

    const removeHandler = e => {
        const key = e.target.id
        dispatch(removeEditData({ name: name, datagroup: datagroup, key: key }))
    }

    return (
        <>
            <h5>{header}</h5>
            <div className='edit-table-c1'>
                <table className='table'>
                    <tbody>
                        { Object.keys(data).map(row => {
                            var key = data[row].id
                            var styles = data[row].remove ? 'remove' : ''
                            var action_string = data[row].remove ? 'Re-add' : 'Remove'
                            return (
                                <tr key={key} className={`${styles} row`}>
                                    <td className='col-8'>{ data[row].label }</td>
                                    <td className='col-4'><span id={key} onClick={ removeHandler }>{ action_string }</span></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className='edit-add' onClick={() => setAddVisible(prevState => !prevState)}><span>Add +</span></div>
                {addVisible && (
                    <div className='add-select'>
                        <InfinityInput dict={dropdown_dict} />
                    </div>
                )}
            </div>
        </>
    )
}



const ItemsManyManualAdd = props => {

    const { dropdown_dict, datagroup } = props

    const { name } = dropdown_dict
    const { dataEdit } = useSelector(state => state)
    const data = dataEdit[datagroup][name]

    if ( data === undefined ){
        return <InvalidItemsManyManualAdd datagroup={datagroup} name={name} />
    } else {
        return <ValidItemsManyManualAdd {...props} data={data} />
    }

    // const { values, dropdown_dict, header } = props
    // const [ data,setData ] = useState({})
    // const [ addVisible,setAddVisible ] = useState(false)

    // const { name } = dropdown_dict
    // const { dropdown } = useSelector(state => state)

    // useEffect(() => {
    //     if ( dropdown[name] !== undefined ) {
    //         const { selected } = dropdown[name]
    //         if ( selected !== undefined && selected.key !== '' ) {
    //             const { key, label } = selected
    //             if ( !(key in data) ){
    //                 setData(prevData => {return{...prevData,
    //                                                 [key]: {id: key, label: label, current: false, remove: false, add: true}
    //                 }})
    //                 setAddVisible(false)
    //             }
    //         } 
    //     }
    // },[dropdown])

    // useEffect(() => {
    //     const dict = {}
    //     values.forEach(row => {
    //         dict[row.id] = {id: row[dropdown_dict.key], label: row[dropdown_dict.label], current: true, remove: false, add: false}
    //     })
    //     setData(dict)
    // }, [])

    // const removeHandler = e => {
    //     const key = e.target.id
    //     setData(prevData => {return{...prevData,
    //                                     [key]: {
    //                                         ...prevData[key],
    //                                             remove: !prevData[key].remove
    //                                     }
    //                         }})
    // }

    // return (
    //     <>
    //         <h5>{header}</h5>
    //         <div className='edit-table-c1'>
    //             <table className='table'>
    //                 <tbody>
    //                     { Object.keys(data).map(row => {
    //                         var key = data[row].id
    //                         var styles = data[row].remove ? 'remove' : ''
    //                         var action_string = data[row].remove ? 'Re-add' : 'Remove'
    //                         return (
    //                             <tr key={key} className={`${styles} row`}>
    //                                 <td className='col-8'>{ data[row].label }</td>
    //                                 <td className='col-4'><span id={key} onClick={ removeHandler }>{ action_string }</span></td>
    //                             </tr>
    //                         )
    //                     })}
    //                 </tbody>
    //             </table>
    //             <div className='edit-add' onClick={() => setAddVisible(prevState => !prevState)}><span>Add +</span></div>
    //             {addVisible && (
    //                 <div className='add-select'>
    //                     <InfinityInput dict={dropdown_dict} />
    //                 </div>
    //             )}
    //         </div>
    //     </>
    // )
}

export default ItemsManyManualAdd
