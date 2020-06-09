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

        default:
            return state;
    }
}

export default homeReducer
