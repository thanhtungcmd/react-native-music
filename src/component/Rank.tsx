import React, {useEffect} from 'react';
import {HomeState} from "../reducer/home.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as HomeAction from "../action/home.action";
import * as MenuAction from "../action/menu.action";
import {
    FlatList,
    Image,
    ImageBackground,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {connect} from "react-redux";
import Header from "../plugin/Header";
import Menu from "../plugin/Menu";
import {useNavigation} from "@react-navigation/native";
import {HomeStyle, RankStyle} from "../asset/style";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import Overlay from "../plugin/Overlay";


interface StatePropsInterface {
    home?: HomeState
}

interface DispatchPropsInterface {
    actions?: {
        getRankAllAction: any
    }
}

type PropsInterface = StatePropsInterface & DispatchPropsInterface

const mapStateToProps = (state: StateInterface) => ({
    home: state.home,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        getRankAllAction: HomeAction.getRankAllAction,
    }, dispatch)
});

const Rank: React.FunctionComponent<PropsInterface> = props => {

    const [refreshing, setRefreshing] = React.useState(false);

    const navigation = useNavigation();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }, [refreshing]);

    useEffect(() => {
        props.actions?.getRankAllAction();
    }, []);

    const RenderRankSong = (item: any) => {
        let icon;
        switch (item.item.key) {
            case 1:
                icon = (<Image style={HomeStyle.rankItemImage} source={ require('../asset/img/bxh-01.png') }/>)
                break;
            case 2:
                icon = (<Image style={HomeStyle.rankItemImage} source={ require('../asset/img/bxh-02.png') }/>)
                break;
            case 3:
                icon = (<Image style={HomeStyle.rankItemImage} source={ require('../asset/img/bxh-03.png') }/>)
                break;
            case 4:
                icon = (<Image style={HomeStyle.rankItemImage} source={ require('../asset/img/bxh-04.png') }/>)
                break;
            default:
                let key = item.item.key.toString();
                key = (key.length == 1) ? "0" + key : key;
                icon = (<Text style={RankStyle.textRank}>{ key }</Text>)
                break;
        }

        return (
            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate('Play', {
                    song_id: item.item.id
                });
            }}>
                <View style={HomeStyle.rankItem}>
                    <View style={HomeStyle.rankItemLeft}>
                        <Image style={HomeStyle.rankImage} source={{ uri: item.item.thumbnail_url }}/>
                    </View>
                    <View style={HomeStyle.rankItemRight}>
                        { icon }
                        <Text numberOfLines={1} ellipsizeMode={"tail"} style={HomeStyle.rankItemName}>{ item.item.name }</Text>
                        <Text numberOfLines={1} ellipsizeMode={"tail"} style={HomeStyle.rankItemSub}>{ item.item.artist }</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const renderRank = () => {
        if (typeof props.home?.rank_all != "undefined") {
            let data = props.home.rank_all.map((item, key) => {
                return {
                    ...item,
                    key: key + 1
                }
            })
            return (
                <FlatList data={ data }
                          renderItem={({item}) => (<RenderRankSong item={item}/>)}
                          keyExtractor={item => item.id}/>
            )
        }
    }

    return (
        <SafeAreaView>
            <ImageBackground source={ require('../asset/img/main-bg.png') } style={ RankStyle.homeBg }>
                <View style={{ height: 75 }}>
                    <Header header="Bảng xếp hạng" />
                    <Menu/>
                    <Overlay/>
                </View>
                { renderRank() }
            </ImageBackground>
        </SafeAreaView>
    )

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Rank);
