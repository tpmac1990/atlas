import { STORE_EDIT_HANDLER } from './leafletDrawType'

export const storeEditHandlers = handler => {
    return {
        type: STORE_EDIT_HANDLER,
        payload: handler
    }
}
