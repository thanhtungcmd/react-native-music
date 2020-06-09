import { MenuState } from "./menu.reducer.type";
import { MENU_ACTION } from "../action/menu.action.type";

const initState = {
    show_menu: false
}

const homeReducer = (state: MenuState = initState, action: MENU_ACTION): MenuState => {
    switch (action.type) {
        case "TOGGLE_MENU":
            return {
                ...state,
                show_menu: action.data,
            };

        default:
            return state;
    }
}

export default homeReducer
