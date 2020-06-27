import axios from "axios"

export const ApiHomeBanner = () => {
    return axios.get("https://m.ibolero.vn/info/banner");
}

export const ApiHomeRank = () => {
    return axios.get("https://m.ibolero.vn/info/rank");
}

export const ApiHomeAll = () => {
    return axios.get("https://m.ibolero.vn/info/home");
}

export const ApiHomeSinger = () => {
    return axios.get("https://m.ibolero.vn/info/artist");
}

export const ApiPlaySong = (id: string) => {
    return axios.get("https://m.ibolero.vn/song/"+ id +"?type=nm");
}

export const ApiGetRankAll = () => {
    return axios.get("https://m.ibolero.vn/rank");
}

export const ApiGetCategory = () => {
    return axios.get("https://m.ibolero.vn/categories");
}
