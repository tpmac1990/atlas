import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterDataset, resetFilterGroupState, resetFilterSelection } from '../../redux/'


function Control() {

    const dispatch = useDispatch()

    // const{ filterDataset, filterDirection } = useSelector(state => state.filterDirection)
    const{ filterDataset } = useSelector(state => state.filterDirection)

    const combinedHandler = () => {
        dispatch(resetFilterGroupState())
        dispatch(resetFilterSelection())
    }

    function datasetHandler(e){
        combinedHandler()
        dispatch(setFilterDataset(e.target.name))
    }

    // function directionHandler(e){
    //     combinedHandler()
    //     dispatch(setFilterDirection(e.target.name))
    // }

    // const radioBar = (ds, Handler) => (
    //     <Fragment key={ds}>
    //         <input checked={filterDataset == ds || filterDirection == ds } id={ds + 'ctrl'} type="radio" name={ds} onChange={Handler}/>
    //         <label htmlFor={ds + 'ctrl'}>{ds}</label>
    //     </Fragment>
    // )

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
        <div id='ctrlBar'>
            <div className='radiobarStyle1 radiobarSize1'>
                { datasets }
            </div>
            {/* <div className='radiobarStyle1 radiobarSize1'>
                { directions }
            </div> */}
        </div>
    )

}


export default Control