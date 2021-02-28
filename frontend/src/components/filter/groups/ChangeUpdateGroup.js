import React, { Fragment } from 'react'
import CheckboxListEdit from '../elements/CheckboxListEdit'
import GroupButton from '../elements/GroupButton'
import BetweenDates from '../elements/BetweenDates'
import { useSelector } from 'react-redux'

export default function UpdateGroup() {

    const { areaStyle } = useSelector(state => state.filterGroup.groups['changeupdate'])
    
    // provides a display name for the change types that are stored in the db. TenementChange and OccurrenceChange are the two relevant tables.
    const dict = {'lodgedateval':'Lodge Date','startdateval':'Start Date','enddateval':'End Date',
            'holderval_id':'Holder','ind_id':'Index','majmatval_id':'Major Material',
            'minmatval_id':'Minor Material','oidval_id':'Original ID','statusval_id':'Status','typeval_id':'Type',
            'nameval_id':'Name'}  

    return (
        <Fragment>
            <GroupButton name='changeupdate' />
            <div className={areaStyle}>
                <GroupButton name='changedate' />
                <BetweenDates name='change' />
                <GroupButton name='changegroup' />
                <CheckboxListEdit name='changegroup' dict={dict} />
            </div>
        </Fragment>
    )
}
