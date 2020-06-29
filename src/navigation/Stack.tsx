import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tab from "./Tab";
import Demo from "../component/Demo";
import Play from "../component/Play";
import CateItem from "../component/CateItem";
import SingerItem from "../component/SingerItem";
import Login from "../component/Login";

const Stack = createStackNavigator();

const StackView: React.FunctionComponent = () => {

    return (
        <Stack.Navigator headerMode="none" mode="modal">
            <Stack.Screen name="Tab" component={Tab} />
            <Stack.Screen name="Play" component={Play} />
            <Stack.Screen name="CateItem" component={CateItem} />
            <Stack.Screen name="SingerItem" component={SingerItem} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    )

}

export default StackView
