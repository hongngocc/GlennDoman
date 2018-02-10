import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Lesson extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Lesson</Text>
            </View>
        );
    }
}