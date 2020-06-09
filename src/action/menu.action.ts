import * as types from './menu.action.type'
import { Dispatch } from "redux"

export const toggleMenuAction = (data: boolean) => {
    return {
        type: types.TOGGLE_MENU,
        data: data
    }
}
