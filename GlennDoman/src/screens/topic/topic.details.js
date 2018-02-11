import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    TextInput
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { Card } from 'native-base';
import { FloatingAction } from 'react-native-floating-action';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

import * as schema from '../../realm/schema/schema';
import config from '../../config';
import RealmManager from '../../realm/realm';

const widthItem = (Dimensions.get('window').width - 32) / 4

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
                        <Text style={{ fontSize: 20, alignSelf: 'center', marginBottom: 10 }}>New Topic</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ width: '20%' }}>Title: </Text>
                            <TextInput style={{ width: 200 }} placeholder='Input Topic Title'
                                underlineColorAndroid='#d2d2d2'
                                onChangeText={(text) => this.setState({
                                    newWord: text
                                })}
                            ></TextInput>
                        </View>
                        <Text>Icon: </Text>
                        <View style={{ marginTop: 10, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: 'black', opacity: 0.2 }}></View>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.addNewWord()}
                            style={styles.btn}>
                            <Text>OK</Text>
                        </TouchableOpacity>
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
        RealmManager.deleleWord(text)
        this.loadTopic()
    }

    render() {
        let listWord = this.getListWord()
        return (
            <View style={{ flex: 1, backgroundColor: 'white', padding: 16, marginTop: 56 }}>
                <FlatList data={listWord}
                    numColumns={4}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => this.removeWord(item.text)}
                                key={item.text} style={{ height: widthItem, width: widthItem }}>
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
        alignItems: 'center'
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