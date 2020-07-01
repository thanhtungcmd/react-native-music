import * as React from 'react';
import {Image, ImageBackground, SafeAreaView,
    Text, View, ScrollView, TouchableNativeFeedback,
    TouchableWithoutFeedback, Alert} from "react-native";
import {HeaderStyle, LoginStyle, MenuStyle, RankStyle} from "../asset/style";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { Input } from 'react-native-elements';
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {ApiLoginAuth} from "../api/index.api";
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

const Login: React.FunctionComponent<PropsInterface> = props => {

    const navigation = useNavigation();
    const [username, setUsername] = useState("0906228870");
    const [password, setPassword] = useState("652099");

    useEffect(() => {
        props.actions?.toggleMenuAction(false)
    }, [])

    const handleLogin = async () => {
        if (username.length > 0 && password.length > 0) {
            let response = await ApiLoginAuth(username, password)
            if (response.status == 200) {
                await AsyncStorage.setItem('@token', response.data.data.token);
                await AsyncStorage.setItem('@msisdn', response.data.data.data.phone);
                props.actions?.setTokenAction(response.data.data.token);
                props.actions?.setPhoneAction(response.data.data.data.phone);
                return Alert.alert(
                    "Đăng nhập thành công",
                    "Bạn đã đăng nhập thành công dịch vụ",
                    [
                        {
                            text: "Đóng", onPress: () => {
                                navigation.goBack()
                            }
                        }
                    ],
                    { cancelable: false }
                );
            }
        }

        Alert.alert(
            "Đăng nhập thất bại",
            "Nội dung bạn nhập chưa chính xác!",
            [
                {
                    text: "Đóng", onPress: () => {}
                }
            ],
            { cancelable: false }
        );
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <ImageBackground source={ require('../asset/img/login-bg.png') } style={ RankStyle.homeBg }>
                    <View style={ HeaderStyle.headerBg }>
                        <TouchableWithoutFeedback onPress={() => {
                            navigation.goBack()
                        }}>
                            <View>
                                <IconAntDesign size={30} name={'arrowleft'} color={"#fff"} />
                            </View>
                        </TouchableWithoutFeedback>
                        <View>
                            <Text style={HeaderStyle.headerText}>{ "Đăng nhập" }</Text>
                        </View>
                        <View style={{ width: 30 }}/>
                    </View>
                    <View style={LoginStyle.loginBox}>
                        <View style={LoginStyle.loginForm}>
                            <Image style={LoginStyle.logoImg} source={ require('../asset/img/logo.png') } />
                            <Input
                                inputStyle={{ color: "#fff", textAlign: "center" }}
                                placeholder='Tên đăng nhập'
                                placeholderTextColor="#fff"
                                value={"0906228870"}
                                onChangeText={ text => setUsername(text) }
                            />
                            <Input
                                inputStyle={{ color: "#fff", textAlign: "center" }}
                                placeholder='Mật khẩu'
                                placeholderTextColor="#fff"
                                secureTextEntry={true}
                                value={"652099"}
                                onChangeText={ text => setPassword(text) }
                            />
                            <TouchableNativeFeedback onPress={() => {
                                handleLogin()
                            }}>
                                <View style={LoginStyle.loginBtn}>
                                    <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 16 }}>
                                        Đăng nhập
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>
                            <View style={LoginStyle.subBox}>
                                <View style={{ width: "50%" }}>
                                    <Text style={{ color: "#fff", textAlign: "left" }}>
                                        Đăng ký tài khoản
                                    </Text>
                                </View>
                                <View style={{ width: "50%", alignItems: "flex-end" }}>
                                    <Text style={{ color: "#fff" }}>
                                        Quên mật khẩu
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    );

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Login);
