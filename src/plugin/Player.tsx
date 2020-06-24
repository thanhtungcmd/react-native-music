import * as React from 'react';
import {View, TouchableWithoutFeedback} from "react-native";
import {useState} from "react";
import Video from "react-native-video";
import {PlayerStyle} from "../asset/style";

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

    return (
        <View style={PlayerStyle.videoBox}>
            <Video style={PlayerStyle.videoPlayer} source={{ uri: props.source }}/>
        </View>

        // <View style={PlayerStyle.videoFullScreenBox}>
        //     <Video style={PlayerStyle.videoFullScreen} source={{ uri: props.source }}/>
        // </View>
    )

}

export default Player
