import React, {useEffect} from 'react';
import {HomeState} from "../reducer/home.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as HomeAction from "../action/home.action";
import * as MenuAction from "../action/menu.action";
import {RefreshControl, SafeAreaView, ScrollView, View} from "react-native";
import {connect} from "react-redux";
import Header from "../plugin/Header";
import Menu from "../plugin/Menu";
import {useNavigation} from "@react-navigation/native";


interface StatePropsInterface {
    home?: HomeState
}

interface DispatchPropsInterface {
    actions?: {
        getRankAllAction: any
    }
}

type PropsInterface = StatePropsInterface & DispatchPropsInterface

const mapStateToProps = (state: StateInterface) => ({
    home: state.home,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        getRankAllAction: HomeAction.getRankAllAction,
    }, dispatch)
});

const Rank: React.FunctionComponent<PropsInterface> = props => {

    const [refreshing, setRefreshing] = React.useState(false);

    const navigation = useNavigation();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }, [refreshing]);

    useEffect(() => {
        props.actions?.getRankAllAction();
    }, []);

    return (
        <SafeAreaView>
            <View style={{ flex: 1 }}>
                <Header header="Bảng xếp hạng" />
                <Menu/>
            </View>
        </SafeAreaView>
    )

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Rank);
