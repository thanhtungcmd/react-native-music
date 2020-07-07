import { PlayState } from "./play.reducer.type"
import { PLAY_ACTION } from "../action/play.action.type";

const playReducer = (state: PlayState = {}, action: PLAY_ACTION): PlayState => {
    switch (action.type) {
        case "GET_SONG":
            return {
                ...state,
                song: action.data,
            };

        case "CHANGE_SONG":
            return {
                ...state,
                song_id: action.data,
            };

        case "TOGGLE_FAVORITE":
            if (typeof state.song != "undefined") {
                return {
                    ...state,
                    song: {
                        ...state.song,
                        favorite: action.data
                    }
                }
            }

        default:
            return state;
    }
}

export default playReducer
