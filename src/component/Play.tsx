import * as React from 'react';
import {View, Text, PanResponder, Animated, SafeAreaView} from "react-native";
import {PlayState} from "../reducer/play.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as PlayAction from "../action/play.action";
import { useRoute } from '@react-navigation/native';
import {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import Video from 'react-native-video';
import {
    PlayStyle, titleSmallWidth, videoFullHeight, videoSmallHeight,
    videoSmallTop, videoSmallWidth,
    windowHeight, windowWidth,
} from "../asset/style";
import IconAntDesign from 'react-native-vector-icons/AntDesign';

IconAntDesign.loadFont();

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

    const widthTitlePlayAnim = playAnim.interpolate({
        inputRange: [-300, 0, 300, 600],
        outputRange: [windowWidth, windowWidth, titleSmallWidth, titleSmallWidth]
    });

    const widthVideoPlayAnim = playAnim.interpolate({
        inputRange: [-300, 0, 300, 600],
        outputRange: [windowWidth, windowWidth, videoSmallWidth, videoSmallWidth]
    });

    const heightVideoPlayAnim = playAnim.interpolate({
        inputRange: [-300, 0, 300, 600],
        outputRange: [videoFullHeight, videoFullHeight, videoSmallHeight, videoSmallHeight]
    });

    const heightPlayAnim = playAnim.interpolate({
        inputRange: [-300, 0, 300, 600],
        outputRange: [windowHeight, windowHeight, videoSmallHeight, videoSmallHeight]
    });

    const translateYPlayAnim = playAnim.interpolate({
        inputRange: [-300, 0, 300, 600],
        outputRange: [0, 0, videoSmallTop, videoSmallTop]
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
                <SafeAreaView>
                    <Animated.View style={[ PlayStyle.videoBox, {
                        // scaleX: scaleXPlayAnim,
                        // scaleY: scaleYPlayAnim,
                        height: heightVideoPlayAnim
                    } ]}
                    {...panResponder.panHandlers}>
                        <Animated.View style={[ PlayStyle.videoContent, {
                            width: widthVideoPlayAnim,
                            height: heightVideoPlayAnim
                        } ]}>
                            <Video style={PlayStyle.videoPlayer} source={{ uri: props.play.song.link_stream }}/>
                        </Animated.View>
                        <Animated.View style={[ PlayStyle.videoTitle, {
                            width: widthTitlePlayAnim,
                            height: heightVideoPlayAnim
                        } ]}>
                            <View style={PlayStyle.videoTitleName}>
                                <Text style={PlayStyle.videoTitleNameText}
                                      numberOfLines={1} ellipsizeMode={"tail"}>
                                    { props.play.song.name }
                                </Text>
                                <Text style={PlayStyle.videoTitleNameSub}
                                      numberOfLines={1} ellipsizeMode={"tail"}>
                                    { props.play.song.artist }
                                </Text>
                            </View>
                            <View style={PlayStyle.videoTitleButton}>
                                <IconAntDesign name={'caretright'} size={30} />
                            </View>
                        </Animated.View>
                    </Animated.View>
                </SafeAreaView>
            )
        }
    }

    return (
        <Animated.View style={[PlayStyle.playBox, {
            top: topOpenPlayAnim,
            transform: [{
                translateY: translateYPlayAnim
            }],
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
