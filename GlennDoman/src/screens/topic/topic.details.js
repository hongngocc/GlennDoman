import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ToastAndroid
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { Card } from 'native-base';
import { FloatingAction } from 'react-native-floating-action';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import Tts from 'react-native-tts';

import * as schema from '../../realm/schema/schema';
import config from '../../config';
import RealmManager from '../../realm/realm';

const widthItem = (Dimensions.get('window').width - 32) / 3

export default class TopicDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topic: null,
            visibleModal: false,
            newWord: ''
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

    showModal() {
        this.setState({ visibleModal: true })
    }

    closeModal() {
        this.setState({ visibleModal: false })
    }

    addNewWord() {
        if (this.state.newWord.length < 3) {
            ToastAndroid.show('Please input at least 3 characters', ToastAndroid.SHORT);
            return;
        }
        this.closeModal();
        let newWord = { text: this.state.newWord, isComplete: false, path: '' };
        // let topicRealm = JSON.parse(this.props.topicRealm);
        // let updatedTopicRealm = Object.assign({}, topicRealm, newWords)
        RealmManager.addNewWord(this.props.title, newWord, true);
        this.loadTopic()
    }

    renderModal() {
        return (
            <Modal backdropColor='black'
                onBackButtonPress={() => this.closeModal()}
                onBackdropPress={() => this.closeModal()} backdropOpacity={0.5} visible={this.state.visibleModal}>
                <View style={styles.modal}>
                    <View style={{ flex: 6, padding: 16, justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 20, alignSelf: 'center', marginBottom: 10, color: config.color.mainColor }}>New Word</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ width: '20%' }}>Text: </Text>
                            <TextInput style={{ width: 200 }} placeholder='Input Topic Title'
                                underlineColorAndroid={config.color.mainColor}
                                onChangeText={(text) => this.setState({
                                    newWord: text
                                })}
                            ></TextInput>
                        </View>
                        <Text>Sound: </Text>
                        <View style={{ marginTop: 10, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: config.color.mainColor }}></View>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.addNewWord()}
                            style={styles.btn}>
                            <Text>OK</Text>
                        </TouchableOpacity>
                        <View style={{ width: 1, backgroundColor: config.color.mainColor }}></View>
                        <TouchableOpacity onPress={() => this.closeModal()}
                            style={styles.btn}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    removeWord(text) {
        RealmManager.deleleWord(text);
        this.loadTopic()
    }
    
    toggleCompleteState(text) {
        Tts.speak(text, { iosVoiceId: 'com.apple.ttsbundle.Moira-compact', language: 'vi-VI' });
        RealmManager.toggleCompleteState(text);
        this.loadTopic();
    }

    render() {
        let listWord = this.getListWord()
        return (
            <View style={{ flex: 1, backgroundColor: 'white', padding: 16, marginTop: 56 }}>
                <FlatList data={listWord}
                    numColumns={3}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => this.toggleCompleteState(item.text)}
                                key={item.text} style={{ height: widthItem, width: widthItem }}>
                                <Card style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20 }}>{item.text}</Text>
                                    <Text>{item.isComplete ? 'OK' : 'Not yet'}</Text>
                                </Card>
                            </TouchableOpacity>
                        )
                    }
                    }
                >
                </FlatList>
                <FloatingAction onPressMain={() => this.showModal()}
                    buttonColor={config.color.mainColor}
                    showBackground={false}
                    floatingIcon={<Ionicons name='ios-add' size={36} color='white' />}
                />
                {
                    this.renderModal()
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        width: '100%',
        height: 250,
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 16
    },
    icon: {
        width: 48,
        height: 48,
        marginRight: 20
    },
    topic: {
        height: 150,
        width: (Dimensions.get('window').width - 48) / 2
    }
})