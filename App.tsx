import React from 'react';
import Navigate from './src/navigation/Navigate'
import store from './src/store/index.store'
import { Provider } from "react-redux"

const App: React.FunctionComponent = props => {

    return (
        <Provider store={store}>
            <Navigate/>
        </Provider>
    )

}

export default App
