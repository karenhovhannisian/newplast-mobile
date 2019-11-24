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
    container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        // shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        borderRadius: 30,
        marginTop: '1%',
        marginLeft: '7.5%',
        width: '85%',
        // textAlign: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        // alignItems: 'center',
        // justifyContent: 'center',

    },
    touchable: {
        fontSize: 24,
        color: 'white',
        width: 60,
        textAlign: 'center',
        height: 40,
        borderWidth: 0.5,
        borderColor: '#161616',
        borderRadius: 10,
        marginTop: 30,
        backgroundColor: 'blue',
    },
    containerC4Image: {
        position: 'absolute',
        left: -10,
        top: 50,
        zIndex: 99999
    },
    addToCartText: {
        zIndex: 99999,
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
    },
    addToCartImg: {
        width: 25,
        height: 25
    },
    addToCartButton: {
        zIndex: 99999,
        left: 1,
        color: 'white',
        height: 40,
        backgroundColor: '#db524b',
        borderRadius: 20,
        width: 300,
        marginTop: 1,
        display: 'flex',
        alignItems: 'center',
    },
    addToCartButtonOp: {
        // opacity: 0.5,
        left: 1,
        // color: 'white',
        height: 40,
        backgroundColor:'rgba(255, 0, 0, 0.4)',
        borderRadius: 20,
        width: 300,
        marginTop: 1,
        display: 'flex',
        alignItems: 'center',
    },
    renderItemContainer: {
        justifyContent: 'center',
        // alignItems: 'center',
        width: '80%',
        flexDirection:'row',
        // position: 'relative',
        height: '90%'
    },
    renderItemContent: {
        justifyContent: 'center',
        width: '50%',
    },
    renderItemContentResponsive: {
        // alignItems: 'center',
        width: '85%',
        flexDirection:'row',
        justifyContent: 'space-between',
        marginLeft: '5%',
        marginTop: 20,
        // position: 'relative',
    },
    productsNameContainer: {
        width:'60%',
        zIndex: 99999
    },
    productsName: {
        width: 500,
        fontSize: responsiveFontSize(1),
        color: '#072C7D',
        fontWeight: 'bold',
        marginBottom:10
    },
    chooseSize: {
        fontSize: 20,
        color: '#161616',
        fontWeight: 'bold'
    },
    balanceText: {
        fontSize: 20,
        color: '#161616',
        fontWeight: 'bold',
        marginTop:10
    },
    costContainer: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    costText: {
        fontSize: 18,
        color: '#161616',
        left: 158,
        fontWeight: 'bold',
        // marginBottom: 15,
        // marginTop: -50
    },
    costCount: {
        left: 420,
        height: 60,
        marginBottom:-60,
        backgroundColor: '#072C7D',
        borderBottomLeftRadius: 35,
        borderTopLeftRadius: 35,
        width: 200,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent:'center'
    },
    costCountText: {
        flexDirection: 'row',
        justifyContent:'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(1),
    },

    modalVisible: {
        width: 80,
        height: 80,
        position: 'absolute',
        right: -30,
        top: 80,
        zIndex: 99999,
    },
    modalVisibleClose: {
        width: 50,
        height: 50,
        backgroundColor: '#072C7D',
        position: 'absolute',
        right: 10,
        top: 12,
        alignItems: 'center',
        justifyContent: 'center'
    }


});

export default styles;
