import * as types from './play.action.type'
import { Dispatch } from "redux"
import {ApiPlaySong} from "../api/index.api"

export const getSongAction = (id: string) => {
    return async (dispatch: Dispatch) => {
        let response = await ApiPlaySong(id);
        if (response.status == 200) {
            dispatch(
                getSongSuccess(response.data)
            )
        }
    }
}

export const getSongSuccess = (data: any) => {
    return {
        type: types.GET_SONG,
        data: data.data
    }
}
