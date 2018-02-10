import { Platform, StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
import config from '../../../config';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 100 / 2,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;