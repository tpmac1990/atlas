import React, { Fragment } from 'react'
import CheckboxList from '../elements/CheckboxList'
import GroupButton from '../elements/GroupButton'
import BetweenDates from '../elements/BetweenDates'
import { useSelector } from 'react-redux'

export default function UpdateGroup() {

    const { areaStyle } = useSelector(state => state.filterGroup.groups['changeupdate'])
    
    // provides a display name for the change types that are stored in the db. TenementChange and OccurrenceChange are the two relevant tables.
    const dict = {'lodgedateval':'Lodge Date','startdateval':'Start Date','enddateval':'End Date',
            'holderval':'Holder','majmatval':'Major Material',
            'minmatval':'Minor Material','oidval':"Related ID's",'statusval':'Status','typeval':'Type',
            'nameval':'Name','geoprovinceval':'Geological Province','holderperc':'Holder Percentage','sizeval':'Size'}  

    return (
        <Fragment>
            <GroupButton name='changeupdate' />
            <div className={areaStyle}>
                <GroupButton name='changedate' />
                <BetweenDates name='change' title='Changes Dates' />
                <GroupButton name='changegroup' />
                <CheckboxList name='changegroup' dict={dict} />
            </div>
        </Fragment>
    )
}
