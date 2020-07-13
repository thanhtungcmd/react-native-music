import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { WebView } from 'react-native-webview';
import AsyncStorage from "@react-native-community/async-storage";
import {windowHeight, windowWidth} from "../asset/style";

const INJECTEDJAVASCRIPT = "document.body.style.userSelect = 'none'";

const Tutor: React.FunctionComponent = props => {
    return (
        <WebView
            source={{ uri: 'http://ibolero.vn/app/gioi-thieu?link=' }}
            injectedJavaScript={INJECTEDJAVASCRIPT}
            style={{ marginTop: 0, marginBottom: 120 }}
        />
    )
}

const Package: React.FunctionComponent = props => {

    const [phone, setPhone] = useState<any>(null);

    useEffect(() => {
        const getPhone = async () => {
            let msisdn = await AsyncStorage.getItem('@msisdn') as string;
            setPhone(msisdn);
        }
        getPhone()
        console.log(phone);
    });

    if (phone) {
        return (
            <WebView
                source={{uri: 'http://ibolero.vn/app/goi-cuoc?link=&phone=' + phone}}
                injectedJavaScript={INJECTEDJAVASCRIPT}
                style={{marginTop: 0, marginBottom: 120}}
            />
        )
    } else {
        return (
            <WebView
                source={{uri: 'http://ibolero.vn/app/goi-cuoc?phone=' + phone}}
                injectedJavaScript={INJECTEDJAVASCRIPT}
                style={{marginTop: 0, marginBottom: 120}}
            />
        )
    }

}

const initialLayout = { width: Dimensions.get('window').width };

export default function TabViewExample() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Giới thiệu dịch vụ' },
        { key: 'second', title: 'Danh sách gói cước' },
    ]);

    const renderScene = SceneMap({
        first: Tutor,
        second: Package,
    });

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#000' }}
            style={{ backgroundColor: '#fff' }}
            activeColor={"#000"}
            inactiveColor={"#000"}
        />
    );

    return (
        <SafeAreaView>
            <View style={{ width: windowWidth, height: windowHeight }}>
            <TabView
                style={{ width: windowWidth, height: windowHeight }}
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
            />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});
