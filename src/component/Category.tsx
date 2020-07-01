import React, {useEffect, useState} from 'react';
import {HomeState} from "../reducer/home.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as HomeAction from "../action/home.action";
import {SafeAreaView, View, ScrollView, Image, TouchableWithoutFeedback} from "react-native";
import Header from "../plugin/Header";
import Menu from "../plugin/Menu";
import {connect} from "react-redux";
import {CategoryStyle, HomeStyle} from "../asset/style";
import * as lodash from "lodash";
import {useNavigation} from "@react-navigation/native";
import Overlay from "../plugin/Overlay";

interface StatePropsInterface {
    home?: HomeState
}

interface DispatchPropsInterface {
    actions?: {
        getCategoryAction: any
    }
}

type PropsInterface = StatePropsInterface & DispatchPropsInterface

const mapStateToProps = (state: StateInterface) => ({
    home: state.home,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        getCategoryAction: HomeAction.getCategoryAction,
    }, dispatch)
});

const Category: React.FunctionComponent<PropsInterface> = props => {

    const navigation = useNavigation();

    const [cate, setCate] = useState([
        {
            slug: 'nhac-xuan-tuyen-chon',
            img: require('../asset/img/cate-spring.png')
        },
        {
            slug: 'tuyet-dinh-song-ca',
            img: require('../asset/img/cate-bolero.png')
        },
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
        props.actions?.getCategoryAction();
    }, [])

    const renderCategory = () => {
        if (props.home?.category) {
            let cateList = props.home.category.map((item, key) => {
                let image = lodash.find(cate, (cateItem) => {
                    return cateItem.slug == item.slug
                });
                if ( typeof image != "undefined") {
                    return (
                        <View key={key}
                            style={ (key % 2 == 0) ? CategoryStyle.cateItemLeft : CategoryStyle.cateItemRight}>
                            <TouchableWithoutFeedback onPress={() => {
                                navigation.navigate("CateItem", {
                                    id: item.id,
                                    name: item.name,
                                    slug: item.slug
                                })
                            }}>
                                <Image
                                    resizeMode={'cover'}
                                    style={ CategoryStyle.cateImg }
                                    source={ image.img } />
                            </TouchableWithoutFeedback>
                        </View>
                    )
                }
            });

            return (
                <View style={CategoryStyle.cateBox}>
                    { cateList }
                </View>
            )
        }
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ height: 75 }}>
                    <Header header="Bạn muốn nghe gì" />
                    <Menu/>
                    <Overlay/>
                </View>
                { renderCategory() }
            </ScrollView>
        </SafeAreaView>
    )

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Category);
