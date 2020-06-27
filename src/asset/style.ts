import { StyleSheet, Dimensions } from "react-native";

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const screenWidth = Dimensions.get('screen').width;
export const screenHeight = Dimensions.get('screen').height;

export const videoSmallWidth = windowWidth / 3;
export const videoSmallHeight = (windowWidth / 3) * (9/16);
export const videoSmallTop = windowHeight - videoSmallHeight - 90;
export const videoFullHeight = windowWidth * (9/16);
export const titleSmallWidth = windowWidth * (2/3);
console.log(videoSmallTop);

export const ContainerApp = StyleSheet.create({
    main: {
        flex: 1
    }
});

export const TabNavigation = StyleSheet.create({
    tabBox: {
        borderTopColor: '#efdd6c',
        borderTopWidth: 3,
        flexDirection: "row",
    },
    tabText: {
        textAlign: "center",
        fontSize: 10,
        marginBottom: 10,
        fontWeight: "600",
        color: '#ecb439'
    },
    tabTextActive: {
        textAlign: "center",
        fontSize: 10,
        marginBottom: 10,
        fontWeight: "600",
        color: '#fff'
    },
    tabIcon: {
        marginTop: 10,
        alignItems: "center",
        marginBottom: 5
    },
    tabTouch: {
        flex: 1,
        flexDirection: "column",
    },
    tabImage: {
        width: 30,
        height: 30,
        resizeMode: 'stretch',
    },
    tabImageSinger: {
        width: 20,
        height: 30,
        resizeMode: 'stretch',
    },
    tabBg: {
        flexDirection: "row",
        flex: 1,
        resizeMode: 'cover'
    }
})

export const HeaderStyle = StyleSheet.create({
    headerBg: {
        flexDirection: "row",
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 10,
        minHeight: 65
    },
    badge: {
        position: "absolute",
        right: -4,
        top: -4
    },
    headerText: {
        textTransform: "uppercase",
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold"
    }
})

export const PlayStyle = StyleSheet.create({
    infoBox: {
        marginTop: 15,
        paddingHorizontal: 15
    },
    infoName: {
        fontSize: 20,
        fontWeight: "bold",
    },
    infoSub: {
        marginTop: 5,
        fontSize: 14,
        color: "#a8a8a8"
    },
    viewBox: {
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 5,
        marginBottom: 15,
        flexDirection: "row"
    },
    viewCount: {
        fontSize: 14,
        width: "50%"
    },
    viewAuto: {
        alignItems: "flex-start",
        width: "50%",
        flexDirection: "row-reverse"
    },
    viewAutoSwift: {
        paddingLeft: 0
    },
    viewAutoText: {
        fontWeight: "700",
        fontSize: 16,
        paddingRight: 10,
        paddingTop: 2
    },
    relateText: {
        color: "#000",
        fontSize: 16,
        textAlign: "left",
        width: (windowWidth / 2) - 20,
        fontWeight: "700",
        marginBottom: 5
    },
    relateSub: {
        color: '#7f7f7f',
        fontSize: 14,
        width: (windowWidth / 2) - 20,
    }
});

export const PlayerStyle = StyleSheet.create({
    videoBox: {
        width: windowWidth,
        height: windowWidth * (9/16)
    },
    videoPlayer: {
        width: windowWidth,
        height: windowWidth * (9/16)
    },
    videoBoxFS: {
        width: windowHeight,
        height: windowWidth,
    },
    videoPlayerFS: {
        width: windowHeight,
        height: windowWidth,
        backgroundColor: "#000"
    },
    controlOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'space-between',
    },
    bottomControl: {
        flexDirection: "row",
        flexWrap: "nowrap",
    },
    sliderControl: {
        width: "90%",
        alignItems: "flex-end"
    },
    slider: {
        width: "95%"
    },
    fullscreenControl: {
        width: "10%",
        alignItems: "center",
        justifyContent: "center"
    },
    controlCenter: {
        alignItems: "center"
    },
    // Control Full Screen
    controlOverlayFS: {
        width: windowHeight,
        height: windowWidth,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'space-between',
    },
});

