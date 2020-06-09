import { HomeState } from "./home.reducer.type";
import { MenuState } from "./menu.reducer.type";

export default interface StateInterface {
    home: HomeState,
    menu: MenuState,
}
