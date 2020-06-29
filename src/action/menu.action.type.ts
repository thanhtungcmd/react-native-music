export const TOGGLE_MENU = 'TOGGLE_MENU';
export type TOGGLE_MENU = typeof TOGGLE_MENU;

export const SET_TOKEN = 'SET_TOKEN';
export type SET_TOKEN = typeof SET_TOKEN;

export const SET_PHONE = 'SET_PHONE';
export type SET_PHONE = typeof SET_PHONE;

export interface TOGGLE_MENU_ACTION {
    type: TOGGLE_MENU,
    data: any
}

export interface SET_TOKEN_ACTION {
    type: SET_TOKEN,
    data: string
}

export interface SET_PHONE_ACTION {
    type: SET_PHONE,
    data: string
}

export type MENU_ACTION = TOGGLE_MENU_ACTION
    | SET_TOKEN_ACTION
    | SET_PHONE_ACTION
