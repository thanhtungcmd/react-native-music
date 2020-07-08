import * as React from 'react';
import {
    View, Text, SafeAreaView, ScrollView, Switch, FlatList,
    TouchableWithoutFeedback, ToastAndroid, Platform, Alert
} from "react-native";
import {PlayState} from "../reducer/play.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as PlayAction from "../action/play.action";
import {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import IconAntDesign from 'react-native-vector-icons/AntDesign';
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

    const route = useRoute<RouteInterface>();

    const navigation = useNavigation();

    const [isEnabled, setIsEnabled] = useState(false);

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

    const handlePressSong = (song_id: string) => {
        props.actions?.getSongAction(song_id);
        return true;
    }

    const alertLogin = () => {
        return Alert.alert(
            "Bạn chưa đăng nhập",
            "Bạn phải đăng nhập để sử dụng tính năng này",
            [
                {
                    text: "Đăng nhập", onPress: () => {
                        navigation.navigate("Login");
                    }
                },
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

    const handleDownload = () => {
        if (typeof props.menu?.phone != "undefined") {
            // @ts-ignore
            if (Platform.OS === "android") {
                ToastAndroid.show(`Đang tải xuống ${props.play?.song?.name}`, ToastAndroid.SHORT);
            }
            let dir = `${RNFetchBlob.fs.dirs.DownloadDir}\/${props.play?.song?.slug}.mp4`;
            RNFetchBlob.config({
                path: dir
                // @ts-ignore
            }).fetch("GET", props.play?.song?.link_download[0]["1080"] as string).then(res => {
                if (Platform.OS === "android") {
                    ToastAndroid.show(`Hoàn thành tải ${props.play?.song?.name}`, ToastAndroid.SHORT);
                }
            })
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
        if (typeof props.play?.song != "undefined") {
            return (
                <PlayerAndroid next_id={ props.play.song.relate_song[0].id }
                               source={ props.play.song.link_stream }
                               navigation={ navigation }
                               change_action={ props.actions?.getSongAction }
                               favorite={ props.play.song.favorite }
                               change_favorite={ handleFavorite }
                               download_action={ handleDownload }
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

    return (
        <SafeAreaView>
            { renderVideo() }
            { renderContent() }
        </SafeAreaView>
    )

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Play);
