import React, {useEffect} from 'react';
import { WebView } from 'react-native-webview';

const Package: React.FunctionComponent = props => {

    return (
        <WebView
            source={{ uri: 'http://ibolero.vn/goi-cuoc?link=' }}
            style={{ marginTop: 0 }}
        />
    )

}

export default Package
