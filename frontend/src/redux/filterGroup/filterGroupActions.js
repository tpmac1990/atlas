import { PRIMARY_GROUP_OPEN, PRIMARY_GROUP_CLOSE, SECONDARY_GROUP_OPEN, SECONDARY_GROUP_CLOSE, RESET_FILTER_GROUP, CLOSE_ALL_GROUPS } from './filterGroupType'

// manages the opening and closing of filter groups on button click

export const openPrimary = name => {
    return {
        type: PRIMARY_GROUP_OPEN,
        payload: name
    }
}

export const closePrimary = name => {
    return {
        type: PRIMARY_GROUP_CLOSE,
        payload: name
    }
}

export const openSecondary = name => {
    return {
        type: SECONDARY_GROUP_OPEN,
        payload: name
    }
}

export const closeSecondary = name => {
    return {
        type: SECONDARY_GROUP_CLOSE,
        payload: name
    }
}

export const resetFilterGroupState = () => {
    return {
        type: RESET_FILTER_GROUP,
        payload: ''
    }
}

export const closeAllGroups = () => {
    return {
        type: CLOSE_ALL_GROUPS
    }
}
