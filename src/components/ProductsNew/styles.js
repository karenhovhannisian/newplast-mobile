import {Dimensions, StyleSheet} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

const SCREEN_WIDTH = Dimensions.get("window").width;
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
        borderRadius: 25,
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
        width:90,
        height:60,
        position: 'absolute',
        left: 86,
        elevation: 24,
        top: 40,
        zIndex: 99999
    },
    addToCartText: {
        marginLeft:15,
        textAlign:'center',
        zIndex: 99999,
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
    },
    addToCartImg: {
        marginLeft:10,
        marginTop:5,
        width: 25,
        height: 20
    },
    addToCartButton: {
        flexDirection:'row',
        left: 1,
        height: 50,
        backgroundColor: '#F20732',
        borderRadius: 10,
        width: 305,
        display: 'flex',
        alignItems: 'center',
    },
    addToCartButtonOp: {
        flexDirection:'row',
        left: 1,
        height: 50,
        backgroundColor: '#F2727D',
        borderRadius: 10,
        width: 305,
        display: 'flex',
        alignItems: 'center',
    },
    renderItemContainer: {
        justifyContent: 'space-between',
        // alignItems: 'center',
        width: '80%',
        flexDirection: 'row',
        // position: 'relative',
        height: '90%'
    },
    renderItemContent: {
        justifyContent: 'center',
        width: '100%',
        alignItems:'center',
        flexDirection:'column',
    },
    renderItemContentResponsive: {
        // alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: '15%',
        marginTop: 20,
        // position: 'relative',
    },
    productsNameContainer: {
        width: '50%',
        zIndex: 99999,
        elevation: 24
    },
    productsName: {
        width: 500,
        fontSize: responsiveFontSize(1),
        color: '#072C7D',
        fontWeight: 'bold',
        marginBottom: 10
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
        marginTop: 10
    },
    costContainer: {
        marginTop: 15,
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
        position: 'absolute',
        left: 0,
        bottom: -20,
        height: 60,
        borderTopLeftRadius: 35,
        width: 250,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    costCountResponsive: {
        position: 'absolute',
        right: -200,
        top: 620,
        height: 60,
        borderTopLeftRadius: 35,
        width: 250,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    costCountText: {
        flexDirection: 'row',
        justifyContent: 'center',
        color: '#154CC4',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(2),
    },

    costCountTexts: {
        flexDirection: 'row',
        justifyContent: 'center',
        color: '#154CC4',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(1),
    },

    modalVisible: {
        right: -8,
        position: 'absolute',
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
    },


    scrollPage: {
        width: SCREEN_WIDTH,
        padding: 20
    },
    screen: {
        height: 600,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        backgroundColor: "white"
    },
    text: {
        fontSize: 45,
        fontWeight: "bold"
    },


    box: {
        width: '100%'
    }

});

export default styles;
