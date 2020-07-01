import * as React from 'react';
import {ImageBackground, SafeAreaView, ScrollView, TouchableWithoutFeedback, View} from "react-native";
import {HeaderStyle, RankStyle, SearchStyle} from "../asset/style";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import {useNavigation} from "@react-navigation/native";
import { Input, Icon } from 'react-native-elements';
import {useState} from "react";

const Search: React.FunctionComponent = () => {

    const navigation = useNavigation();

    const [search, setSearch] = useState('');

    const handleSearch = (text: string) => {
        console.log(text);

    }

    return (
        <SafeAreaView>
            <ImageBackground source={ require('../asset/img/main-bg.png') } style={ RankStyle.homeBg }>
                <ScrollView>
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
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )

}

export default Search
