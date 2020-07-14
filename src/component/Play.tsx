import * as React from 'react';
import {
    View, Text, SafeAreaView, ScrollView, Switch, FlatList,
    TouchableWithoutFeedback, ToastAndroid, Platform, Alert,
    PermissionsAndroid, StyleSheet
} from "react-native";
import {PlayState} from "../reducer/play.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as PlayAction from "../action/play.action";
import {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import CameraRoll from "@react-native-community/cameraroll";
import ProgressCircle from 'react-native-progress-circle';

// @ts-ignore
import PlayerAndroid from "../plugin/Player"
import {useNavigation, useRoute} from '@react-navigation/native';
import {HomeStyle, PlayStyle, windowHeight, windowWidth} from "../asset/style";
import { Image } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import {ApiAddFavorite, ApiFavoriteSong, ApiRemoveFavorite} from "../api/index.api";
import RNFetchBlob from 'rn-fetch-blob'
import {MenuState} from "../reducer/menu.reducer.type";
import Modal from "react-native-modal";

IconAntDesign.loadFont();

interface StatePropsInterface {
    play?: PlayState,
    menu?: MenuState
}

interface DispatchPropsInterface {
    actions?: {
        getSongAction: any,
        toggleFavoriteAction: any
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
    menu: state.menu,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        getSongAction: PlayAction.getSongAction,
        toggleFavoriteAction: PlayAction.toggleFavoriteAction
    }, dispatch)
});

