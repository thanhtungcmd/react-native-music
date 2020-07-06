import axios from "axios"
import AsyncStorage from "@react-native-community/async-storage";

AsyncStorage.getItem('@token').then((token) => {
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
        AsyncStorage.removeItem('@msisdn');
    }
    return error;
});

const checkTokenKey = async () => {
    let token = await AsyncStorage.getItem('@token');
    if (typeof token === "string") {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
        axios.defaults.headers.common['Authorization'] = null;
    }
}

export const ApiHomeBanner = async () => {
    await checkTokenKey()
    return axios.get("https://m.ibolero.vn/info/banner");
}

export const ApiHomeRank = async () => {
    await checkTokenKey()
    return axios.get("https://m.ibolero.vn/info/rank");
}

export const ApiHomeAll = async () => {
    await checkTokenKey()
    return axios.get("https://m.ibolero.vn/info/home");
}

export const ApiHomeSinger = async () => {
    await checkTokenKey()
    return axios.get("https://m.ibolero.vn/info/artist");
}

export const ApiPlaySong = async (id: string) => {
    await checkTokenKey()
    return axios.get("https://m.ibolero.vn/song/"+ id +"?type=nm");
}

export const ApiGetRankAll = async () => {
    await checkTokenKey()
    return axios.get("https://m.ibolero.vn/rank");
}

export const ApiGetCategory = async () => {
    await checkTokenKey()
    return axios.get("https://m.ibolero.vn/categories");
}

export const ApiCategoryItem = async (id: string, page: string | number) => {
    await checkTokenKey()
    return axios.get(`https://m.ibolero.vn/category/${id}?page=${page}`);
}

export const ApiGetSinger = async (page: string | number) => {
    await checkTokenKey()
    return axios.get(`https://m.ibolero.vn/artist?page=${page}`);
}

export const ApiSingerItem = async (id: string, page: string | number) => {
    await checkTokenKey()
    return axios.get(`https://m.ibolero.vn/artist/${id}?page=${page}`);
}

export const ApiCheckLogin = async () => {
    await checkTokenKey()
    return axios.get("http://m.ibolero.vn/service/app");
}

export const ApiAutoLogin = async (phone: string) => {
    await checkTokenKey()
    return axios.post("https://m.ibolero.vn/auto-login", {
        phone: phone
    });
}

export const ApiLoginAuth = async (phone: string, password: string) => {
    await checkTokenKey()
    return axios.post("https://m.ibolero.vn/login", {
        phone: phone,
        password: password
    });
}

export const ApiInfoMe = async () => {
    await checkTokenKey()
    return axios.get("https://m.ibolero.vn/package/me");
}

export const ApiFavoriteSong = async (page: string | number) => {
    await checkTokenKey()
    return axios.get(`https://m.ibolero.vn/song/list-favorite?page=${page}`);
}

export const ApiSearchData = async (query: string) => {
    await checkTokenKey()
    return axios.post("http://m.ibolero.vn/search", {
        query: query
    })
}
