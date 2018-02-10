import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Realm from 'realm';

export default class Lesson extends Component {
    componentDidMount() {
        
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Lesson</Text>
            </View>
        );
    }
}