const Play: React.FunctionComponent<PropsInterface> = props => {

    const playerRef = useRef(null);

    const route = useRoute<RouteInterface>();
    const navigation = useNavigation();

    const [isEnabled, setIsEnabled] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [source, setSource] = useState("");
    const [sourceText, setSourceText] = useState("360p");
    const [seekSave, setSeekSave] = useState(0);
    const [showModalProgress, setShowModalProgress] = useState(false);
    const [progress, setProgress] = useState(0);

    const toggleSwitch = async () => {
        setIsEnabled(!isEnabled);
        let autoplay = await AsyncStorage.getItem('@autoplay');
        if (autoplay === "1") {
            await AsyncStorage.setItem('@autoplay', "0");
        } else {
            await AsyncStorage.setItem('@autoplay', "1");
        }
    }

    useEffect(() => {
        const checkAuto = async () => {
            let autoplay = await AsyncStorage.getItem('@autoplay');
            if (autoplay === "1") {
                setIsEnabled(true);
            } else {
                setIsEnabled(false);
            }
        }
        props.actions?.getSongAction(route.params.song_id);
        checkAuto();
    }, []);

    useEffect(() => {
        if (typeof props.play?.song != "undefined") {
            if (props.play.song.link_stream_1080 != '') {
                setSource(props.play.song.link_stream_1080)
                setSourceText("1080p")
            } else {
                setSource(props.play.song.link_stream_360)
                setSourceText("360p")
            }
        }
    }, [props.play?.song])

    const handlePressSong = (song_id: string) => {
        setSeekSave(0);
        props.actions?.getSongAction(song_id);
        return true;
    }

    const handleShowModal = () => {
        setShowModal(true);
    }

    const alertLogin = () => {
        return Alert.alert(
            "Bạn chưa đăng nhập",
            "Bạn phải đăng nhập để sử dụng tính năng này",
            [
                {
                    text: "Đóng", onPress: () => {}
                }
            ],
            { cancelable: false }
        );
    }

    const handleFavorite = () => {
        if (typeof props.menu?.phone != "undefined") {
            if (typeof props.play?.song != "undefined") {
                if (!props.play.song.favorite) {
                    ApiAddFavorite(props.play.song.id);
                    props.actions?.toggleFavoriteAction(true)
                } else {
                    ApiRemoveFavorite(props.play.song.id);
                    props.actions?.toggleFavoriteAction(false)
                }
            }
        } else {
            alertLogin()
        }
    }

    const handleDownload = async () => {
        if (typeof props.menu?.phone != "undefined") {
            if (Platform.OS === "android") {
                const grantedWrite = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: "Quyền lưu dữ liệu",
                        message:"Cần quyền lưu dữ liệu",
                        buttonPositive: "OK"
                    }
                );
                if (grantedWrite == PermissionsAndroid.RESULTS.GRANTED) {
                    ToastAndroid.show(`Đang tải xuống ${props.play?.song?.name}`, ToastAndroid.SHORT);
                    let dir = `${RNFetchBlob.fs.dirs.DownloadDir}\/${props.play?.song?.slug}.mp4`;
                    console.log(dir);
                    RNFetchBlob.config({
                        path: dir,
                        fileCache: true
                        // @ts-ignore
                    }).fetch("GET", props.play?.song?.link_download[0]["1080"] as string)
                    .progress((received, total) => {
                        setProgress(Math.round((received / total) * 100));
                        setShowModalProgress(true);
                    }).then(res => {
                        if (Platform.OS === "android") {
                            setShowModalProgress(false);
                            ToastAndroid.show(`Hoàn thành tải ${props.play?.song?.name}`, ToastAndroid.SHORT);
                        }
                    })
                }
            }

            if (Platform.OS === "ios") {
                console.log("start");
                // @ts-ignore
                let dir = `${RNFetchBlob.fs.dirs.CacheDir}\/${props.play?.song?.slug}.mp4`;
                RNFetchBlob.config({
                    fileCache: true,
                    path: dir,
                    // @ts-ignore
                }).fetch("GET", props.play?.song?.link_download[0]["1080"] as string)
                .progress((received, total) => {
                    setProgress(Math.round((received / total) * 100));
                    setShowModalProgress(true);
                })
                .then(res => {
                    setShowModalProgress(false);
                    console.log(res.path());
                    CameraRoll.save(res.path(), {
                        type: "video",
                        album: "ibolero"
                    }).then(() => {
                        Alert.alert(
                            "Tải về thành công",
                            "Tải về thành công",
                            [
                                {
                                    text: "Đóng", onPress: () => {}
                                }
                            ],
                            { cancelable: false }
                        );
                    })
                })
            }
        } else {
            alertLogin()
        }
    }

    const ShowItem = (item: any) => {
        return (
            <TouchableWithoutFeedback onPress={ () => handlePressSong(item.item.id) }>
                <View style={HomeStyle.rankItem}>
                    <View style={HomeStyle.rankItemLeft}>
                        <Image style={HomeStyle.rankImage} source={{uri: item.item.thumbnail_url}}/>
                    </View>
                    <View style={HomeStyle.rankItemRight}>
                        <Text numberOfLines={1} ellipsizeMode={"tail"}
                              style={PlayStyle.relateText}>{item.item.name}</Text>
                        <Text numberOfLines={1} ellipsizeMode={"tail"}
                              style={PlayStyle.relateSub}>{item.item.artist}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    };

    const renderSong = () => {
        if (typeof props.play?.song != "undefined") {
            return (
                <FlatList data={props.play.song.relate_song}
                    renderItem={ ({item}) => (<ShowItem item={item}/>) }
                    keyExtractor={item => item.id} />
            );
        }
    }

    const renderVideo = () => {
        if (typeof props.play?.song != "undefined" && source != "") {
            return (
                <PlayerAndroid next_id={ props.play.song.relate_song[0].id }
                    source={ source }
                    source_text={ sourceText }
                    navigation={ navigation }
                    change_action={ props.actions?.getSongAction }
                    favorite={ props.play.song.favorite }
                    change_favorite={ handleFavorite }
                    download_action={ handleDownload }
                    modal_action={ handleShowModal }
                    seek_save={seekSave}
                    ref={playerRef}
                />
            )
        }
    }

    const renderContent = () => {
        if (typeof props.play?.song != "undefined") {
            return (
                <View>
                    <View style={PlayStyle.infoBox}>
                        <Text style={PlayStyle.infoName}>{ props.play.song.name }</Text>
                        <Text style={PlayStyle.infoSub}>{ props.play.song.artist }</Text>
                    </View>
                    <View style={PlayStyle.viewBox}>
                        <View style={PlayStyle.viewCount}>
                            <Text>{ props.play.song.view_count } lượt xem</Text>
                        </View>
                        <View style={PlayStyle.viewAuto}>
                            <Switch
                                style={PlayStyle.viewAutoSwift}
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isEnabled ? "#90caf9" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}/>
                            <Text style={PlayStyle.viewAutoText}>Tự động phát</Text>
                        </View>
                    </View>
                    { renderSong() }
                </View>
            )
        }
    }

    const renderModalProgress = () => {
        return (
            <Modal
                isVisible={showModalProgress}>
                <View style={PlayStyle.modalContentProgress}>
                    <ProgressCircle
                        percent={progress}
                        radius={50}
                        borderWidth={8}
                        color="#3399FF"
                        shadowColor="#999"
                        bgColor="#fff">
                        <Text style={{ fontSize: 18 }}>{ progress.toString()+'%'}</Text>
                    </ProgressCircle>
                </View>
            </Modal>
        )
    }

    const renderModal = () => {
        if (typeof props.play?.song != "undefined") {
            let link360 = props.play.song.link_stream_360 != "" ? (
                <TouchableWithoutFeedback onPress={() => {
                    // @ts-ignore
                    setSource(props.play.song.link_stream_360);
                    setSourceText("360p");
                    setShowModal(false);
                    // @ts-ignore
                    setSeekSave(playerRef.current.state.currentTime);
                    // @ts-ignore
                    //console.log(playerRef.current.state.currentTime);
                }}>
                    <Text style={PlayStyle.modalContentTitle}>360p</Text>
                </TouchableWithoutFeedback>
            ) : null;

            let link480 = props.play.song.link_stream_480 != "" ? (
                <TouchableWithoutFeedback onPress={() => {
                    // @ts-ignore
                    setSource(props.play.song.link_stream_480);
                    setSourceText("480p");
                    setShowModal(false);
                    // @ts-ignore
                    setSeekSave(playerRef.current.state.currentTime);
                }}>
                    <Text style={PlayStyle.modalContentTitle}>480p</Text>
                </TouchableWithoutFeedback>
            ) : null;

            let link720 = props.play.song.link_stream_720 != "" ? (
                <TouchableWithoutFeedback onPress={() => {
                    // @ts-ignore
                    setSource(props.play.song.link_stream_720);
                    setSourceText("720p");
                    setShowModal(false);
                    // @ts-ignore
                    setSeekSave(playerRef.current.state.currentTime);
                }}>
                    <Text style={PlayStyle.modalContentTitle}>720p</Text>
                </TouchableWithoutFeedback>
            ) : null;

            let link1080 = props.play.song.link_stream_1080 != "" ? (
                <TouchableWithoutFeedback onPress={() => {
                    // @ts-ignore
                    setSource(props.play.song.link_stream_1080);
                    setSourceText("1080p");
                    setShowModal(false);
                    // @ts-ignore
                    setSeekSave(playerRef.current.state.currentTime);
                }}>
                    <Text style={PlayStyle.modalContentTitle}>1080p</Text>
                </TouchableWithoutFeedback>
            ) : null;

            return (
                <Modal
                    isVisible={showModal}
                    onSwipeComplete={() => {
                        setShowModal(false)
                    }}
                    onBackdropPress={() => {
                        setShowModal(false)
                    }}
                    swipeDirection={['down']}
                    style={PlayStyle.modalView}>
                    <View style={PlayStyle.modalContent}>
                        { link360 }
                        { link480 }
                        { link720 }
                        { link1080 }
                    </View>
                </Modal>
            )
        }
    }

    return (
        <SafeAreaView>
            { renderVideo() }
            { renderContent() }
            { renderModal() }
            { renderModalProgress() }
        </SafeAreaView>
    )
}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Play);
