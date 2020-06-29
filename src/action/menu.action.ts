import * as types from './menu.action.type'
import { Dispatch } from "redux"

export const toggleMenuAction = (data: boolean) => {
    return {
        type: types.TOGGLE_MENU,
        data: data
    }
}

export const setTokenAction = (data: string) => {
    return {
        type: types.SET_TOKEN,
        data: data
    }
}

export const setPhoneAction = (data: string) => {
    return {
        type: types.SET_PHONE,
        data: data
    }
}
