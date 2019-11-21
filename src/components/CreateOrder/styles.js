import {StyleSheet} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    touchable: {
        fontSize: 10,
        color: 'white',
        width: 110,
        textAlign: 'center',
        height: 20,
        borderWidth: 0.5,
        borderColor: 'green',
        borderRadius: 20,
        marginTop: 10,
        backgroundColor: 'blue',
    },
    container: {
        backgroundColor: '#072C7D',
        borderRadius: 40,
        margin: 35,
        display: 'flex',
        flex: 1,
        textAlign: 'center',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    sectionContainer: {
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: 120,
        height: 100,
        marginTop: 50,
        backgroundColor: '#f8f8ff',
    },
    sectionTitle: {
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 100,
        backgroundColor: '#f8f8ff',
        marginTop: 30,
    },
    section3: {
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 100,
        backgroundColor: '#f8f8ff',
        marginTop: 30,
    },
});

export default styles;
