import { HomeState } from "./home.reducer.type"
import { HOME_ACTION } from "../action/home.action.type";

const homeReducer = (state: HomeState = {}, action: HOME_ACTION): HomeState => {
    switch (action.type) {
        case "GET_BANNER":
            return {
                ...state,
                banner: action.data,
            };

        case "GET_RANK":
            return {
                ...state,
                rank: action.data
            }

        case "GET_SINGER":
            return {
                ...state,
                singer: action.data
            }

        case "GET_HOME":
            return {
                ...state,
                home: action.data
            }

        case "CHANGE_HOME":
            return {
                ...state,
                home_active: action.data
            }

        default:
            return state;
    }
}

export default homeReducer
