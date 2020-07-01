import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    ImageBackground,
    SafeAreaView, Text,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {HomeStyle, RankStyle, SingerStyle} from "../asset/style";
import Header from "../plugin/Header";
import Menu from "../plugin/Menu";
import {SingerItem} from "../reducer/home.reducer.type";
import {ApiCategoryItem, ApiGetSinger} from "../api/index.api";
import {useNavigation} from "@react-navigation/native";
import * as lodash from "lodash";
import Overlay from "../plugin/Overlay";


const Singer: React.FunctionComponent = () => {

    const navigation = useNavigation();

    const [singer, setSinger] = useState<Array<SingerItem>>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        ApiGetSinger(1).then((response) => {
            setSinger(response.data.data.data)
        })
    }, []);

    const handleLoadMore = () => {
        setTimeout(() => {
            ApiGetSinger(page + 1).then((response) => {
                setSinger(
                    lodash.uniqBy(
                        singer.concat(response.data.data.data),
                        "id"
                    )
                );

                setPage(page + 1);
            })
        }, 1000);
    }

    const RenderSongItem = (item: any) => {
        return (
            <View style={SingerStyle.singerBox}>
                <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate("SingerItem", {
                        id: item.item.id,
                        name: item.item.name,
                    })
                }}>
                    <Image style={SingerStyle.singerImg} source={{ uri: item.item.thumbnail_url }}/>
                </TouchableWithoutFeedback>
                <Text style={SingerStyle.singerName}>{ item.item.name }</Text>
            </View>
        )
    }

    const FooterComponent = () => {
        return (
            <View>
                <ActivityIndicator size={ 70 } color={"#fff"}/>
            </View>
        )
    }

    const renderSinger = () => {
        if (typeof singer != "undefined") {
            return (
                <FlatList data={ singer }
                    numColumns={2}
                    renderItem={({item}) => (<RenderSongItem item={item}/>)}
                    keyExtractor={item => item.id}
                    onEndReached={ handleLoadMore }
                    onEndReachedThreshold={1}
                    ListFooterComponent={ <FooterComponent/> }
                    />
            )
        }
    }

    return (
        <SafeAreaView>
            <ImageBackground source={ require('../asset/img/main-bg.png') } style={ RankStyle.homeBgNoTab }>
                <View style={{ height: 75 }}>
                    <Header header={"Ca sĩ"} />
                    <Menu/>
                    <Overlay/>
                </View>
                { renderSinger() }
            </ImageBackground>
        </SafeAreaView>
    )

}

export default Singer
