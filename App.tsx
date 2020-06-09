import React from 'react';
import Tab from './src/navigation/Tab'
import store from './src/store/index.store'
import { Provider } from "react-redux"

const App: React.FunctionComponent = props => {

    return (
        <Provider store={store}>
            <Tab/>
        </Provider>
    )

}

export default App
