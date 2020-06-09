import { HomeState } from "./home.reducer.type";
import { MenuState } from "./menu.reducer.type";
import { PlayState } from "./play.reducer.type";

export default interface StateInterface {
    home: HomeState,
    menu: MenuState,
    play: PlayState,
}
