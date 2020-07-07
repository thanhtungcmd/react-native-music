import {SongItem} from "./home.reducer.type";

export interface PlayState {
    song?: {
        id: string,
        name: string,
        link_stream: string,
        thumbnail_url: string,
        favorite: boolean,
        artist: string,
        song_time: number,
        view_count: number,
        relate_song: Array<SongItem>
    },
    song_id?: string
}
