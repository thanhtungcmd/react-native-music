import React, {useEffect} from 'react';
import {ApiAutoLogin, ApiCheckLogin, ApiFavoriteSong, ApiInfoMe} from "../api/index.api";
import AsyncStorage from "@react-native-community/async-storage";
import {MenuState} from "../reducer/menu.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as MenuAction from "../action/menu.action";
import {connect} from "react-redux";
import {WebView} from "react-native-webview";

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
    }, []);

    const checkLogin3G = async (phone: any) => {
        if (phone != "") {
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
        if (token !== null && phone !== null) {
            props.actions?.setPhoneAction(phone);
            props.actions?.setTokenAction(token);
        }
    }

    return (
        <WebView
            source={{ uri: 'http://m.ibolero.vn/service/app' }}
            onMessage={ (event: any) => {
                checkLogin3G(event.nativeEvent.data);
            }}
            style={{ marginTop: 0, width: 0, height: 0 }}
        />
    );
}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Preload);
