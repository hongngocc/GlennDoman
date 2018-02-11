import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { Card } from 'native-base';
import { FloatingAction } from 'react-native-floating-action';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as schema from '../../realm/schema/schema';

import config from '../../config';
import RealmManager from '../../realm/realm';

const widthItem = (Dimensions.get('window').width - 32) / 4

export default class TopicDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topic: null,
            visibleModal: false
        }
    }

    componentDidMount() {
        this.loadTopic()
    }

    loadTopic() {
        let topics = RealmManager.loadTopicByName(this.props.title);
        topics.then(proxy => {
            proxy.forEach(topicRealm => {
                this.setState({
                    topic: topicRealm
                })
            })
        })
    }

    getListWord() {
        let listWord = [];
        if (this.state.topic !== null) {
            let words = this.state.topic.words;
            words && words.forEach(word => {
                let wordObj = {};
                wordObj.text = word.text;
                wordObj.isComplete = word.isComplete;
                wordObj.path = word.path;
                listWord.push(wordObj);
            })
        }
        return listWord;
    }

    render() {
        let listWord = this.getListWord()
        return (
            <View style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
                <FlatList data={listWord}
                    numColumns={4}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity key={item.text} style={{ height: widthItem, width: widthItem }}>
                                <Card style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20 }}>{item.text}</Text>
                                </Card>
                            </TouchableOpacity>
                        )
                    }
                    }
                >
                </FlatList>
                <FloatingAction onPressMain={() => this.showModal()}
                    showBackground={false}
                    floatingIcon={<Ionicons name='ios-add' size={36} color='white' />}
                />
            </View>
        );
    }
}