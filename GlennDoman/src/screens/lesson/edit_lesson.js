import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import globalStyle from '../../globalStyle';
import config from '../../config';
import { Card } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

const actions = [{
    text: 'Add Topic',
    name: 'bt_add_topic',
    position: 1,

}, {
    text: 'Edit Topic',
    // icon: require('./images/ic_accessibility_white.png'),
    name: 'bt_edit-topic',
    position: 2
}];

export default class EditLesson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lesson: this.props.lesson
        }
    }

    renderWord(item) {
        return (
            <View>
                <Card>
                    <TouchableOpacity style={{ width: 100, height: 100 }}>
                        <Text>{item}</Text>
                    </TouchableOpacity>
                </Card>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList style={{ marginTop: 56 }}
                    data={this.state.lesson && this.state.lesson.words ? this.state.lesson.words : []}
                    renderItem={({ item }) => this.renderWord(item)}
                    numColumns={3}
                >
                </FlatList>
                <FloatingAction showBackground={false}
                    buttonColor={config.color.mainColor}
                    floatingIcon={<Ionicons name='ios-add' size={36} color='white' />}
                    onPressMain={() => this.showAddLessonForm()}
                />
            </View>
        );
    }
}