import {StyleSheet} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor:'#F7F7F9',
        // borderRadius: 30,
    },

    tabStyle: {},
    scrollStyle: {
        backgroundColor: 'white',
        paddingLeft: 65,
        paddingRight: 65,
        // justifyContent: 'center',
    },
    tabBarTextStyle: {
        fontSize: 14,
        fontWeight: 'normal',
    },
    underlineStyle: {
        height: 3,
        backgroundColor: 'red',
        borderRadius: 3,
        width: 15,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F9',
        width: '100%',
        height: 100
    },
    pickerView: {
        marginLeft: '10%',
        height: 50,
        width: '20%',
        backgroundColor: 'white',
        borderRadius: 35
    },
    pickerView1: {
        marginLeft: '40%',
        height: 50,
        width: '20%',
        backgroundColor: 'white',
        borderRadius: 35
    },

    content: {
        backgroundColor: '#f0f8ff',
        marginTop: '2%',
        height: '63.5%',
        marginLeft: '3%',
        width: '93%',
        textAlign: 'center',
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-around',
    },
    content1: {
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        marginTop: '1%',
        marginLeft: '3%',
        width: '93%',
        textAlign: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        // alignItems: 'center',
        justifyContent: 'space-around',
    },
    touchable: {
        fontSize: 18,
        color: 'black',
        width: 70,
        textAlign: 'center',
        height: 25,
        borderRadius: 20,
    },
    containers: {
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
    container: {
        borderRadius: 40,
        margin: 35,
        display: 'flex',
        flex: 1,
        textAlign: 'center',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        flexDirection: 'row',
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

    addText: {
        zIndex: 99999,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    addButton: {
        zIndex: 99999,
        color: 'white',
        height: 40,
        display:'flex',
        lineHeight: 40,
        padding:4,
        alignItems: 'center',
        marginLeft:"11%",
        marginTop: '8%',
        backgroundColor: '#FF0000',
        borderRadius: 20,
        width: 300,
    },
});

export default styles;
