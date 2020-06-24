import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tab from "./Tab";
import Demo from "../component/Demo";
import Play from "../component/Play";

const Stack = createStackNavigator();

const StackView: React.FunctionComponent = () => {

    return (
        <Stack.Navigator headerMode="none" mode="modal">
            <Stack.Screen name="Tab" component={Tab} />
            <Stack.Screen name="Play" component={Play} />
        </Stack.Navigator>
    )

}

export default StackView
