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
        paddingTop: 40,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    categoryName: {
        fontWeight: 'bold',
        color: '#072C7D',
        fontSize: 26,
    },
    bodyView: {
        // paddingBottom: 40,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    touchableButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 400,
        height: 55,
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 30,
        backgroundColor: '#FF0000'
    },
    filterSubmit: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white'
    },
    filterSubmitView: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 10
    },
    subCategoriesView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        textAlign: 'left'
    },
    filterCategoriesView: {
        display: 'flex',
        padding: 15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    subCategoriesText: {
        marginLeft:12,
        color: '#072C7D',
        fontSize: 24,
        fontWeight: 'normal'
    }
});

export default styles
