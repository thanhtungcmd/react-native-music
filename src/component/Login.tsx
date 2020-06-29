import * as React from 'react';
import {Image, ImageBackground, SafeAreaView, Text, View, ScrollView, TouchableNativeFeedback} from "react-native";
import {HeaderStyle, LoginStyle, MenuStyle, RankStyle} from "../asset/style";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { Input } from 'react-native-elements';

const Login: React.FunctionComponent = props => {

    return (
        <SafeAreaView>
            <ScrollView>
                <ImageBackground source={ require('../asset/img/login-bg.png') } style={ RankStyle.homeBg }>
                    <View style={ HeaderStyle.headerBg }>
                        <View>
                            <IconAntDesign size={30} name={'arrowleft'} color={"#fff"} />
                        </View>
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
                            />
                            <Input
                                inputStyle={{ color: "#fff", textAlign: "center" }}
                                placeholder='Mật khẩu'
                                placeholderTextColor="#fff"
                                secureTextEntry={true}
                            />
                            <TouchableNativeFeedback>
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

export default Login
