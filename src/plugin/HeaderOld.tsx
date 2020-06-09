import * as React from 'react';
import {useRef, useState} from "react";
import {Animated, Image, TouchableWithoutFeedback} from "react-native";
import { Header, Avatar, Badge } from 'react-native-elements';
import {
    Text, View
} from 'react-native';
import { HeaderStyle } from "../asset/style";

const HeaderPlugin: React.FunctionComponent = props => {

    const [menuShow, setMenuShow] = useState(0);

    const menuAnim = useRef(new Animated.Value(0)).current;

    const heightMenuAnim = menuAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 270]
    })

    const widthMenuAnim = menuAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 170]
    })

    const toogleMenu = () => {
        if (menuShow == 0) {
            showMenu();
            setMenuShow(1);
        } else {
            hideMenu();
            setMenuShow(0);
        }
    }

    const showMenu = () => {
        Animated.timing(menuAnim, {
            useNativeDriver: false,
            toValue: 1,
            duration: 500
        }).start();
    };

    const hideMenu = () => {
        Animated.timing(menuAnim, {
            useNativeDriver: false,
            toValue: 0,
            duration: 500
        }).start();
    };

    // const renderMenu = () => {
    //     return (
    //         <Animated.View style={[ HeaderStyle.menu, {
    //             height: heightMenuAnim,
    //             width: widthMenuAnim
    //         } ]}>
    //             {/*{ menuItem }*/}
    //             <View style={[HeaderStyle.menuItem, {
    //                 marginTop: 10
    //             } ]}>
    //                 <Image style={[HeaderStyle.menuImage, {
    //                     width: 27,
    //                     marginRight: 5
    //                 }]} source={ require('../asset/img/icon-user.png') } />
    //                 <Text style={ HeaderStyle.menuTitle }>Đăng nhập</Text>
    //             </View>
    //             <View style={ HeaderStyle.menuItem }>
    //                 <Image style={ HeaderStyle.menuImage } source={ require('../asset/img/icon-noti.png') }/>
    //                 <Text style={ HeaderStyle.menuTitle }>Thông báo</Text>
    //             </View>
    //             <View style={ HeaderStyle.menuItem }>
    //                 <Image style={ HeaderStyle.menuImage } source={ require('../asset/img/icon-playlist.png') }/>
    //                 <Text style={ HeaderStyle.menuTitle }>Playlist</Text>
    //             </View>
    //             <View style={ HeaderStyle.menuItem }>
    //                 <Image style={[HeaderStyle.menuImage, {
    //                     width: 32,
    //                     marginRight: -2
    //                 }]} source={ require('../asset/img/icon-favorite.png') }/>
    //                 <Text style={ HeaderStyle.menuTitle }>Yêu thích</Text>
    //             </View>
    //             <View style={ HeaderStyle.menuItem }>
    //                 <Image style={[HeaderStyle.menuImage, {
    //                     width: 32,
    //                     marginRight: -2
    //                 }]} source={ require('../asset/img/icon-logout.png') }/>
    //                 <Text style={ HeaderStyle.menuTitle }>Đăng xuất</Text>
    //             </View>
    //         </Animated.View>
    //     )
    // }

    const LeftMenu = () => {
        return (
            <TouchableWithoutFeedback onPress={ toogleMenu }>
                <View>
                    <Avatar rounded source={ require('../asset/img/icon-user.png') }/>
                    <Badge status="error" value="8" containerStyle={ HeaderStyle.badge }/>
                    {/*{ renderMenu() }*/}
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const RightMenu = () => {
        return (
            <Text>123</Text>
        )
    }

    return(
        <Header //containerStyle={ HeaderStyle.headerBox }
                // backgroundImage={ require('../asset/img/header-bg.png') }
                // backgroundImageStyle={ HeaderStyle.menuBg }
                leftComponent={ <LeftMenu/> }
                rightComponent={ <RightMenu/> } />
    )

}

export default HeaderPlugin
