import * as React from 'react';
import {View, TouchableWithoutFeedback, StatusBar, BackHandler} from "react-native";
import Video, { OnProgressData, OnLoadData, OnSeekData } from "react-native-video";
import {PlayerStyle} from "../asset/style";
import { Slider } from 'react-native-elements';
import IconMC from 'react-native-vector-icons/MaterialIcons';
import Orientation from 'react-native-orientation-locker';

IconMC.loadFont();

interface PropInterface {
    source: string,
    navigation: any
}

interface StateInterface {
    fullscreen: boolean,
    play: boolean,
    currentTime: number,
    duration: number,
    showControls: boolean,
}

class Player extends React.Component<PropInterface, StateInterface> {

    private videoRef: React.RefObject<Video>;
    private controlTimeOut: any;

    constructor(props: any) {
        super(props);
        this.videoRef = React.createRef<Video>();
        this.state = {
            fullscreen: false,
            play: true,
            currentTime: 0,
            duration: 0,
            showControls: true,
        }
    }

    componentDidMount() {
        this.execShowControl();
        BackHandler.addEventListener("hardwareBackPress", this.handleBackButtonClick.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackButtonClick.bind(this));
    }

    handleBackButtonClick() {
        if (this.state.fullscreen) {
            Orientation.lockToPortrait();
            this.setState({
                fullscreen: false
            })
        } else {
            this.props.navigation.goBack();
        }

        return true
    }

    onProgress(data: OnProgressData) {
        this.setState({
            currentTime: data.currentTime,
        });
    }

    onLoad(data: OnLoadData) {
        this.setState({
            duration: data.duration,
            currentTime: data.currentTime,
        });
    }

    onSeek(data: OnSeekData) {
        // @ts-ignore
        this.videoRef.current.seek(data.seekTime)
        this.setState({
            currentTime: data.seekTime
        });
    }

    handleFullScreen() {
        this.state.fullscreen ? Orientation.lockToPortrait() : Orientation.lockToLandscapeLeft();
        this.setState({
            fullscreen: !this.state.fullscreen
        });
        this.execShowControl();
    }

    handlePlayPause() {
        this.setState({
            play: !this.state.play
        })
        this.execShowControl();
    }

    execShowControl() {
        console.log(1);
        if (typeof this.controlTimeOut === "object") {
            this.controlTimeOut.clearInterval();
        }
        this.controlTimeOut = setTimeout(() => {
            this.setState({
                showControls: false
            });
        }, 3000)
    }

    handleSlider(time: number) {
        this.onSeek({
            currentTime: this.state.currentTime,
            seekTime: time
        })
        this.execShowControl();
    }

    handleShowControl() {
        this.setState({
            showControls: true
        })
        this.execShowControl();
    }

    renderControlCenter() {
        let iconPlay;
        if (!this.state.play) {
            iconPlay = (<IconMC name="play-arrow" size={50} color={"#fff"}/>)
        } else {
            iconPlay = (<IconMC name="pause" size={50} color={"#fff"}/>)
        }

        return (
            <View style={PlayerStyle.controlCenter}>
                <TouchableWithoutFeedback
                    onPress={ this.handlePlayPause.bind(this) }>
                    { iconPlay }
                </TouchableWithoutFeedback>
            </View>
        )
    }

    renderControl() {
        if (this.state.showControls) {
            return (
                <View style={(this.state.fullscreen) ? PlayerStyle.controlOverlayFS : PlayerStyle.controlOverlay}>
                    <View>
                        <IconMC name="arrow-back" size={30} color={"#fff"}/>
                    </View>
                    {this.renderControlCenter()}
                    <View style={PlayerStyle.bottomControl}>
                        <View style={PlayerStyle.sliderControl}>
                            <Slider
                                style={PlayerStyle.slider}
                                value={this.state.currentTime}
                                minimumValue={0}
                                maximumValue={this.state.duration}
                                step={1}
                                onValueChange={this.handleSlider.bind(this)}
                                minimumTrackTintColor={'#F44336'}
                                maximumTrackTintColor={'#FFFFFF'}
                                thumbTintColor={'#F44336'}/>
                        </View>
                        <View style={PlayerStyle.fullscreenControl}>
                            <TouchableWithoutFeedback
                                onPress={this.handleFullScreen.bind(this)}>
                                <IconMC name="fullscreen" size={30} color={"#fff"}/>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={ (this.state.fullscreen) ? PlayerStyle.videoBoxFS : PlayerStyle.videoBox }>
                <StatusBar hidden={ this.state.fullscreen } />
                <TouchableWithoutFeedback onPress={ this.handleShowControl.bind(this) }>
                    <Video style={ (this.state.fullscreen) ? PlayerStyle.videoPlayerFS : PlayerStyle.videoPlayer }
                           ref={ this.videoRef }
                           source={{ uri: this.props.source }}
                           onLoad={ this.onLoad.bind(this) }
                           onProgress={ this.onProgress.bind(this) }
                           playInBackground={true}
                           paused={ !this.state.play }/>
                </TouchableWithoutFeedback>
                { this.renderControl() }
            </View>
        )
    }

}

export default Player
