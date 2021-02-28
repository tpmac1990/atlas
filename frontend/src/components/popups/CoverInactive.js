import React from 'react'
import { useSelector } from 'react-redux'

// places a semi transparent layer over the page to prevent the user from interacting with the page.
export const CoverInactive = () => {

    const { is_active } = useSelector(state => state.inactiveCover)

    const styles = is_active ? 'inactive-pg showEle' : 'hideEle'

    return <div className={ styles }></div>
}
