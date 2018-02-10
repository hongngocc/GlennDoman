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
    tabsStyle: {
        tabBarButtonColor: config.color.disableColor,
        tabBarSelectedButtonColor: config.color.mainColor,
        tabBarBackgroundColor: config.background.tabBar,
        initialTabIndex: 0
    }
}