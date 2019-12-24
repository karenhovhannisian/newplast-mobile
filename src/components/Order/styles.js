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
        height: '88%',
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection:'column',
        display: 'flex'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F7F7F9',
        width: '100%',
        height: 110
    },
    pickerView: {
        height: 50,
        width: '20%',
        borderRadius: 35,
        marginLeft:'1%'
    },
    pickerView1: {
        height: 50,
        width: '20%',
        backgroundColor: 'white',
        borderRadius: 35,
        marginLeft:'20%'
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
    text: { margin: 6,textAlign: 'center', fontSize: 18, color: '#072C7D',fontWeight:'bold', width:'95%' },
    texts: {width:'15%', paddingTop:30 ,flexDirection:'row',justifyContent:'space-between',marginLeft:30, paddingBottom:30 ,fontWeight: '100', fontSize: 18,color:'#072C7D' },
    textss: { paddingTop:30 ,width:'25%', paddingBottom:30 ,fontWeight: '100', alignItems: 'center',  fontSize: 18,color:'#072C7D' },
    row: {  backgroundColor: '#F7F7F9', width: '100%',borderBottomColor: '#BAC5DC',borderBottomWidth: 1, },
    btn: { width: '100%', height: 40,padding:15, borderWidth: 2,  borderRadius: 35, marginLeft: 0, borderColor:'#072C7D',alignItems:'center',flexDirection:'row' },
    btnText: { textAlign: 'center',justifyContent: 'center', color: '#072C7D', fontSize: 15, alignItems:'center'},
    dataWrapper: {  height:'90%' },
    headerTable: { height: 60, backgroundColor: '#C1CFEC',},
});

export default styles
