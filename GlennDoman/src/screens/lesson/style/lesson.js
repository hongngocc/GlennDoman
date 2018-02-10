import { Platform, StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
import config from '../../../config';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rowContainer: {
        width: '100%',
        height: 100
    },
    cardContainer: {
        paddingHorizontal: config.paddingSize
    },
    rowContent: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: config.paddingSize
    },
    rightContent: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: config.paddingSize
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32
    }
});

export default styles;