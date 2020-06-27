import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image,
    ImageBackground, SafeAreaView, Text, View, TouchableWithoutFeedback} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import Header from "../plugin/Header";
import {SongItem} from "../reducer/home.reducer.type";
import {ApiCategoryItem} from "../api/index.api";
import {HomeStyle, RankStyle} from "../asset/style";

interface RouteInterface {
    key: string,
    name: string,
    params: {
        id: string,
        name: string,
        slug: string
    }
}

const CateItem: React.FunctionComponent = () => {

    const route = useRoute<RouteInterface>();
    const navigation = useNavigation();

    const [song, setSong] = useState<Array<SongItem>>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        ApiCategoryItem(route.params.id, '1').then((response) => {
            setSong(response.data.data.list.data);
        })
    }, []);

    useEffect(() => {
        console.log(page);
    }, [page])

    const RenderSongItem = (item: any) => {
        return (
            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate("Play", {
                    song_id: item.item.id
                })
            }}>
                <View style={HomeStyle.rankItem}>
                    <View style={HomeStyle.rankItemLeft}>
                        <Image style={HomeStyle.rankImage} source={{ uri: item.item.thumbnail_url }}/>
                    </View>
                    <View style={HomeStyle.rankItemRight}>
                        <Text numberOfLines={1} ellipsizeMode={"tail"} style={HomeStyle.rankItemName}>{ item.item.name }</Text>
                        <Text numberOfLines={1} ellipsizeMode={"tail"} style={HomeStyle.rankItemSub}>{ item.item.artist }</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const handleLoadMore = () => {
        setTimeout(() => {
            ApiCategoryItem(route.params.id, page + 1).then((response) => {
                setSong(song.concat(response.data.data.list.data));
                setPage(page + 1);
            })
        }, 1000);
    }

    const FooterComponent = () => {
        return (
            <View>
                <ActivityIndicator size={ 70 } color={"#fff"}/>
            </View>
        )
    }

    const renderSong = () => {
        if (typeof song != "undefined") {
            return (
                <FlatList data={ song }
                    renderItem={({item}) => (<RenderSongItem item={item}/>)}
                    keyExtractor={item => item.id}
                    onEndReached={ handleLoadMore }
                    onEndReachedThreshold={1}
                    ListFooterComponent={ <FooterComponent/> }/>
            )
        }
    }

    return (
        <SafeAreaView>
            <ImageBackground source={ require('../asset/img/main-bg.png') } style={ RankStyle.homeBg }>
                <View style={{ height: 75 }}>
                    <Header header={ route.params.name } />
                </View>
                { renderSong() }
            </ImageBackground>
        </SafeAreaView>
    )

}

export default CateItem
