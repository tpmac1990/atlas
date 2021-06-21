import { TOGGLE_FULL_SCREEN_INACTIVE } from './inactiveCoverType'

export const toggleFullScreenInactive = value => {
    return {
        type: TOGGLE_FULL_SCREEN_INACTIVE,
        payload: value
    }
}
