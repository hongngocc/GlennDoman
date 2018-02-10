import { Platform, StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
import config from '../../../config';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    card: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    text: {
        textAlign: 'center',
        fontSize: 50,
        backgroundColor: 'transparent'
    },
    swipeSymbol: {
        width: '100%',
        flexDirection: 'row',
        top: 10,
        paddingHorizontal: config.paddingSize
    }
});

export default styles;
