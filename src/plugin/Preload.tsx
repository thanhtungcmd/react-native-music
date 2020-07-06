import React, {useEffect} from 'react';
import {ApiAutoLogin, ApiCheckLogin, ApiFavoriteSong, ApiInfoMe} from "../api/index.api";
import AsyncStorage from "@react-native-community/async-storage";
import {MenuState} from "../reducer/menu.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as MenuAction from "../action/menu.action";
import {connect} from "react-redux";

interface StatePropsInterface {
    menu?: MenuState
}

interface DispatchPropsInterface {
    actions?: {
        setTokenAction: any,
        setPhoneAction: any,
        toggleMenuAction: any
    }
}

type PropsInterface = StatePropsInterface & DispatchPropsInterface

const mapStateToProps = (state: StateInterface) => ({
    menu: state.menu,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        setTokenAction: MenuAction.setTokenAction,
        setPhoneAction: MenuAction.setPhoneAction,
        toggleMenuAction: MenuAction.toggleMenuAction
    }, dispatch)
});

const Preload: React.FunctionComponent<PropsInterface> = props => {

    useEffect(() => {
        checkStore();
    }, [])

    const checkLogin3G = async () => {
        let checkLoginResponse = await ApiCheckLogin();
        console.log(123);
        console.log(checkLoginResponse.data, checkLoginResponse.status);
        if (checkLoginResponse.status == 200 && checkLoginResponse.data != "") {
            let phone = checkLoginResponse.data;
            console.log(phone);
            let response = await ApiAutoLogin(phone);
            if (response.status == 200) {
                await AsyncStorage.setItem('@token', response.data.data.token);
                await AsyncStorage.setItem('@msisdn', response.data.data.data.phone);
            }
        }
    }

    const checkStore = async () => {
        const token = await AsyncStorage.getItem('@token');
        const phone = await AsyncStorage.getItem('@msisdn');
        console.log("Token: " + token);
        console.log("phone: " + phone);
        if (token === null && phone === null) {
            console.log(123);
            let checkLoginResponse = await ApiCheckLogin();
            console.log(checkLoginResponse.data, checkLoginResponse.status);
        } else {
            console.log(456);
            props.actions?.setPhoneAction(phone);
            props.actions?.setTokenAction(token);
        }
    }

    return null;
}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Preload);
