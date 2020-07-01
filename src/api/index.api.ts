import axios from "axios"
import AsyncStorage from "@react-native-community/async-storage";

AsyncStorage.getItem('@token').then((token) => {
    console.log(token);
    if (typeof token === "string") {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    }
});

axios.interceptors.response.use( (response) =>  {
    return response;
}, (error) => {
    if (error.response.code == 401) {
        AsyncStorage.removeItem('@token');
        AsyncStorage.getItem('@msisdn');
    }
    return error;
});

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

export const ApiCategoryItem = (id: string, page: string | number) => {
    return axios.get(`https://m.ibolero.vn/category/${id}?page=${page}`);
}

export const ApiGetSinger = (page: string | number) => {
    return axios.get(`https://m.ibolero.vn/artist?page=${page}`);
}

export const ApiSingerItem = (id: string, page: string | number) => {
    return axios.get(`https://m.ibolero.vn/artist/${id}?page=${page}`);
}

export const ApiCheckLogin = () => {
    return axios.get("https://m.ibolero.vn/service/app");
}

export const ApiAutoLogin = (phone: string) => {
    return axios.post("https://m.ibolero.vn/auto-login", {
        phone: phone
    });
}

export const ApiLoginAuth = (phone: string, password: string) => {
    return axios.post("https://m.ibolero.vn/login", {
        phone: phone,
        password: password
    });
}

export const ApiInfoMe = () => {
    return axios.get("https://m.ibolero.vn/package/me");
}

export const ApiFavoriteSong = () => {
    return axios.get("https://m.ibolero.vn/song/list-favorite");
}
