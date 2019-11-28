import React, {useEffect} from "react";
import {View} from "react-native";
import cache from "../../Common/Cache";

const LoggedInLayout = (props) => {

    // const {navigate} = props.navigation;

    useEffect(() => {
        cache.getItem("login", function (err, value) {
            if (!value) {
                // navigate('Home')
            }
        });
    }, []);



    return (
        <View>
            {props.children}
        </View>
    )
};

export default LoggedInLayout
