import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class EditLesson extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>EditLesson</Text>
            </View>
        );
    }
}