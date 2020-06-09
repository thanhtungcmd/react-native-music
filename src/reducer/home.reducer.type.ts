export interface HomeState {
    banner?: Array<BannerItem>,
    rank?: Array<SongItem>,
    home?: Array<HomeItem>,
    home_active?: Array<SongItem>,
}

export interface HomeItem {
    id: string,
    list: Array<SongItem>,
    name: string,
    slug: string,
}

export interface BannerItem {
    id: string,
    description: string,
    name_ansii: string,
    slug: string,
    thumbnail_url: string
}

export interface SongItem {
    id: string,
    name: string,
    artist: string,
    name_ansii: string,
    slug: string,
    description: string,
    thumbnail_url: string,
    time: string
}
