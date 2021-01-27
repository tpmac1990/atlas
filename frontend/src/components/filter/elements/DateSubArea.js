import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DateBox from './DateBox'

function DateSubArea(props) {

    const { name } = props

    const { areaStyle, opened, open } = useSelector(state => state.filterGroup.groups[name])

    const dateTypes = [
        {name: 'lodgedate', display: 'Lodge Date:'}, 
        {name: 'startdate', display: 'Start Date:'},
        {name: 'enddate', display: 'End Date:'},
        ]

    const dateGroups = dateTypes.map(dic => {
        return <DateBox key={ dic.name } dic={dic}/>
    })

    return (
        <div className={areaStyle}>
            { dateGroups }
        </div>
    )
}

export default DateSubArea



// function DrawSubArea (props) {

//     return (
//         <div id="drawSubArea" className={areaStyle}>
//             <button className='btn-c1' onClick={drawRectangleHandler}>Click Me</button>
//             <button className='btn-c1' onClick={deleteRectangleHandler}>Clear Rectangle</button>
//             <h3>North East</h3>
//             <LatLngTextbox name={'NELat'}/>
//             <LatLngTextbox name={'NELng'}/>
//             <h3>South West</h3>
//             <LatLngTextbox name={'SWLat'}/>
//             <LatLngTextbox name={'SWLng'}/>
//         </div>
//     )
// }

// export default DrawSubArea