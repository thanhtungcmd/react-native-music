import * as React from 'react';
import {PlayerStyle} from "../asset/style";
import {View} from "react-native";
import Video from "react-native-video";

interface PropInterface {
    source: string,
    navigation: any
}

class Player extends React.Component<PropInterface, {}> {

    render() {
        return (
            <View style={ PlayerStyle.videoBox }>
                <Video
                    key={1}
                    source={{ uri: this.props.source }}
                    style={PlayerStyle.videoPlayer}
                    ignoreSilentSwitch={"ignore"}
                    controls={true}
                />
            </View>
        );
    }

}

export default Player

