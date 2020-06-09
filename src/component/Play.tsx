import * as React from 'react';
import {View, Text, PanResponder, Animated} from "react-native";
import {PlayState} from "../reducer/play.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as PlayAction from "../action/play.action";
import { useRoute } from '@react-navigation/native';
import {useEffect, useRef} from "react";
import {connect} from "react-redux";
import Video from 'react-native-video';
import {PlayStyle} from "../asset/style";

interface StatePropsInterface {
    play: PlayState
}

interface DispatchPropsInterface {
    actions: {
        getSongAction: any,
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

    const route = useRoute();

    // const videoAnim = useRef(new Animated.Value(0)).current;
    const videoAnim = useRef(new Animated.ValueXY()).current;

    useEffect(() => {
        // @ts-ignore
        props.actions.getSongAction(route.params.id);
    }, []);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                videoAnim.setOffset({
                    // @ts-ignore
                    x: videoAnim.x._value,
                    // @ts-ignore
                    y: videoAnim.y._value
                });
            },
            onPanResponderMove: (evt, gestureState) => {
                return Animated.event([
                    null,
                    {
                        dx: videoAnim.x,
                        dy: videoAnim.y
                    }
                ], {
                    useNativeDriver: false
                })(evt, gestureState);
            },
            onPanResponderRelease: (evt, gestureState) => {
                videoAnim.flattenOffset();
            }
        })
    ).current;

    const renderVideo = () => {
        if (typeof props.play.song != "undefined") {
            return (
                <Animated.View style={[ PlayStyle.videoBox, {
                    translateX: videoAnim.x,
                    translateY: videoAnim.y
                } ]}
                {...panResponder.panHandlers}>
                    <Video style={PlayStyle.videoPlayer} source={{ uri: props.play.song.link_stream }}/>
                </Animated.View>
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
