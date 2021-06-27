import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterDataset, resetFilterGroupState, resetFilterSelection } from '../../redux/'


function Control() {

    const dispatch = useDispatch()

    const{ filterDataset } = useSelector(state => state.filterDirection)

    const combinedHandler = () => {
        dispatch(resetFilterGroupState())
        dispatch(resetFilterSelection())
    }

    function datasetHandler(e){
        combinedHandler()
        dispatch(setFilterDataset(e.target.name))
    }

    const radioBar = (ds, Handler) => (
        <Fragment key={ds[1]}>
            <input checked={ filterDataset == ds[1] } id={ds[1] + 'ctrl'} type="radio" name={ds[1]} onChange={Handler}/>
            <label htmlFor={ds[1] + 'ctrl'}>{ds[0]}</label>
        </Fragment>
    )
    
    const datasets = [['Titles','Tenement'], ['Sites','Occurrence']].map(ds => {
        return radioBar(ds, datasetHandler)
    })

    return (
        <div id='ctrl-bar'>
            <div className='radiobar-c1 radiobar-s1'>
                { datasets }
            </div>
        </div>
    )

}

export default Control