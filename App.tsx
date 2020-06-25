import React, {useEffect} from 'react';
import Navigate from './src/navigation/Navigate'
import store from './src/store/index.store'
import { Provider } from "react-redux"
import Orientation from 'react-native-orientation-locker';

const App: React.FunctionComponent = props => {

    useEffect(() => {
        Orientation.lockToPortrait();
    }, [])

    return (
        <Provider store={store}>
            <Navigate/>
        </Provider>
    )

}

export default App
