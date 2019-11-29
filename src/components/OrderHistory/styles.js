import {StyleSheet} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    header: {
        width: '100%',
        height: '10%',
        backgroundColor: '#072C7D',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white'
    },
    body: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    containerTable: {
        width: '95%',
        height: '41%',
        padding: 20,
        paddingTop: 8,
    },
    containerTable1: {
        width: '95%',
        height: '45%',
        padding: 20,
        paddingTop: 20,
    },
    head: {
        height: 65,
        backgroundColor: '#D1D8E7'
    },
    text: {
        margin: 6,
        textAlign: 'center',
        fontSize: 18,
        color: '#072C7D',
        fontWeight: 'bold'
    },
    texts: {
        margin: 10,
        fontWeight: '100',
        // textAlign: 'center',
        alignItems: 'center',
        fontSize: 20,
        marginLeft:25,
        color: '#072C7D'
    },
    texts1: {
        margin: 35,
        fontWeight: '100',
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#072C7D',
        width:'20%',

    },
    texts2: {
        width:'35%',
        margin: 35,
        fontWeight: '100',
        // textAlign: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#072C7D'
    },
    row: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-around',
        // width: '100%',
        borderBottomColor: '#BAC5DC',
        borderBottomWidth: 1,
    },
    dataWrapper: {
        marginTop: -1,
        height: '90%'
    },
    headerTable: {
        height: 60,
        flexDirection:'row',
        justifyContent:'space-between',
        textAlign:'center',
        backgroundColor: '#C1CFEC',
        width: '100%'
    },
});
export default styles
