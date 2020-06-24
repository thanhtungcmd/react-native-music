import * as React from 'react';
import {View, TouchableWithoutFeedback, Text} from "react-native";
import {useState} from "react";
import Video, { OnProgressData, OnLoadData } from "react-native-video";
import {PlayerStyle} from "../asset/style";
import { Slider } from 'react-native-elements';
import IconMC from 'react-native-vector-icons/MaterialIcons';

IconMC.loadFont();

interface PropInterface {
    source: string
}

const Player: React.FunctionComponent<PropInterface> = props => {

    const [state, setState] = useState({
        fullscreen: false,
        play: false,
        currentTime: 0,
        duration: 0,
        showControls: true,
    });

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

    return (
        <View style={PlayerStyle.videoBox}>
            <Video style={PlayerStyle.videoPlayer} source={{ uri: props.source }}
                    onLoad={ onLoad }
                    onProgress={ onProgress }/>
            <View style={PlayerStyle.controlOverlay}>
                <View></View>
                <View style={PlayerStyle.bottomControl}>
                    <View style={PlayerStyle.sliderControl}>
                        <Slider
                            value={state.currentTime}
                            minimumValue={0}
                            maximumValue={state.duration}
                            step={1}
                            // onValueChange={handleOnSlide}
                            // onSlidingStart={onSlideStart}
                            // onSlidingComplete={onSlideComplete}
                            minimumTrackTintColor={'#F44336'}
                            maximumTrackTintColor={'#FFFFFF'}
                            thumbTintColor={'#F44336'}/>
                    </View>
                    <View style={PlayerStyle.fullscreenControl}>
                        <IconMC name="fullscreen" size={30} color={"#fff"}/>
                    </View>
                </View>
            </View>
        </View>

        // <View style={PlayerStyle.videoFullScreenBox}>
        //     <Video style={PlayerStyle.videoFullScreen} source={{ uri: props.source }}/>
        //     <View style={PlayerStyle.controlOverlayFS}>
        //         <View></View>
        //         <View style={PlayerStyle.bottomControl}>
        //             <View style={PlayerStyle.sliderControl}>
        //                 <Slider
        //                     value={state.currentTime}
        //                     minimumValue={0}
        //                     maximumValue={state.duration}
        //                     step={1}
        //                     // onValueChange={handleOnSlide}
        //                     // onSlidingStart={onSlideStart}
        //                     // onSlidingComplete={onSlideComplete}
        //                     minimumTrackTintColor={'#F44336'}
        //                     maximumTrackTintColor={'#FFFFFF'}
        //                     thumbTintColor={'#F44336'}/>
        //             </View>
        //             <View style={PlayerStyle.fullscreenControl}>
        //                 <IconMC name="fullscreen" size={30} color={"#fff"}/>
        //             </View>
        //         </View>
        //     </View>
        // </View>
    )

}

export default Player
