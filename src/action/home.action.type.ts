export const GET_BANNER = 'GET_BANNER';
export type GET_BANNER = typeof GET_BANNER;

export const GET_RANK = 'GET_RANK';
export type GET_RANK = typeof GET_RANK;

export interface GET_BANNER_ACTION {
    type: GET_BANNER,
    data: any
}

export interface GET_RANK_ACTION {
    type: GET_RANK,
    data: any
}

export type HOME_ACTION = GET_BANNER_ACTION | GET_RANK_ACTION
