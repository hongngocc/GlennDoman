import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import globalStyle from '../../globalStyle';
import config from '../../config';
import styles from './style/settings';
import { Switch } from 'react-native-switch';
import Ionicons from 'react-native-vector-icons/Ionicons';



// , backgroundColor: 'red'
const arrColor = ['#123123', '#e213dc', '#d11334', '#435fde', '#123dca'];
export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateSwitch: false,
            stateColor: arrColor[0]
        }
    }
    renderColorPicker(arrColor) {
        console.log(arrColor)
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
    render() {
        return (
            <View style={{ flex: 1, marginTop: 56 }}>
                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: this.state.stateColor, paddingBottom: 24 }}>
                        <Text style={[globalStyle.textMain, { marginLeft: 16, color: '#ffffff', fontWeight: 'bold' }]}>Text Setting</Text>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[globalStyle.textMain, { marginLeft: 16, color: '#ffffff', fontSize: 112 }]}>{this.state.stateSwitch ? 'AB' : 'ab'}</Text>
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
                        <Text style={[globalStyle.textMain, { marginLeft: 16, color: '#CED8E6', fontWeight: 'bold' }]}>General Settings</Text>
                        <View style={{ flex: 1, paddingLeft: 12, paddingRight: 12 }}>
                            <View style={{ height: 75 }}>
                                <Text style={[globalStyle.textSubLight, { color: 'gray', fontWeight: 'light' }]}> Color</Text>
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
                            <View style={{ height: 75 }}>
                                <Text style={[globalStyle.textSubLight, { color: 'gray', fontWeight: 'light' }]}>Number of words learned / Day</Text>
                                <View style={{ flexDirection: 'row', marginTop: 4, marginBottom: 4 }}>

                                    <TouchableOpacity >
                                        <View style={[styles.circle, { backgroundColor: config.color.disableColor, marginLeft: 8 }]}>
                                            <Ionicons name='ios-add' size={40} color='white' />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '100%', backgroundColor: '#465260', opacity: 0.3, height: 2 }}></View>
                            </View>
                            <View style={{ height: 75 }}>
                                <Text style={[globalStyle.textSubLight, { color: 'gray', fontWeight: 'light' }]}>Number of new words/ Day</Text>
                                <View style={{ flexDirection: 'row', marginTop: 4, marginBottom: 4 }}>

                                    <TouchableOpacity >
                                        <View style={[styles.circle, { backgroundColor: config.color.disableColor, marginLeft: 8 }]}>
                                            <Ionicons name='ios-add' size={40} color='white' />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '100%', backgroundColor: '#465260', opacity: 0.3, height: 2 }}></View>
                            </View>
                            <View style={{ height: 75 }}>
                                <Text style={[globalStyle.textSubLight, { color: 'gray', fontWeight: 'light' }]}>Languages</Text>
                                <View style={{ flexDirection: 'row', marginTop: 4, marginBottom: 4 }}>

                                    <TouchableOpacity >
                                        <View style={[styles.circle, { backgroundColor: config.color.disableColor, marginLeft: 8 }]}>
                                            <Ionicons name='ios-add' size={40} color='white' />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '100%', backgroundColor: '#465260', opacity: 0.3, height: 2 }}></View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}