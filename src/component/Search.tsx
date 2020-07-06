import * as React from 'react';
import {ImageBackground, SafeAreaView, ScrollView,
    TouchableWithoutFeedback, View, SectionList, Text} from "react-native";
import {HeaderStyle, RankStyle, SearchStyle} from "../asset/style";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import {useNavigation} from "@react-navigation/native";
import { Input, Icon } from 'react-native-elements';
import {useEffect, useState} from "react";
import {ApiSearchData} from "../api/index.api";

interface SearchInterface {
    title: string,
    data: Array<any>
}

const Search: React.FunctionComponent = () => {

    const navigation = useNavigation();
    const [search, setSearch] = useState<Array<SearchInterface>>([]);

    const handleSearch = async (text: string) => {
        if (text.length > 0) {
            const response = await ApiSearchData(text);
            if (response.data.data.media.length > 0 && response.data.data.singer.length > 0) {
                setSearch([
                    {
                        title: 'Bài hát',
                        data: response.data.data.media
                    },
                    {
                        title: 'Ca sĩ',
                        data: response.data.data.singer
                    }
                ])
            } else if (response.data.data.media.length > 0 && response.data.data.singer.length == 0) {
                setSearch([
                    {
                        title: 'Bài hát',
                        data: response.data.data.media
                    }
                ])
            } else if (response.data.data.media.length == 0 && response.data.data.singer.length > 0) {
                setSearch([
                    {
                        title: 'Ca sĩ',
                        data: response.data.data.singer
                    }
                ])
            }
        }
    }

    const Item = (item: any) => {
        if (typeof item.item.artist != "undefined") {
            return (
                <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate("Play", {
                        song_id: item.item.id
                    })
                }}>
                    <View style={SearchStyle.searchItem}>
                        <Text style={SearchStyle.itemText}>{item.item.name}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        } else {
            return (
                <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate("SingerItem", {
                        id: item.item.id,
                        name: item.item.name,
                    })
                }}>
                    <View style={SearchStyle.searchItem}>
                        <Text style={SearchStyle.itemText}>{item.item.name}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    };

    return (
        <SafeAreaView>
            <ImageBackground source={ require('../asset/img/main-bg.png') } style={ SearchStyle.homeBg }>
                <View style={{ height: 65 }}>
                    <ImageBackground source={ require('../asset/img/header-bg.png') } style={ HeaderStyle.headerBg }>
                        <TouchableWithoutFeedback onPress={() => {
                            navigation.goBack();
                        }}>
                            <View>
                                <IconAntDesign size={30} name={'arrowleft'} color={"#fff"} />
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={ SearchStyle.searchInput }>
                            <Input
                                placeholder='Tìm kiếm'
                                inputStyle={{ color: "#fff", paddingTop: 5, paddingBottom: 5 }}
                                inputContainerStyle={{ height: 35 }}
                                containerStyle={{ height: 40 }}
                                placeholderTextColor="#fff"
                                autoFocus={true}
                                onSubmitEditing={event => {
                                }}
                                onChangeText={text => {
                                    handleSearch(text)
                                }}
                                rightIcon={
                                    <IconAntDesign size={25} name={'search1'} color={"#fff"} />
                                }
                            />
                        </View>
                    </ImageBackground>
                </View>
                <SectionList
                    sections={search}
                    keyExtractor={(item: any) => item.id}
                    // keyExtractor={item => item}
                    renderItem={({ item }) => <Item item={item} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={SearchStyle.searchHead}>{title}</Text>
                    )}
                />
            </ImageBackground>
        </SafeAreaView>
    )

}

export default Search
