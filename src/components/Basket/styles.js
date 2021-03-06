import {StyleSheet} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#F7F7F9',
    },

    tabStyle: {},
    scrollStyle: {
        backgroundColor: 'white',
        paddingLeft: 65,
        paddingRight: 65,
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
        marginLeft: '3%',
        height: 50,
        width: '20%',
        backgroundColor: 'white',
        borderRadius: 10
    },

    pickerView22: {
        marginLeft: '3%',
        marginRight: '12%',
        height: 50,
        width: '20%',
        backgroundColor: 'white',
        borderRadius: 10
    },
    pickerView2: {
        marginLeft: '3%',
        height: 50,
        width: '20%',
        backgroundColor: 'white',
        borderRadius: 10
    },
    pickerView1: {
        marginLeft: '20%',
        height: 50,
        width: '20%',
        backgroundColor: 'white',
        borderRadius: 10
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
        borderRadius: 10,
        borderColor: '#ddd',
        marginRight: 5,
        marginTop: 10,
        width: '100%',
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
        height: 50,
        display: 'flex',
        lineHeight: 40,
        padding: 8,
        alignItems: 'center',
        marginLeft: "11%",
        marginTop: '8%',
        backgroundColor: '#F20732',
        borderRadius: 10,
        width: 200,
    },
    addButtonDisable: {
        zIndex: 99999,
        color: 'white',
        height: 50,
        display: 'flex',
        lineHeight: 40,
        padding: 8,
        alignItems: 'center',
        marginLeft: "11%",
        marginTop: '8%',
        backgroundColor: '#F2727D',
        borderRadius: 10,
        width: 200,
    }
});

export default styles;
