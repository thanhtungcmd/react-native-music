import { combineReducers } from "redux"
import home from "./home.reducer"
import menu from "./menu.reducer"
import play from "./play.reducer"

const rootReducer = combineReducers({
    home: home,
    menu: menu,
    play: play
});

export default rootReducer
