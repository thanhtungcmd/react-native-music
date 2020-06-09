import axios from "axios"

export const ApiHomeBanner = () => {
    return axios.get("https://m.ibolero.vn/info/banner");
}

export const ApiHomeRank = () => {
    return axios.get("https://m.ibolero.vn/info/rank");
}
