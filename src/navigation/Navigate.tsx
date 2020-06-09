import * as React from 'react';
import Tab from "./Tab";
import Stack from "./Stack";
import {NavigationContainer} from "@react-navigation/native";

const Navigate: React.FunctionComponent = props => {
    return (
        <NavigationContainer>
            <Stack/>
        </NavigationContainer>
    )
}

export default Navigate
