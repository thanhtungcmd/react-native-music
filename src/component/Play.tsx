import * as React from 'react';
import {View, Text, PanResponder, Animated} from "react-native";
import {PlayState} from "../reducer/play.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as PlayAction from "../action/play.action";
import { useRoute } from '@react-navigation/native';
import {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import Video from 'react-native-video';
import {
    PlayStyle, videoFullHeight, videoSmallHeight,
    videoSmallTop,
    windowHeight,
} from "../asset/style";

interface StatePropsInterface {
    play?: PlayState
}

interface DispatchPropsInterface {
    actions?: {
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

    const openPlayAnim = useRef(new Animated.Value(0)).current;

    const topOpenPlayAnim = openPlayAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [windowHeight, 0]
    });

    const playAnim = useRef(new Animated.Value(0)).current;

    const heightPlayAnim = playAnim.interpolate({
        inputRange: [-300, 0, 300, 600],
        outputRange: [windowHeight, windowHeight, videoFullHeight, videoFullHeight]
    });

    const translateYPlayAnim = playAnim.interpolate({
        inputRange: [-300, 0, 300, 600],
        outputRange: [0, 0, videoSmallTop, videoSmallTop]
    });

    const scaleXPlayAnim = playAnim.interpolate({
        inputRange: [-300, 0, 300, 600],
        outputRange: [1, 1, 0.5, 0.5]
    });

    const scaleYPlayAnim = playAnim.interpolate({
        inputRange: [-300, 0, 300, 600],
        outputRange: [1, 1, 0.5, 0.5]
    });

    useEffect(() => {
        // @ts-ignore
        if (typeof props.play?.song_id != "undefined") {
            props.actions?.getSongAction(props.play?.song_id);
            Animated.timing(openPlayAnim, {
                useNativeDriver: false,
                toValue: 1,
                duration: 300
            }).start();
        }
    }, [props.play?.song_id]);

    useEffect(() => {
         setInterval(() => {
             // @ts-ignore
             //console.log(playAnim.__getValue())
         }, 1000)
    }, []);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
            },
            onPanResponderMove: (evt, gestureState) => {
                // Play
                return Animated.event([
                    null,
                    {
                        dy: playAnim,
                    }
                ], {
                    useNativeDriver: false
                })(evt, gestureState);
            },
            onPanResponderRelease: (evt, gestureState) => {
                console.log(gestureState.moveY, gestureState.dy)
                if (gestureState.dy >= 0) {
                    if (gestureState.dy > 100) {
                        Animated.timing(playAnim, {
                            toValue: 300,
                            duration: 500,
                            useNativeDriver: false,
                        }).start(() => {
                            playAnim.setOffset(300);
                        });
                    }
                    if (gestureState.dy >= 10 && gestureState.dy < 100) {
                        Animated.timing(playAnim, {
                            toValue: 0,
                            duration: 500,
                            useNativeDriver: false,
                        }).start();
                    }
                } else if (gestureState.dy < 0) {
                    if (gestureState.dy < -10 && gestureState.dy > -100) {
                        Animated.timing(playAnim, {
                            toValue: 300,
                            duration: 500,
                            useNativeDriver: false,
                        }).start();
                    }
                    if (gestureState.dy < -100) {
                        playAnim.setOffset(-300);
                        Animated.timing(playAnim, {
                            toValue: 0,
                            duration: 500,
                            useNativeDriver: false,
                        }).start(() => {
                            playAnim.setOffset(0);
                        });
                    }
                }
            }
        })
    ).current;

    const renderVideo = () => {
        if (typeof props.play?.song != "undefined") {
            return (
                <Animated.View style={[ PlayStyle.videoBox, {
                    // scaleX: scaleXVideoAnim,
                    // scaleY: scaleYVideoAnim,
                } ]}
                {...panResponder.panHandlers}>
                    <Video style={PlayStyle.videoPlayer} source={{ uri: props.play.song.link_stream }}/>
                </Animated.View>
            )
        }
    }

    return (
        <Animated.View style={[PlayStyle.playBox, {
            top: topOpenPlayAnim,
            translateY: translateYPlayAnim,
            scaleX: scaleXPlayAnim,
            scaleY: scaleYPlayAnim,
            height: heightPlayAnim
        }]}>
            { renderVideo() }
        </Animated.View>
    )

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Play);
