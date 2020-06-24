import * as React from 'react';
import {View, TouchableWithoutFeedback, StatusBar, BackHandler} from "react-native";
import {useRef, useState, useEffect, useCallback} from "react";
import Video, { OnProgressData, OnLoadData, OnSeekData } from "react-native-video";
import {PlayerStyle} from "../asset/style";
import { Slider } from 'react-native-elements';
import IconMC from 'react-native-vector-icons/MaterialIcons';
import Orientation from 'react-native-orientation-locker';
import {useNavigation} from "@react-navigation/native";

IconMC.loadFont();

interface PropInterface {
    source: string
}

const Player: React.FunctionComponent<PropInterface> = props => {

    const videoRef = useRef<Video>(null);

    const navigation = useNavigation();

    const [state, setState] = useState({
        fullscreen: false,
        play: false,
        currentTime: 0,
        duration: 0,
        showControls: true,
    });

    const handleBackButtonClick = useCallback(() => {
        console.log(state.fullscreen);
        return true
    }, [])

    useEffect(() => {
        Orientation.lockToPortrait();

        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    const onProgress = (data: OnProgressData) => {
        setState(value => ({
            ...value,
            currentTime: data.currentTime,
        }));
    }

    const onLoad = (data: OnLoadData) => {
        setState(value => ({
            ...value,
            duration: data.duration,
            currentTime: data.currentTime,
        }));
    }

    const onSeek = (data: OnSeekData) => {
        console.log(data.seekTime);
        // @ts-ignore
        videoRef.current.seek(data.seekTime)
        setState(value => ({
            ...value,
            currentTime: data.seekTime
        }));
    }

    const handleFullScreen = () => {
        state.fullscreen ? Orientation.lockToPortrait() : Orientation.lockToLandscapeLeft();
        setState(value => ({
            ...value,
            fullscreen: !state.fullscreen
        }));
    }

    const handleSlider = (time: number) => {
        console.log(time);
        onSeek({
            currentTime: state.currentTime,
            seekTime: time
        })
    }

    return (
        <View style={ (state.fullscreen) ? PlayerStyle.videoBoxFS : PlayerStyle.videoBox }>
            <Video style={ (state.fullscreen) ? PlayerStyle.videoPlayerFS : PlayerStyle.videoPlayer }
                ref={ videoRef }
                source={{ uri: props.source }}
                onLoad={ onLoad }
                onProgress={ onProgress } />
            <View style={ (state.fullscreen) ? PlayerStyle.controlOverlayFS : PlayerStyle.controlOverlay }>
                <View></View>
                <View style={PlayerStyle.bottomControl}>
                    <View style={PlayerStyle.sliderControl}>
                        <Slider
                            style={PlayerStyle.slider}
                            value={state.currentTime}
                            minimumValue={0}
                            maximumValue={state.duration}
                            step={1}
                            onValueChange={ handleSlider }
                            // onSlidingStart={onSlideStart}
                            // onSlidingComplete={onSlideComplete}
                            minimumTrackTintColor={'#F44336'}
                            maximumTrackTintColor={'#FFFFFF'}
                            thumbTintColor={'#F44336'}/>
                    </View>
                    <View style={PlayerStyle.fullscreenControl}>
                        <TouchableWithoutFeedback
                            onPress={ handleFullScreen }>
                            <IconMC name="fullscreen" size={30} color={"#fff"}/>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        </View>
    )

}

export default Player