export const MenuStyle = StyleSheet.create({
    headerBox: {
        height: 70,
        paddingBottom: 5
    },
    menuBg: {
        height: 70
    },
    menu: {
        position: "absolute",
        top: 55,
        left: 35,
        backgroundColor: '#fff',
        borderRadius: 6,
        width: 0,
        paddingHorizontal: 5,
        height: 0,
        overflow: "hidden",
        zIndex: 1000
    },
    menuItem: {
        flexDirection: "row",
        flexWrap: "nowrap",
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        height: 50
    },
    menuImage: {
        width: 30,
        height: 30,
        resizeMode: 'stretch',
    },
    menuTitle: {
        paddingLeft: 15,
        paddingTop: 4
    },
    overlay: {
        position: "absolute",
        width: screenWidth,
        height: screenHeight,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
})

export const HomeStyle = StyleSheet.create({
    carouselImage: {
        height: windowWidth * (9/16),
        width: windowWidth,
    },
    carousel: {
        zIndex: 0
    },
    carouselDot: {
        width: windowWidth,
        position: "absolute",
        zIndex: 10,
        top: windowWidth * (9/16) - 60,
    },
    homeBg: {
        flex: 1,
        resizeMode: 'cover',
    },
    rankTitle: {
        width: windowWidth,
        textTransform: "uppercase",
        color: "#fcf02f",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 15,
        marginBottom: 15
    },
    rankBox: {
        flex: 1,
        flexDirection: 'column',
    },
    rankItem: {
        flex: 1,
        marginBottom: 20,
        flexDirection: "row"
    },
    rankImage: {
        width: windowWidth / 2,
        height: (windowWidth / 2) * (9/16),
        resizeMode: 'stretch',
        borderRadius: 8
    },
    rankItemLeft: {
        flexGrow: 1
    },
    rankItemRight: {
        flexGrow: 1,
        paddingLeft: 20,
    },
    rankItemName: {
        color: "#fff",
        fontSize: 16,
        textAlign: "left",
        width: (windowWidth / 2) - 20,
        fontWeight: "700",
        marginBottom: 5
    },
    rankItemImage: {
        width: 40,
        height:32,
        resizeMode: "stretch",
        marginBottom: 10
    },
    rankItemSub: {
        color: '#a8a8a8',
        fontSize: 14,
        width: (windowWidth / 2) - 20,
    },
    rankViewMore: {
        color: '#fff',
        width: windowWidth,
        textAlign: "center",
        fontSize: 16,
        paddingBottom: 10
    },
    cateSlide: {
        marginTop: 20
    },
    cateSlideImage: {
        height: (windowWidth * 0.55) * (331/449),
        width: (windowWidth * 0.55)
    },
    cateBox: {
        marginTop: 40
    },
    cateTitle: {
        position: "relative"
    },
    cateTitleImage: {
        position: "absolute",
        left: 15,
        bottom: 5,
        width: 40,
        height: 40
    },
    cateTitleText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 65
    },
    cateContent: {
        backgroundColor: '#fff',
        borderRadius: 6,
        marginTop: 15
    },
    cateSongBox: {
        marginTop: 30,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    cateSongItemLeft: {
        width: (windowWidth * 0.5) - 10,
        marginBottom: 20,
        marginRight: 10
    },
    cateSongTextLeft: {
        paddingLeft: 10,
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 5,
    },
    cateSongSubLeft: {
        paddingLeft: 10,
        fontSize: 12,
        color: "#737376"
    },
    cateSongItemRight: {
        width: (windowWidth * 0.5) - 10,
        marginBottom: 20,
        marginLeft: 10
    },
    cateSongTextRight: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 5,
    },
    cateSongSubRight: {
        fontSize: 12,
        color: "#737376"
    },
    cateSongImage: {
        width: (windowWidth * 0.5 - 10),
        height: (windowWidth * 0.5 - 10) * (9/16)
    },
    cateSingerSlide: {
        marginTop: 20,
        marginBottom: 20
    },
    cateSingerSlideImage: {
        height: (windowWidth * 0.3 - 10),
        width: (windowWidth * 0.3 - 10),
        borderRadius: 100,
        borderColor: "#ffff77",
        borderWidth: 3,
        margin: 5
    },
    cateSingerSlideText: {
        width: (windowWidth * 0.3),
        textAlign: "center",
        fontWeight: "bold"
    }
})

export const RankStyle = StyleSheet.create({
    homeBg: {
       width: windowWidth,
       height: windowHeight - 50
    },
    textRank: {
        fontSize: 40,
        color: '#fff',
        lineHeight: 40
    }
});

export const CategoryStyle = StyleSheet.create({
    cateBox: {
        flexDirection: "row",
        flex: 1,
        flexWrap: "wrap"
    },
    cateItemLeft: {
        width: "50%",
        height: ((windowWidth - 40) / 2) * (331/449),
        paddingLeft: 15,
        paddingRight: 5,
        marginBottom: 15,
    },
    cateItemRight: {
        width: "50%",
        height: ((windowWidth - 40) / 2) * (331/449),
        paddingLeft: 5,
        paddingRight: 15,
        marginBottom: 15,
    },
    cateImg: {
        resizeMode: "stretch",
        width: "100%",
        height: "100%"
    }
});
