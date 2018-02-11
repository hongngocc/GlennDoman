import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import globalStyle from '../../globalStyle';
import config from '../../config';
import { Card } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style/lesson.edit';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

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
        this.interval = [];
        this.rowRefs = {};
        this.state = {
            lesson: this.props.lesson,
            isRemove: false
        };
        this.switchToDel = this.switchToDel.bind(this);
    }

    switchToDel() {
        let listWord = this.state.lesson && this.state.lesson.words ? this.state.lesson.words : [];
        this.setState({ isRemove: true }, () => {
            listWord.map((e, i) => {
                let abc = setInterval(() => {
                    this.rowRefs && this.rowRefs[i] && this.rowRefs[i].shake(300)
                }, 300);
                this.interval.push(abc);
            })
        });
    }

    delWord() {
        console.log('del word')
    }

    renderWord(item, index) {
        const getActiveButtonStyle = (index) => {
            if (index && ((index - 1) % 3 === 0)) {
                return { marginHorizontal: config.paddingSize }
            } else {
                return {}
            }
        }
        return (
            <Animatable.View ref={row => this.rowRefs[index] = row} iterationCount="infinite"
                style={[styles.wordContainer, getActiveButtonStyle(index)]}>
                <Card style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.word}
                        onLongPress={() => this.switchToDel()}>
                        {
                            this.state.isRemove ? (<View style={styles.removeContainer}>
                                <Ionicons name='md-remove-circle' size={64} color={config.color.red} style={styles.iconRemove}
                                    onPress={() => this.delWord()} />
                                <Text adjustsFontSizeToFit={true} style={[globalStyle.textWordCard, styles.textRemove]}>{item}</Text>
                            </View>)
                                : <Text adjustsFontSizeToFit={true} style={globalStyle.textWordCard}>{item}</Text>
                        }
                    </TouchableOpacity>
                </Card>
            </Animatable.View>
        );
    }

    render() {
        const listData = (
            <FlatList style={{ marginTop: 56, width: width }}
                data={this.state.lesson && this.state.lesson.words ? this.state.lesson.words : []}
                renderItem={({ item, index }) => this.renderWord(item, index)}
                numColumns={3}
            >
            </FlatList>
        );
        const floatingButton = (
            <FloatingAction showBackground={false}
                buttonColor={config.color.mainColor}
                floatingIcon={<Ionicons name='ios-add' size={36} color='white' />}
                onPressMain={() => this.showAddLessonForm()}
            />
        );
        if (this.state.isRemove) {
            return (
                <TouchableWithoutFeedback
                    onPress={() => {
                        if (this.interval) {
                            this.interval.map((e, i) => {
                                e && clearInterval(e);
                            })
                        };
                        this.setState({ isRemove: false })
                    }}>
                    <View style={styles.container}>
                        {listData}
                    </View>
                </TouchableWithoutFeedback>
            );
        } else {
            return (
                <View style={styles.container}>
                    {listData}
                    {floatingButton}
                </View>
            );
        }
    }
}