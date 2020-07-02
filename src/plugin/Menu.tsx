import * as React from 'react';
import {useEffect, useRef, useState} from "react";
import {Alert, Animated, Image, TouchableWithoutFeedback} from "react-native";
import {
    Text, View
} from 'react-native';
import {MenuStyle} from "../asset/style";
import {MenuState} from "../reducer/menu.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {connect} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import {bindActionCreators, Dispatch} from "redux";
import * as MenuAction from "../action/menu.action";

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

const Menu: React.FunctionComponent<PropsInterface> = props => {

    const menuAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    const widthMenu = (typeof props.menu?.token != "undefined") ? 230 : 170;

    const heightMenuAnim = menuAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 270]
    })

    const widthMenuAnim = menuAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, widthMenu]
    })

    useEffect(() => {
        if (props.menu?.show_menu == true) {
            Animated.timing(menuAnim, {
                useNativeDriver: false,
                toValue: 1,
                duration: 300
            }).start();
        } else {
            Animated.timing(menuAnim, {
                useNativeDriver: false,
                toValue: 0,
                duration: 300
            }).start();
        }
    },[props.menu?.show_menu]);


    const logoutConfirm = async () => {
        await AsyncStorage.removeItem('@token')
        await AsyncStorage.removeItem('@msisdn')
        props.actions?.setTokenAction(undefined);
        props.actions?.setPhoneAction(undefined);
        props.actions?.toggleMenuAction(false);

        return Alert.alert(
            "Đăng xuất",
            "Bạn đã đăng xuất thành công",
            [
                {
                    text: "Đóng", onPress: () => {}
                }
            ],
            { cancelable: false }
        );
    }

    const handleLogout = () => {
        return Alert.alert(
            "Đăng xuất",
            "Bạn có chắc chắn muốn đóng",
            [
                {
                    text: "Đăng xuất", onPress: () => {
                        logoutConfirm()
                    },
                },
                {
                    text: "Không", onPress: () => {

                    }
                }
            ],
            { cancelable: false }
        );
    }

    const renderUser = () => {
        if (typeof props.menu?.token != "undefined") {
            return (
                <View style={[MenuStyle.menuItem, {
                    marginTop: 10
                } ]}>
                    <Image style={[MenuStyle.menuImage, {
                        width: 27,
                        marginRight: 5
                    }]} source={ require('../asset/img/icon-user.png') } />
                    <Text numberOfLines={1} style={[MenuStyle.menuTitle, {fontWeight: "bold"}]}>
                        Xin chào { props.menu.phone?.substr(0,6) }****
                    </Text>
                </View>
            )
        } else {
            return (
                <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate("Login")
                }}>
                    <View style={[MenuStyle.menuItem, {
                        marginTop: 10
                    } ]}>
                        <Image style={[MenuStyle.menuImage, {
                            width: 27,
                            marginRight: 5
                        }]} source={ require('../asset/img/icon-user.png') } />
                        <Text style={ MenuStyle.menuTitle }>Đăng nhập</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }

    const renderLogout = () => {
        if (typeof props.menu?.token != "undefined") {
            return (
                <TouchableWithoutFeedback onPress={() => {
                    handleLogout()
                }}>
                    <View style={ MenuStyle.menuItem }>
                        <Image style={[MenuStyle.menuImage, {
                            width: 32,
                            marginRight: -2
                        }]} source={ require('../asset/img/icon-logout.png') }/>
                        <Text style={ MenuStyle.menuTitle }>Đăng xuất</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }

    const renderFavorite = () => {
        if (typeof props.menu?.token != "undefined") {
            return (
                <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate("Favorite");
                }}>
                    <View style={MenuStyle.menuItem}>
                        <Image style={[MenuStyle.menuImage, {
                            width: 32,
                            marginRight: -2
                        }]} source={require('../asset/img/icon-favorite.png')}/>
                        <Text style={MenuStyle.menuTitle}>Yêu thích</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }

    return (
        <Animated.View style={[ MenuStyle.menu, {
            height: heightMenuAnim,
            width: widthMenuAnim
        } ]}>
            {/*{ menuItem }*/}
            { renderUser() }
            <View style={ MenuStyle.menuItem }>
                <Image style={ MenuStyle.menuImage } source={ require('../asset/img/icon-noti.png') }/>
                <Text style={ MenuStyle.menuTitle }>Thông báo</Text>
            </View>
            <View style={ MenuStyle.menuItem }>
                <Image style={ MenuStyle.menuImage } source={ require('../asset/img/icon-playlist.png') }/>
                <Text style={ MenuStyle.menuTitle }>Playlist</Text>
            </View>
            { renderFavorite() }
            { renderLogout() }
        </Animated.View>
    );

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Menu);
