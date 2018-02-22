import { Platform, StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
import config from '../../../config';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: config.paddingSize,
        paddingVertical: config.paddingSize
    },
    word: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wordContainer: {
        width: (width - 69) / 3,
        height: (width - 69) / 3,
        marginBottom: config.paddingSize - 4
    },
    iconRemove: {
        textAlign: 'center',
        opacity: 0.78,
        position: 'absolute'
    },
    textRemove: {
        textAlign: 'center',
        opacity: 0.78,
        position: 'absolute'
    },
    removeContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 64,
    }
});

export default styles;
