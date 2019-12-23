import React from 'react';
import {createAppContainer} from 'react-navigation';
import store from "./src/redux/store";
import Navigator from "./src/navigator";
import {Provider} from 'react-redux';
import LoggedInLayout from "./src/layouts/LoggedInLayout";
import LogOut from "./src/components/LogOut";
console.disableYellowBox = true;

const MainNavigator = createAppContainer(Navigator);

const App = () => {
    return (
            <Provider store={store}>
                <MainNavigator/>
            </Provider>
    )
};


export default App;
