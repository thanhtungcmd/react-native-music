import * as React from 'react';
import Tab from "./Tab";
import Stack from "./Stack";
import {NavigationContainer} from "@react-navigation/native";
import {View} from "react-native";
import {ContainerApp} from "../asset/style";

const Navigate: React.FunctionComponent = props => {
    return (
        <View style={ContainerApp.main}>
            <NavigationContainer>
                <Stack/>
            </NavigationContainer>
        </View>
    )
}

export default Navigate
