import {GET_BANNER, GET_BANNER_ACTION} from "./home.action.type";

export const GET_SONG = 'GET_SONG';
export type GET_SONG = typeof GET_SONG;

export const CHANGE_SONG = 'CHANGE_SONG';
export type CHANGE_SONG = typeof CHANGE_SONG;

export interface GET_SONG_ACTION {
    type: GET_SONG,
    data: any
}

export interface CHANGE_SONG_ACTION {
    type: CHANGE_SONG,
    data: any
}

export type PLAY_ACTION = GET_SONG_ACTION
    | CHANGE_SONG_ACTION
