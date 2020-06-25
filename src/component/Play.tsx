import * as React from 'react';
import {View, Text, PanResponder, Animated, SafeAreaView} from "react-native";
import {PlayState} from "../reducer/play.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as PlayAction from "../action/play.action";
import {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Player from "../plugin/Player"
import {useNavigation, useRoute} from '@react-navigation/native';

IconAntDesign.loadFont();

interface StatePropsInterface {
    play?: PlayState
}

interface DispatchPropsInterface {
    actions?: {
        getSongAction: any,
    }
}

interface RouteInterface {
    key: string,
    name: string,
    params: {
        song_id: string
    }
}

type PropsInterface = StatePropsInterface & DispatchPropsInterface

const mapStateToProps = (state: StateInterface) => ({
    play: state.play,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        getSongAction: PlayAction.getSongAction,
    }, dispatch)
});

const Play: React.FunctionComponent<PropsInterface> = props => {

    const route = useRoute<RouteInterface>();

    const navigation = useNavigation();

    useEffect(() => {
        props.actions?.getSongAction(route.params.song_id);
    }, []);

    useEffect(() => {
    }, [props.play]);

    const renderVideo = () => {
        if (typeof props.play?.song != "undefined") {
            return (
                <SafeAreaView>
                    <Player source={ props.play.song.link_stream } navigation={ navigation }/>
                </SafeAreaView>
            )
        }
    }

    return (
        <View>
            { renderVideo() }
        </View>
    )

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Play);
