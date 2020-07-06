import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { WebView } from 'react-native-webview';
import AsyncStorage from "@react-native-community/async-storage";

const INJECTEDJAVASCRIPT = "document.body.style.userSelect = 'none'";

const Tutor: React.FunctionComponent = props => {
    return (
        <WebView
            source={{ uri: 'http://ibolero.vn/app/gioi-thieu?link=' }}
            injectedJavaScript={INJECTEDJAVASCRIPT}
            style={{ marginTop: 0 }}
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
    });

    return (
        <WebView
            source={{ uri: 'http://ibolero.vn/app/goi-cuoc?phone=' + phone }}
            injectedJavaScript={INJECTEDJAVASCRIPT}
            style={{ marginTop: 0 }}
        />
    )

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
        <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
        />
    );
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});
