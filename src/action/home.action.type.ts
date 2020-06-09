export const GET_BANNER = 'GET_BANNER';
export type GET_BANNER = typeof GET_BANNER;

export const GET_RANK = 'GET_RANK';
export type GET_RANK = typeof GET_RANK;

export const GET_HOME = 'GET_HOME';
export type GET_HOME = typeof GET_HOME;

export const GET_SINGER = 'GET_SINGER';
export type GET_SINGER = typeof GET_SINGER;

export const CHANGE_HOME = 'CHANGE_HOME';
export type CHANGE_HOME = typeof CHANGE_HOME;

export interface GET_BANNER_ACTION {
    type: GET_BANNER,
    data: any
}

export interface GET_RANK_ACTION {
    type: GET_RANK,
    data: any
}

export interface GET_SINGER_ACTION {
    type: GET_SINGER,
    data: any
}

export interface GET_HOME_ACTION {
    type: GET_HOME,
    data: any
}

export interface CHANGE_HOME_ACTION {
    type: CHANGE_HOME,
    data: any
}

export type HOME_ACTION = GET_BANNER_ACTION
    | GET_RANK_ACTION
    | GET_HOME_ACTION
    | CHANGE_HOME_ACTION
    | GET_SINGER_ACTION
