import * as types from './home.action.type'
import { Dispatch } from "redux"
import {ApiHomeBanner, ApiHomeRank, ApiHomeAll, ApiHomeSinger} from "../api/index.api"

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

export const getHomeAllAction = () => {
    return async (dispatch: Dispatch) => {
        let response = await ApiHomeAll();
        if (response.status == 200) {
            dispatch(
                getHomeAllSuccess(response.data)
            )
        }
    }
}

export const getHomeAllSuccess = (data: any) => {
    return {
        type: types.GET_HOME,
        data: data.data
    }
}

export const changeHomeAction = (data: any) => {
    return {
        type: types.CHANGE_HOME,
        data: data
    }
}

export const getHomeSingerAction = () => {
    return async (dispatch: Dispatch) => {
        let response = await ApiHomeSinger();
        if (response.status == 200) {
            dispatch(
                getHomeSingerSuccess(response.data)
            )
        }
    }
}

export const getHomeSingerSuccess = (data: any) => {
    return {
        type: types.GET_SINGER,
        data: data.data
    }
}
