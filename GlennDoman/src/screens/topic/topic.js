import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { iconsMap } from '../../utils/appIcon';

const actions = [{
    text: 'Add Topic',
    name: 'bt_add_topic',
    position: 1,

},{
    text: 'Edit Topic',
    // icon: require('./images/ic_accessibility_white.png'),
    name: 'bt_edit-topic',
    position: 2
}];

export default class Topic extends Component {

    onPressFab(name) {
        switch (name) {
            case 'bt_add_topic':
            this.props.navigator.push({
                screen: 'kids.AddTopic',
                title: 'Add Topic'
            })
            break;
            case 'bt_edit-topic':
            break;
        }
    }
    render() {
        return (
            <View style={{ flex: 1, padding: 16 }}>
                <View>
                </View>
                <FloatingAction showBackground={false}
                    actions={actions}
                    onPressItem={
                        (name) => {
                            this.onPressFab(name)
                        }
                    }
                />
            </View>
        );
    }
}