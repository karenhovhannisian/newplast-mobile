import {StyleSheet} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    animatedLoader:   {
    flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
},
    touchable : {
        fontSize: 25,
        color: 'black',
        width:350,
        textAlign: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: '#F2F2F2',
        borderRadius: 20,
        marginTop: 20,
        backgroundColor: '#F2F2F2',
    },
    sectionContainer: {
        width: responsiveWidth(50),
        height: responsiveHeight(37),
        borderRadius: 30,
        elevation: 25,
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign:'center',
        marginBottom: 170,
        marginTop: 30,
        backgroundColor: '#f0f8ff',
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
    },
    sectionTitle: {
        alignItems: 'center',
        zIndex:99999,
        elevation: 25,

    },
    passwordInput: {
        width: responsiveWidth(35),
        height: responsiveHeight(8),
        borderColor: '#F2F2F2',
        backgroundColor: '#F2F2F2',
        borderWidth: 1,
        borderRadius: 25,
        marginBottom: 50,
        fontSize: 20,

    },
    loginInput: {
        width: responsiveWidth(35),
        height: responsiveHeight(8),
        color: "black",
        marginTop: 60,
        marginBottom:20,
        fontSize: 20,
        borderColor: '#F2F2F2',
        backgroundColor: '#F2F2F2',
        borderWidth: 1,
        borderRadius: 25
    },
});

export default styles
