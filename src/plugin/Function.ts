import {ApiAutoLogin, ApiCheckLogin} from "../api/index.api";
import AsyncStorage from "@react-native-community/async-storage";

export const checkLogin3G = async () => {
    let checkLoginResponse = await ApiCheckLogin();
    console.log(checkLoginResponse.data);
    if (checkLoginResponse.status == 200 && checkLoginResponse.data != "") {
        let phone = checkLoginResponse.data;
        let response = await ApiAutoLogin(phone);
        if (response.status == 200) {
            await AsyncStorage.setItem('@token', response.data.data.token);
            await AsyncStorage.setItem('@msisdn', response.data.data.data.phone);
        }
    }
}
