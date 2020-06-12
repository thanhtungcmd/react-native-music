import * as React from 'react';
import {View, TouchableWithoutFeedback} from "react-native";
import {useState} from "react";
import Video from "react-native-video";

interface PropInterface {
    link: string
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
        <View>
            <TouchableWithoutFeedback>
                <View>
                    <Video source={{ uri: props.link }}/>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )

}
