import * as React from 'react';
import {ImageBackground, TouchableWithoutFeedback, View, Text} from "react-native";
import {HeaderStyle} from "../asset/style";
import {Avatar, Badge} from "react-native-elements";
import {MenuState} from "../reducer/menu.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as MenuAction from "../action/menu.action";
import {connect} from "react-redux";
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from "@react-navigation/native";

IconAntDesign.loadFont();

interface ComponentInterface {
    header?: string,
    back?: boolean
}

interface StatePropsInterface {
    menu?: MenuState
}

interface DispatchPropsInterface {
    actions?: {
        toggleMenuAction: any
    }
}

type PropsInterface = StatePropsInterface & DispatchPropsInterface & ComponentInterface

const mapStateToProps = (state: StateInterface) => ({
    menu: state.menu,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        toggleMenuAction: MenuAction.toggleMenuAction
    }, dispatch)
});

const Header: React.FunctionComponent<PropsInterface> = props => {

    const navigation = useNavigation();

    const LeftMenu = () => {
        const clickLeft = () => {
            props.actions?.toggleMenuAction(!props.menu?.show_menu)
        }

        const clickBack = () => {
            navigation.goBack();
        }

        if (!props.back) {
            return (
                <TouchableWithoutFeedback onPress={clickLeft}>
                    <View>
                        <Avatar rounded
                            source={
                                (typeof props.menu?.token !== "undefined")
                                    ? require('../asset/img/icon-user.png')
                                    : require('../asset/img/icon-user2.png')}/>
                        {/*<Badge status="error" value="8" containerStyle={HeaderStyle.badge}/>*/}
                    </View>
                </TouchableWithoutFeedback>
            )
        } else {
            return (
                <TouchableWithoutFeedback onPress={clickBack}>
                    <View>
                        <IconAntDesign size={30} name={'arrowleft'} color={"#fff"} />
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }

    const CenterMenu = () => {
        let header = (typeof props.header != "undefined") ? (
            <Text style={HeaderStyle.headerText}>{ props.header }</Text>
        ) : null;
        return (
            <View style={{ alignItems: "center", justifyContent: "center" }}>{header}</View>
        )
    }

    return (
        <View>
            <ImageBackground source={ require('../asset/img/header-bg.png') } style={ HeaderStyle.headerBg }>
                { LeftMenu() }
                { CenterMenu() }
                <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate("Search");
                }}>
                    <View>
                        <IconAntDesign size={30} name={'search1'} color={"#fff"} />
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </View>
    );

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Header);
