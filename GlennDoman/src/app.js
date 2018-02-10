import React, { Component } from 'react';
import { iconsMap, iconsLoaded } from './utils/appIcon';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import configureStore from './store/configureStore';
import { Provider, connect } from 'react-redux';

const store = configureStore();
registerScreens(store, Provider);

export default class App extends Component {
    constructor(props) {
        super(props);
        iconsLoaded.then(() => {
            console.log('load icon success');
            this.callbackAfterLogin();
        }).catch(error => {
            console.log('load icon failed: ', error);
        });
    }

    callbackAfterLogin() {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    label: 'One',
                    screen: 'example.FirstTabScreen', // this is a registered name for a screen
                    icon: iconsMap['ios-film'],
                    //   selectedIcon: require('../img/one_selected.png'), // iOS only
                    title: 'Screen One'
                },
                {
                    label: 'Two',
                    screen: 'example.SecondTabScreen',
                    icon: iconsMap['ios-film'],
                    //   selectedIcon: require('../img/two_selected.png'), // iOS only
                    title: 'Screen Two'
                }
            ]
        });
    }
}