import {SongItem} from "./home.reducer.type";

export interface PlayState {
    song?: {
        id: string,
        name: string,
        link_stream: string,
        link_stream_360: string,
        link_stream_480: string,
        link_stream_720: string,
        link_stream_1080: string,
        thumbnail_url: string,
        favorite: boolean,
        artist: string,
        song_time: number,
        view_count: number,
        relate_song: Array<SongItem>,
        slug: string,
        link_download: string
    },
    song_id?: string
}
