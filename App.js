import React from 'react';
import {WebView} from 'react-native';
import {createAppContainer} from 'react-navigation';
import store from "./src/redux/store";
import Navigator from "./src/navigator";
import {Provider} from 'react-redux';
console.disableYellowBox = true;

const MainNavigator = createAppContainer(Navigator);

const App = () => {
    return (
        <WebView/>
            // <Provider store={store}>
            //     <MainNavigator/>
            // </Provider>
    )
};


export default App;
