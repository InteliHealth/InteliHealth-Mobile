import {
    StyleSheet,
    Dimensions
} from 'react-native';
const numColumns = 4;

export default StyleSheet.create({
    container: {
        backgroundColor: "#000",
        flex: 1
    },
    title: {
        color: '#FE7B1D',
        fontSize: 18,
        fontWeight: '700',
        textAlignVertical: 'center',
        marginBottom: 15

    },
    content: {
        flexDirection: 'column',
        backgroundColor: '#393939',
        maxHeight: '80%',
        borderRadius: 5,
        width: '65%',
        padding: 20,
        justifyContent: 'space-evenly',
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    listContainer: {
        flex: 1,
        marginVertical: 20,
    },
    item: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 3,
        height: 50, // approximate a square
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FE7B1D'
    },
    itemInvisible: {
        backgroundColor: 'transparent',
        borderWidth: 0
    },
    itemText: {
        color: '#fff',
    },
    card: {
        backgroundColor: '#393939',
        borderWidth: 1,
        borderColor: '#FE7B1D',
        width: 90,
        height: 90,
        borderRadius: 13,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        elevation: 10,
    },

});