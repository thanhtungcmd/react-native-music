import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableWithoutFeedback, View} from "react-native";
import {HomeStyle, windowWidth} from "../asset/style";
import Carousel from "react-native-snap-carousel";
import {HomeState} from "../reducer/home.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as HomeAction from "../action/home.action";
import {connect} from "react-redux";
import {useNavigation} from "@react-navigation/native";

interface StatePropsInterface {
    home?: HomeState
}

interface DispatchPropsInterface {
    actions?: {
        getHomeSingerAction: any
    }
}

type PropsInterface = StatePropsInterface & DispatchPropsInterface

const mapStateToProps = (state: StateInterface) => ({
    home: state.home,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        getHomeSingerAction: HomeAction.getHomeSingerAction,
    }, dispatch)
});

const HomeSinger: React.FunctionComponent<PropsInterface> = props => {

    const navigation = useNavigation();

    useEffect(() => {
        props.actions?.getHomeSingerAction();
    }, []);

    const renderSlideItem = ({item, index}: any) => {
        return (
            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate("SingerItem", {
                    id: item.id,
                    name: item.name,
                })
            } }>
                <View>
                    <Image
                        resizeMode={'cover'}
                        style={ HomeStyle.cateSingerSlideImage }
                        source={{ uri: item.thumbnail_url }} />
                    <Text style={ HomeStyle.cateSingerSlideText }>{ item.name }</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    const renderSlide = () => {
        if (typeof props.home?.singer != "undefined") {
            return (
                <Carousel
                    containerCustomStyle={HomeStyle.cateSingerSlide}
                    data={props.home?.singer}
                    renderItem={renderSlideItem}
                    sliderWidth={windowWidth}
                    itemWidth={(windowWidth * 0.3)}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    enableMomentum={true}
                    activeSlideAlignment={'start'}
                    useScrollView={true}/>
            )
        }
    }

    return (
        <View style={HomeStyle.cateBox}>
            <View style={ HomeStyle.cateTitle }>
                <Image style={HomeStyle.cateTitleImage} source={ require('../asset/img/icon-music.png') }/>
                <Text style={HomeStyle.cateTitleText}>Ca sĩ được yêu thích nhất</Text>
            </View>

            <View style={HomeStyle.cateContent}>
                { renderSlide() }
            </View>
        </View>
    )

}

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(HomeSinger);
