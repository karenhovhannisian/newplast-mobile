import {StyleSheet} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";


const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    containers: {
        marginLeft: '10%',
        width: '80%',
        backgroundColor: '#1447BB',
        padding:10,
        borderRadius: 50,
        marginTop: 10,
        marginBottom:10,
        display: 'flex',
        // flex: 0,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    container: {
        width: '100%',
        height: '86%',
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection:'column',
        display: 'flex'
    },
    header: {
        flexDirection: 'row',
        // marginLeft: 35,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F7F7F9',
        width: '100%',
        height: 100
    },
    pickerView: {
        height: 50,
        width: '20%',
        backgroundColor: 'white',
        borderRadius: 35
    },
    pickerItemStyle: {
        height: 50,
        width: '20%',
        fontSize:50,
        color: 'blue',
    },



    containerTable: {
        flex: 1,
        padding: 16,
        paddingTop: 10,
        backgroundColor: '#F7F7F9',
    },
    head: {
        height: 65,
        backgroundColor: '#D1D8E7'
    },
    text: { margin: 6,textAlign: 'center', fontSize: 18, color: '#072C7D',fontWeight:'bold'  },
    texts: {width:'25%', paddingTop:30 ,flexDirection:'row',justifyContent:'space-between',marginLeft:30, paddingBottom:30 ,fontWeight: '100', fontSize: 18,color:'#072C7D' },
    row: { flexDirection: 'row', backgroundColor: '#F7F7F9', width: '100%',borderBottomColor: '#BAC5DC',borderBottomWidth: 1, justifyContent:'space-around' },
    btn: { width: '80%', height: 40,padding:3, borderRadius: 35, marginLeft: 20, },
    btnText: { textAlign: 'center',justifyContent: 'center', color: 'red', fontSize: 21 },
    dataWrapper: { marginTop: -1, height:'90%' },
    headerTable: { height: 60, backgroundColor: '#C1CFEC', width: '100%' },
    textss: { paddingTop:30 ,width:'30%', paddingBottom:30 ,fontWeight: '100', alignItems: 'center',  fontSize: 18,color:'#072C7D', marginLeft:'5%' },
    texts1: { paddingTop:30 ,width:'15%', paddingBottom:30 ,fontWeight: '100', alignItems: 'center',  fontSize: 18,color:'#072C7D', marginLeft:'5%' },
    texts2: { paddingTop:30 ,width:'20%', paddingBottom:30 ,fontWeight: '100', alignItems: 'center',  fontSize: 18,color:'#072C7D', marginLeft:'5%' },

});

export default styles
