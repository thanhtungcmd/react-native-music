import * as React from 'react';
import {MenuState} from "../reducer/menu.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as MenuAction from "../action/menu.action";
import {connect} from "react-redux";
import {TouchableWithoutFeedback, View} from "react-native";
import {OverlayStyle} from "../asset/style";

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

const Overlay: React.FunctionComponent<PropsInterface> = props => {

    return (
        <TouchableWithoutFeedback onPress={() => {
            props.actions?.toggleMenuAction(false)
        }}>
            <View style={ props.menu?.show_menu ? OverlayStyle.overlayBox : OverlayStyle.overlayHide}/>
        </TouchableWithoutFeedback>
    )

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Overlay);
