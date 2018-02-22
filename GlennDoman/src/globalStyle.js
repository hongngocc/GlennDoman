import { PixelRatio, Platform } from 'react-native';
import font from './font/font';
import config from './config';

export default {
    textMain: {
        opacity: font.opacity1,
        fontFamily: font.fontFamily,
        fontSize: font.fontSizeL,
        color: font.fontColor
    },
    textMainMedium: {
        opacity: font.opacity1,
        fontFamily: font.fontMedium,
        fontSize: font.fontSizeXL,
        fontWeight: '500',
        color: font.fontColor
    },
    textSubLight: {
        opacity: font.opacity3,
        fontFamily: font.fontLight,
        fontSize: font.fontSizeM,
        color: font.fontColor
    },
    textHugoCard: {
        opacity: font.opacity1,
        fontFamily: font.fontMedium,
        color: font.fontColor,
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 64,
        backgroundColor: 'transparent'
    },
    textWordCard: {
        opacity: font.opacity1,
        fontFamily: font.fontMedium,
        color: font.fontColor,
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 24,
        backgroundColor: 'transparent'
    },
    navigatorStyle: {
        statusBarColor: config.background.statusBar,
        navBarBackgroundColor: config.background.navBar,
        navBarTranslucent: false,
        drawUnderNavBar: true,
        navBarHideOnScroll: false,
        navBarTextColor: config.color.navText,
        navBarTextFontFamily: config.font.navFont,
        navBarTextFontSize: config.font.navSize,
        navBarButtonColor: config.background.navButton,
        statusBarTextColorScheme: 'light',
        drawUnderTabBar: false,
        navBarTextFontBold: true
    },
    navigatorNoTabStyle: {
        statusBarColor: config.background.statusBar,
        navBarBackgroundColor: config.background.navBar,
        navBarTranslucent: false,
        drawUnderNavBar: true,
        navBarHideOnScroll: false,
        tabBarHidden: true,
        topBarElevationShadowEnabled: false,
        navBarTextColor: config.color.navText,
        navBarTextFontFamily: config.font.navFont,
        navBarTextFontSize: config.font.navSize,
        navBarButtonColor: config.background.navButton,
        statusBarTextColorScheme: 'light',
        drawUnderTabBar: false,
        navBarTextFontBold: true
    },
    navigatorNoHeaderStyle: {
        statusBarColor: config.background.statusBar,
        navBarHidden: true
    },
    tabsStyle: {
        tabBarButtonColor: config.color.disableColor,
        tabBarSelectedButtonColor: config.color.mainColor,
        tabBarBackgroundColor: config.background.tabBar,
        initialTabIndex: 0
    }
}