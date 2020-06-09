import { combineReducers } from "redux"
import home from "./home.reducer"
import menu from "./menu.reducer"

const rootReducer = combineReducers({
    home: home,
    menu: menu,
});

export default rootReducer
