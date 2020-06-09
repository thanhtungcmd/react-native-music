import * as React from 'react';
import {ImageBackground, TouchableWithoutFeedback, View} from "react-native";
import {HeaderStyle} from "../asset/style";
import {Avatar, Badge} from "react-native-elements";
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
        toggleMenuAction: any
    }
}

type PropsInterface = StatePropsInterface & DispatchPropsInterface

const mapStateToProps = (state: StateInterface) => ({
    menu: state.menu,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        toggleMenuAction: MenuAction.toggleMenuAction
    }, dispatch)
});

const Header: React.FunctionComponent<PropsInterface> = props => {

    const LeftMenu = () => {
        const clickLeft = () => {
            props.actions?.toggleMenuAction(!props.menu?.show_menu)
        }

        return (
            <TouchableWithoutFeedback onPress={ clickLeft }>
                <View>
                    <Avatar rounded source={ require('../asset/img/icon-user.png') }/>
                    <Badge status="error" value="8" containerStyle={ HeaderStyle.badge }/>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <View>
            <ImageBackground source={ require('../asset/img/header-bg.png') } style={ HeaderStyle.headerBg }>
                { LeftMenu() }
            </ImageBackground>
        </View>
    );

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Header);
