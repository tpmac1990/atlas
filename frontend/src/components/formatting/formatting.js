

// slices the text in the popups so no line exceeds the width of the popup box.
export const slicePopupInfo = item => {
    const jitem = typeof item === 'object' ? item.join(', ') : item
    return jitem.length > 30 ? jitem.slice(0,33) + '...' : jitem
}


// dates with a year of 2999 are irrelevant.
export const formatDate = date => {
    const sDate = date.split('-')
    return sDate[0] == '2999' ? '' : `${sDate[2]}-${sDate[1]}-${sDate[0]}`
}