import React, {useEffect} from 'react';
import {Image, TouchableWithoutFeedback, View} from "react-native";
import Carousel, {Pagination} from "react-native-snap-carousel";
import {HomeStyle, windowWidth} from "../asset/style";
import {BannerItem, HomeState} from "../reducer/home.reducer.type";
import StateInterface from "../reducer/index.reducer.type";
import {bindActionCreators, Dispatch} from "redux";
import * as HomeAction from "../action/home.action";
import * as PlayAction from "../action/play.action";
import {connect} from "react-redux";
import {PlayState} from "../reducer/play.reducer.type";

interface StatePropsInterface {
    home?: HomeState,
    play?: PlayState
}

interface DispatchPropsInterface {
    actions?: {
        getHomeBannerAction: any,
        changeSongAction: any
    }
}

type PropsInterface = StatePropsInterface & DispatchPropsInterface

const mapStateToProps = (state: StateInterface) => ({
    home: state.home,
    play: state.play
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({
        getHomeBannerAction: HomeAction.getHomeBannerAction,
        changeSongAction: PlayAction.changeSongAction,
    }, dispatch)
});

const Banner: React.FunctionComponent<PropsInterface> = props => {

    const [bannerActive, setBannerActive] = React.useState(0);

    useEffect(() => {
        props.actions?.getHomeBannerAction();
    }, []);

    const pagination = () => {
        if (typeof props.home?.banner != "undefined") {
            return (
                <Pagination
                    dotsLength={props.home.banner?.length as number}
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
            <TouchableWithoutFeedback onPress={ () => {
                props.actions?.changeSongAction(item.id);
            } }>
                <Image
                    resizeMode={'cover'}
                    style={ HomeStyle.carouselImage }
                    source={{ uri: item.thumbnail_url }} />
            </TouchableWithoutFeedback>
        );
    }

    const renderBanner = () => {
        if (typeof props.home?.banner != "undefined") {
            return (
                <Carousel
                    style={ HomeStyle.carousel }
                    data={props.home.banner as any}
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

export default connect<StatePropsInterface, DispatchPropsInterface, PropsInterface, StateInterface>(
    mapStateToProps,
    mapDispatchToProps
)(Banner);



