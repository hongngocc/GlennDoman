import React, { Component } from 'react';
import { iconsMap, iconsLoaded } from './utils/appIcon';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import configureStore from './store/configureStore';
import { Provider, connect } from 'react-redux';
import globalStyle from './globalStyle';
import { initData } from '../src/utils/initData';

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
        initData();
    }

    callbackAfterLogin() {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    label: 'Lesson',
                    screen: 'kids.Lesson',
                    icon: iconsMap['ios-book'],
                    title: 'Lesson',
                    navigatorStyle: globalStyle.navigatorStyle
                },
                {
                    label: 'History',
                    screen: 'kids.History',
                    icon: iconsMap['ios-timer'],
                    title: 'History',
                    navigatorStyle: globalStyle.navigatorStyle
                },
                {
                    label: 'Topic',
                    screen: 'kids.Topic',
                    icon: iconsMap['ios-list-box'],
                    title: 'Topic',
                    navigatorStyle: globalStyle.navigatorStyle
                },
                {
                    label: 'Settings',
                    screen: 'kids.Settings',
                    icon: iconsMap['ios-settings'],
                    title: 'Settings',
                    navigatorStyle: globalStyle.navigatorStyle
                }
            ],
            tabsStyle: globalStyle.tabsStyle,
            appStyle: globalStyle.tabsStyle
        });
    }
}