import {GET_BANNER, GET_BANNER_ACTION} from "./home.action.type";

export const GET_SONG = 'GET_SONG';
export type GET_SONG = typeof GET_SONG;

export interface GET_SONG_ACTION {
    type: GET_SONG,
    data: any
}

export type PLAY_ACTION = GET_SONG_ACTION
