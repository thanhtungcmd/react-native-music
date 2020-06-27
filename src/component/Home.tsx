import React, {useEffect} from 'react';
import {
    Text, View, SafeAreaView, RefreshControl,
    ScrollView, Image, ImageBackground
} from "react-native";
import { bindActionCreators, Dispatch } from 'redux';
import {connect} from "react-redux";
import {HomeState} from "../reducer/home.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import * as HomeAction from "../action/home.action";
import Header from "../plugin/Header";
import Menu from "../plugin/Menu";
import Banner from "../plugin/Banner";
import HomeCate from "../plugin/HomeCate";
import HomeSinger from "../plugin/HomeSinger";
import {HomeStyle} from "../asset/style";
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

IconAntDesign.loadFont();

interface StatePropsInterface {
    home: HomeState
}

interface DispatchPropsInterface {
    actions: {
        getHomeRankAction: any
    }
}

type PropsInterface = StatePropsInterface & DispatchPropsInterface

const mapStateToProps = (state: StateInterface) => ({
    home: state.home,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        getHomeBannerAction: HomeAction.getHomeBannerAction,
        getHomeRankAction: HomeAction.getHomeRankAction
    }, dispatch)
});

const Home: React.FunctionComponent<PropsInterface> = props => {

    const [refreshing, setRefreshing] = React.useState(false);
    const [spinner , setSpinner] = React.useState(true);
    const navigation = useNavigation();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }, [refreshing]);

    useEffect(() => {
        if (typeof props.home.banner != "undefined"
            && typeof props.home.rank != "undefined"
            && typeof props.home.home != "undefined"
            && typeof props.home.singer != "undefined"
        ) {
            setSpinner(false);
        }
    })

    useEffect(() => {
        props.actions.getHomeRankAction();
    }, []);

    const renderRankSong = () => {
        if (typeof props.home.rank != "undefined") {
            return props.home.rank.map((item, key) => {
                let icon;
                switch (key) {
                    case 0:
                        icon = (<Image style={HomeStyle.rankItemImage} source={ require('../asset/img/bxh-01.png') }/>)
                        break;
                    case 1:
                        icon = (<Image style={HomeStyle.rankItemImage} source={ require('../asset/img/bxh-02.png') }/>)
                        break;
                    case 2:
                        icon = (<Image style={HomeStyle.rankItemImage} source={ require('../asset/img/bxh-03.png') }/>)
                        break;
                    case 3:
                        icon = (<Image style={HomeStyle.rankItemImage} source={ require('../asset/img/bxh-04.png') }/>)
                        break;
                }

                return (
                    <View style={HomeStyle.rankItem} key={key}>
                        <View style={HomeStyle.rankItemLeft}>
                            <Image style={HomeStyle.rankImage} source={{ uri: item.thumbnail_url }}/>
                        </View>
                        <View style={HomeStyle.rankItemRight}>
                            { icon }
                            <Text numberOfLines={1} ellipsizeMode={"tail"} style={HomeStyle.rankItemName}>{ item.name }</Text>
                            <Text numberOfLines={1} ellipsizeMode={"tail"} style={HomeStyle.rankItemSub}>{ item.artist }</Text>
                        </View>
                    </View>
                )
            })
        }
    }

    const renderRank = () => {
        return (
            <View>
                <Text style={HomeStyle.rankTitle}>Bảng xếp hạng</Text>
                <View style={HomeStyle.rankBox}>
                    { renderRankSong() }
                </View>
                <Text style={HomeStyle.rankViewMore}>
                    Xem thêm <IconAntDesign name={'right'} />
                </Text>
            </View>
        )
    }

    const renderBox = () => {
        return (
            <View>
                <ImageBackground source={ require('../asset/img/main-bg.png') } style={ HomeStyle.homeBg }>
                    { renderRank() }
                    <HomeCate/>
                    <HomeSinger/>
                </ImageBackground>
            </View>
        )
    }

    return (
        <SafeAreaView>
            <Spinner visible={spinner}/>
            <ScrollView
                refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }>
                <Header/>
                <Menu/>
                <Banner/>
                { renderBox() }
            </ScrollView>
        </SafeAreaView>
    );

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Home);
