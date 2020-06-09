import React, {useEffect, useState} from 'react';
import {Image, TouchableWithoutFeedback, View, Text} from "react-native";
import Carousel from "react-native-snap-carousel";
import {HomeStyle, windowWidth} from "../asset/style";
import {HomeState} from "../reducer/home.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as HomeAction from "../action/home.action";
import {connect} from "react-redux";

interface StatePropsInterface {
    home?: HomeState
}

interface DispatchPropsInterface {
    actions?: {
        getHomeAllAction: any
        changeHomeAction: any
    }
}

type PropsInterface = StatePropsInterface & DispatchPropsInterface

const mapStateToProps = (state: StateInterface) => ({
    home: state.home,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        getHomeAllAction: HomeAction.getHomeAllAction,
        changeHomeAction: HomeAction.changeHomeAction
    }, dispatch)
});

const HomeCate: React.FunctionComponent<PropsInterface> = props => {

    const [cateActive, setCateActive] = useState(0);

    const [cate, setCate] = useState([
        {
            slug: 'tuyet-dinh-song-ca',
            img: require('../asset/img/cate-bolero.png')
        },
        {
            slug: 'nhac-phat',
            img: require('../asset/img/cate-budda.png')
        },
        {
            slug: 'karaoke',
            img: require('../asset/img/cate-cara.png')
        },
        {
            slug: 'bolero-girl',
            img: require('../asset/img/cate-girl.png')
        },
        {
            slug: 'nhac-vang',
            img: require('../asset/img/cate-gold.png')
        },
        {
            slug: 'bolero-kinh-dien',
            img: require('../asset/img/cate-kd.png')
        },
        {
            slug: "nhac-song-dinh-cao",
            img: require('../asset/img/cate-live.png')
        },
        {
            slug: "nhac-tru-tinh",
            img: require('../asset/img/cate-love.png')
        },
        {
            slug: "bolero-remix",
            img: require('../asset/img/cate-remix.png')
        },
    ]);

    useEffect(() => {
        props.actions?.getHomeAllAction();
    }, []);

    useEffect(() => {
        changeCateExec();
    }, [props.home?.home])

    useEffect(() => {
        changeCateExec();
    }, [cateActive])

    const changeCateExec = () => {
        if (typeof props.home?.home != "undefined") {
            props.home.home.map((item) => {
                if (item.slug == cate[cateActive].slug) {
                    props.actions?.changeHomeAction(item.list);
                }
            })
        }
    }

    const renderSlideItem = ({item, index}: any) => {
        return (
            <TouchableWithoutFeedback onPress={() => {} }>
                <Image
                    resizeMode={'cover'}
                    style={ HomeStyle.cateSlideImage }
                    source={ item.img } />
            </TouchableWithoutFeedback>
        );
    }

    const renderSlide = () => {
        return (
            <Carousel
                containerCustomStyle={ HomeStyle.cateSlide }
                data={ cate }
                renderItem={renderSlideItem}
                sliderWidth={windowWidth}
                itemWidth={ (windowWidth * 0.55) }
                inactiveSlideScale={0.75}
                inactiveSlideOpacity={0.7}
                useScrollView={true}
                onSnapToItem={(index) => setCateActive(index) } />
        )
    }

    const renderSong = () => {
        let songItem;
        if (typeof props.home?.home_active != "undefined") {
            songItem = props.home.home_active.map((item, key) => {
                if (key < 10) {
                    if (key % 2 == 0) {
                        return (
                            <View key={key} style={HomeStyle.cateSongItemLeft}>
                                <Image style={HomeStyle.cateSongImage} source={{uri: item.thumbnail_url}}/>
                                <Text numberOfLines={2} ellipsizeMode={"tail"} style={HomeStyle.cateSongTextLeft}>{ item.name }</Text>
                                <Text numberOfLines={1} ellipsizeMode={"tail"} style={HomeStyle.cateSongSubLeft}>{ item.artist }</Text>
                            </View>
                        )
                    } else {
                        return (
                            <View key={key} style={HomeStyle.cateSongItemRight}>
                                <Image style={HomeStyle.cateSongImage} source={{uri: item.thumbnail_url}}/>
                                <Text numberOfLines={2} ellipsizeMode={"tail"} style={HomeStyle.cateSongTextRight}>{ item.name }</Text>
                                <Text numberOfLines={1} ellipsizeMode={"tail"} style={HomeStyle.cateSongSubRight}>{ item.artist }</Text>
                            </View>
                        )
                    }
                }
            })
        }

        return (
            <View style={HomeStyle.cateSongBox}>
                { songItem }
            </View>
        )
    }

    return (
        <View style={HomeStyle.cateBox}>
            <View style={ HomeStyle.cateTitle }>
                <Image style={HomeStyle.cateTitleImage} source={ require('../asset/img/icon-music.png') }/>
                <Text style={HomeStyle.cateTitleText}>Bạn muốn nghe gì</Text>
            </View>
            <View style={HomeStyle.cateContent}>
                { renderSlide() }
                { renderSong() }
            </View>
        </View>
    );

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(HomeCate);

