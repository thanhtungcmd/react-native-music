import React, {useEffect} from 'react';
import {Image, TouchableWithoutFeedback, View} from "react-native";
import Carousel, {Pagination} from "react-native-snap-carousel";
import {HomeStyle, windowWidth} from "../asset/style";
import {BannerItem} from "../reducer/home.reducer.type";

interface PropInterface {
    banner?: Array<BannerItem>
}

const Banner: React.FunctionComponent<PropInterface> = props => {

    const [bannerActive, setBannerActive] = React.useState(0);

    const pagination = () => {
        if (typeof props.banner != "undefined") {
            return (
                <Pagination
                    dotsLength={props.banner?.length as number}
                    activeDotIndex={bannerActive}
                    containerStyle={HomeStyle.carouselDot}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.92)'
                    }}
                    inactiveDotStyle={{
                        // Define styles for inactive dots here
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            );
        }

        return null;
    }

    const renderBannerItem = ({item, index}: any) => {
        return (
            <TouchableWithoutFeedback onPress={() => {} }>
                <Image
                    resizeMode={'cover'}
                    style={ HomeStyle.carouselImage }
                    source={{ uri: item.thumbnail_url }} />
            </TouchableWithoutFeedback>
        );
    }

    const renderBanner = () => {
        if (typeof props.banner != "undefined") {
            return (
                <Carousel
                    style={ HomeStyle.carousel }
                    data={props.banner as any}
                    renderItem={renderBannerItem}
                    sliderWidth={windowWidth}
                    itemWidth={windowWidth}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    activeSlideAlignment={'start'}
                    onSnapToItem={(index) => setBannerActive(index) }/>
            )
        }

        return null;
    }

    return (
        <View>
            { renderBanner() }
            { pagination() }
        </View>
    );

}

export default Banner



