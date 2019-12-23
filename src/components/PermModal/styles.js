import {StyleSheet} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    container: {
        height: '100%',
        backgroundColor: '#F7F7F9',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize:20,
        color:'blue'
    },
    imgStyle: {
        fontSize: 25,
        marginRight:20,
        marginTop:7,
        marginBottom:'5%'
    }
});

export default styles
