import * as React from 'react';
import {
    Text, View, TouchableOpacity, Image, ImageBackground,
    TouchableHighlight
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabNavigation } from '../asset/style';
import Demo from "../component/Demo";
import Home from "../component/Home";
import Rank from "../component/Rank";

const Tab = createBottomTabNavigator();

const TabRender: React.PropsWithChildren<any> = (props: any) => {

    const renderTabItem = () => {
        return props.state.routes.map((item: any, key: number) => {
            let icon;
            let isFocused = (props.state.index == key);

            switch (item.name) {
                case "TRANG CHỦ":
                    icon = (
                        <View style={ TabNavigation.tabIcon }>
                            <Image style={ TabNavigation.tabImage }
                                   source={ isFocused ? require('../asset/img/icon-home-a.png') : require('../asset/img/icon-home.png') } />
                        </View>
                    );
                    break;

                case "BXH":
                    icon = (
                        <View style={ TabNavigation.tabIcon }>
                            <Image style={ TabNavigation.tabImage }
                                   source={ isFocused ? require('../asset/img/icon-bxh-a.png') : require('../asset/img/icon-bxh.png') } />
                        </View>
                    );
                    break;

                case "CHỦ ĐỀ":
                    icon = (
                        <View style={ TabNavigation.tabIcon }>
                            <Image style={ TabNavigation.tabImage }
                                   source={ isFocused ? require('../asset/img/icon-cate-a.png') : require('../asset/img/icon-cate.png') } />
                        </View>
                    );
                    break;

                case "CA SĨ":
                    icon = (
                        <View style={ TabNavigation.tabIcon }>
                            <Image style={ TabNavigation.tabImageSinger }
                                   source={ isFocused ? require('../asset/img/icon-singer-a.png') : require('../asset/img/icon-singer.png') } />
                        </View>
                    );
                    break;

                case "IBOLERO":
                    icon = (
                        <View style={ TabNavigation.tabIcon }>
                            <Image style={ TabNavigation.tabImage }
                                   source={ isFocused ? require('../asset/img/icon-bolero-a.png') : require('../asset/img/icon-bolero.png') } />
                        </View>
                    );
                    break;
            }
            return (
                <TouchableOpacity key={key} style={ TabNavigation.tabTouch }
                                  onPress={ () => props.navigation.navigate(item.name) }>
                    { icon }
                    <Text style={ isFocused ? TabNavigation.tabTextActive : TabNavigation.tabText }>
                        { item.name }
                    </Text>
                </TouchableOpacity>
            )
        });
    }

    return (
        <View style={ TabNavigation.tabBox }>
            <ImageBackground source={ require('../asset/img/tab-bg.png') } style={ TabNavigation.tabBg }>
                { renderTabItem() }
            </ImageBackground>
        </View>
    )

}

const TabView: React.FunctionComponent = props => {

    return (
        <Tab.Navigator tabBar={ props => <TabRender {...props} /> }>
            <Tab.Screen name="TRANG CHỦ" component={ Home }/>
            <Tab.Screen name="BXH" component={ Rank }/>
            <Tab.Screen name="CHỦ ĐỀ" component={ Demo }/>
            <Tab.Screen name="CA SĨ" component={ Demo }/>
            <Tab.Screen name="IBOLERO" component={ Demo }/>
        </Tab.Navigator>
    )

}

export default TabView;
