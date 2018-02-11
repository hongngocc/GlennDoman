import { Platform, StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
import config from '../../../config';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    wordContainer: {
        width: calc((width - 48) / 3),
        height: calc((width - 48) / 3)
    }
});

export default styles;
