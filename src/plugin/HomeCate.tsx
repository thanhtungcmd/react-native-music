import React, {useState} from 'react';
import {Image, TouchableWithoutFeedback, View, Text} from "react-native";
import Carousel from "react-native-snap-carousel";
import {HomeStyle, windowWidth} from "../asset/style";

const HomeCate: React.FunctionComponent = props => {

    const [cate, setCate] = useState([
        {
            img: require('../asset/img/cate-bolero.png')
        },
        {
            img: require('../asset/img/cate-budda.png')
        },
        {
            img: require('../asset/img/cate-cara.png')
        },
        {
            img: require('../asset/img/cate-girl.png')
        },
        {
            img: require('../asset/img/cate-gold.png')
        },
        {
            img: require('../asset/img/cate-kd.png')
        },
        {
            img: require('../asset/img/cate-live.png')
        },
        {
            img: require('../asset/img/cate-love.png')
        },
        {
            img: require('../asset/img/cate-remix.png')
        },
    ]);

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
                useScrollView={true}/>
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
            </View>
        </View>
    );

}

export default HomeCate

