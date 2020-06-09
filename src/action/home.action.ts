import * as types from './home.action.type'
import { Dispatch } from "redux"
import { ApiHomeBanner, ApiHomeRank } from "../api/index.api"

export const getHomeBannerAction = () => {
    return async (dispatch: Dispatch) => {
        let response = await ApiHomeBanner();
        if (response.status == 200) {
            dispatch(
                getHomeBannerSuccess(response.data)
            )
        }
    }
}

export const getHomeBannerSuccess = (data: any) => {
    return {
        type: types.GET_BANNER,
        data: data.data
    }
}

export const getHomeRankAction = () => {
    return async (dispatch: Dispatch) => {
        let response = await ApiHomeRank();
        if (response.status == 200) {
            dispatch(
                getHomeRankSuccess(response.data)
            )
        }
    }
}

export const getHomeRankSuccess = (data: any) => {
    return {
        type: types.GET_RANK,
        data: data.data
    }
}
