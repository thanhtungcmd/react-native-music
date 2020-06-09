import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tab from "./Tab";
import Demo from "../component/Demo";
import {NavigationContainer} from "@react-navigation/native";

const Stack = createStackNavigator();

const StackView: React.FunctionComponent = () => {

    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Tab" component={Tab} />
            <Stack.Screen name="Demo" component={Demo} />
        </Stack.Navigator>
    )

}

export default StackView
