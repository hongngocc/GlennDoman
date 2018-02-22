import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, CheckBox } from 'react-native';
import globalStyle from '../../globalStyle';
import config from '../../config';
import styles from './style/settings';
import { Switch } from 'react-native-switch';
import Ionicons from 'react-native-vector-icons/Ionicons';



// , backgroundColor: 'red'
const arrColor = ['#d34836', '#e213dc', '#d11334', '#435fde', '#123dca'];
export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateSwitch: false,
            stateColor: arrColor[0],
            checkLanguage: [true, false, false]
        }
    }
    renderColorPicker(arrColor) {
        return (
            arrColor.map((item, index) => {
                return (
                    <TouchableOpacity onPress={() => this.handlePickColor(item)}>
                        <View style={[styles.circle, { backgroundColor: item, marginLeft: 8 }]}>
                            {this.state.stateColor === item ? <Ionicons name='ios-checkmark' size={40} color='white' /> : null}
                        </View>
                    </TouchableOpacity>
                )
            }))
    }
    handlePickColor(color) {
        this.setState({
            stateColor: color
        })
    }
    checkLanguage(language) {
        switch (language) {
            case 'US':
                this.setState({
                    checkLanguage: [true, false, false]
                })
                break;
            case 'UK':
                this.setState({
                    checkLanguage: [false, true, false]
                })
                break;
            case 'VN':
                this.setState({
                    checkLanguage: [false, false, true]
                })
                break;
        }
    }
    renderBigText() {
        let text;
        if (this.state.checkLanguage[0]) {
            return this.state.stateSwitch ? text = 'HELLO' : text = 'hello'
        }
        else if (this.state.checkLanguage[1]) {
            return this.state.stateSwitch ? text = 'HELLO' : text = 'hello'
        }
        else if (this.state.checkLanguage[2]) {
            return this.state.stateSwitch ? text = 'CHÀO' : text = 'chào'
        }
        return text;
    }
    render() {
        return (
            <View style={{ flex: 1, marginTop: 56 }}>
                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: this.state.stateColor, paddingBottom: 24 }}>
                        <Text style={[globalStyle.textMain, { marginLeft: 16, color: '#ffffff', fontWeight: 'bold' }]}>Text Setting</Text>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[globalStyle.textMain, { marginLeft: 16, color: '#ffffff', fontSize: 100 }]}>{this.renderBigText()}</Text>
                            <Switch
                                value={this.state.stateSwitch}
                                onValueChange={(val) => this.setState({ stateSwitch: val })}
                                disabled={false}
                                activeText={''}
                                inActiveText={''}
                                circleSize={20}
                                barHeight={20}
                                circleBorderWidth={0}
                                backgroundActive={'#1E59AF'}
                                backgroundInactive={config.color.disableColor}
                                circleActiveColor={config.color.lightBlue}
                                circleInActiveColor={'#ffffff'}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={[globalStyle.textMain, { marginLeft: 16, color: config.color.mainColor, fontWeight: 'bold' }]}>General Settings</Text>
                        <View style={{ flex: 1, paddingLeft: 12, paddingRight: 12 }}>
                            <View style={{ height: 75 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name='ios-color-palette' size={20} color={config.color.mainColor} />
                                    <Text style={[globalStyle.textSubLight, { color: config.color.mainColor, fontWeight: '100', opacity: 1 }]}> Color</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 4, marginBottom: 4 }}>
                                    {this.renderColorPicker(arrColor)}
                                    <TouchableOpacity >
                                        <View style={[styles.circle, { backgroundColor: config.color.disableColor, marginLeft: 8 }]}>
                                            <Ionicons name='ios-add' size={40} color='white' />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '100%', backgroundColor: '#465260', opacity: 0.3, height: 2 }}></View>
                            </View>
                            <View style={{ height: 82 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name='ios-bookmarks' size={20} color={config.color.mainColor} />
                                    <Text style={[globalStyle.textSubLight, { color: config.color.mainColor, fontWeight: '100', opacity: 1 }]}> Languages</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 4, marginBottom: 4, justifyContent: 'space-around' }}>
                                    <View style={{ flexDirection: 'row', marginTop: 4, marginBottom: 4, alignItems: 'center' }}>
                                        <CheckBox
                                            value={this.state.checkLanguage[0]}
                                            onValueChange={() => this.checkLanguage('US')}
                                        />
                                        <Image style={{ width: 64, height: 47, alignSelf: 'center' }} source={require('../../img/UkFlag.png')} />
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 4, marginBottom: 4, alignItems: 'center' }}>
                                        <CheckBox
                                            value={this.state.checkLanguage[1]}
                                            onValueChange={() => this.checkLanguage('UK')}
                                        />
                                        <Image style={{ width: 64, height: 47, alignSelf: 'center' }} source={require('../../img/UsFlag.png')} />
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 4, marginBottom: 4, alignItems: 'center' }}>
                                        <CheckBox
                                            value={this.state.checkLanguage[2]}
                                            onValueChange={() => this.checkLanguage('VN')}
                                        />
                                        <Image style={{ width: 64, height: 47, alignSelf: 'center' }} source={require('../../img/VnFlag.png')} />
                                    </View>
                                </View>
                                <View style={{ width: '100%', backgroundColor: '#465260', opacity: 0.3, height: 2 }}></View>
                            </View>
                            <View style={{ height: 75 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                    <Ionicons name='ios-notifications' size={20} color={config.color.mainColor} />
                                    <Text style={[globalStyle.textSubLight, { color: config.color.mainColor, fontWeight: '100', opacity: 1 }]}> Notifications</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 4, marginBottom: 4, justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View>
                                        <Text style={[globalStyle.textSubLight, { color: config.color.mainColor, fontWeight: '100', marginTop: 4 }]}>Turn On/Off</Text>
                                    </View>
                                    <View>
                                        <Switch
                                            value={true}
                                            // onValueChange={(val) => this.setState({ stateSwitch: val })}
                                            disabled={false}
                                            activeText={''}
                                            inActiveText={''}
                                            circleSize={20}
                                            barHeight={20}
                                            circleBorderWidth={0}
                                            backgroundActive={config.color.mainColor}
                                            backgroundInactive={config.color.disableColor}
                                            circleActiveColor={'#ffffff'}
                                            circleInActiveColor={'#ffffff'}
                                        />
                                    </View>

                                </View>
                                <View style={{ width: '100%', backgroundColor: '#465260', opacity: 0.3, height: 2 }}></View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View >
        );
    }
}