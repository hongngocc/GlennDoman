import { Navigation } from 'react-native-navigation';

import FirstTabScreen from './FirstTabScreen';
import SecondTabScreen from './SecondTabScreen';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
    Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen, store, Provider);
    Navigation.registerComponent('example.SecondTabScreen', () => SecondTabScreen, store, Provider);
}