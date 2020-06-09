export const TOGGLE_MENU = 'TOGGLE_MENU';
export type TOGGLE_MENU = typeof TOGGLE_MENU;

export interface TOGGLE_MENU_ACTION {
    type: TOGGLE_MENU,
    data: any
}

export type MENU_ACTION = TOGGLE_MENU_ACTION
