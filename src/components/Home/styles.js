import {StyleSheet} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {responsiveHeight, responsiveWidth} from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    containers: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },

    container: {
        marginTop: 130,
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        padding: responsiveWidth(5)
    },
    sectionContainer: {
        elevation: 24,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: responsiveWidth(18),
        height: responsiveHeight(30),
        marginTop: 205,
        backgroundColor: '#f8f8ff',
        transform: [{rotate: '45deg'}],
    },
    sectionTitle: {
        borderRadius: 18,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: responsiveWidth(18),
        height: responsiveHeight(30),
        backgroundColor: '#f8f8ff',
        marginBottom: 250,
        transform: [{rotate: '45deg'}],
        elevation: 24,

    },
    section3: {
        borderRadius: 18,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: responsiveWidth(18),
        height: responsiveHeight(30),
        backgroundColor: '#f8f8ff',
        marginTop: 205,
        transform: [{rotate: '45deg'}],
        elevation: 24,

    },
});

export default styles
