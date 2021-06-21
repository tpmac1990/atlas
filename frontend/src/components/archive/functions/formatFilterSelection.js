// import React from 'react'


// The filterSelection state contains refs which cannot be converted to json. This function extracts only the necessary 
// fields to send to the backend
export const formatForCheckboxList = (name, filterSelection) => {
    const { input, related, check_list } = filterSelection     
    return {input, related, check_list_state: check_list[name]}
}
