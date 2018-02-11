import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { iconsMap } from '../../utils/appIcon';
import Modal from 'react-native-modal';
import Swipeout from 'react-native-swipeout';
import { Card } from 'native-base';
import globalStyle from '../../globalStyle';
import RealmManager from '../../realm/realm';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Topic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleModal: false,
            newTopic: '',
            listTopic: []
        }
    }

    componentDidMount() {
        this.loadData()
    }

    componentWillUnmount() {
        RealmManager.unregisterChange()
    }

    loadData() {
        let topics = RealmManager.getAllTopic();
        let _listTopic = [];
        topics.then(proxy => {
            proxy.forEach(topicRealm => {
                _listTopic.push(topicRealm)
            })
            this.setState({
                listTopic: _listTopic
            })
        })
    }

    openModal() {
        this.setState({
            visibleModal: true
        })
    }

    closeModal() {
        this.setState({
            visibleModal: false
        })
    }

    addNewTopic() {
        this.closeModal()
        let topicObj = {};
        topicObj.icon = '';
        topicObj.words = [];
        topicObj.title = this.state.newTopic;
        topicObj.time = new Date().getTime().toString();
        RealmManager.createTopic(topicObj);
        this.loadData()
    }

    showDetails(element) {
        let topicRealm = JSON.stringify(element);
        this.props.navigator.showModal({
            screen: 'kids.TopicDetails',
            title: element.title,
            passProps: {title: element.title, topicRealm: topicRealm},
            animationType: 'slide-up'
        });
    }

    renderTopic(element) {
        return (
            <TouchableOpacity onPress={() => this.showDetails(element)}
                style={{ flex: 1 }}>
                <View style={styles.topic}>
                    <Card style={{ padding: 16 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
                            <Text style={globalStyle.textMain}>{element.title}</Text>
                        </View>
                        <Image style={{ width: 64, height: 64, alignSelf: 'center' }} source={require('../../img/animal.png')} />
                    </Card>
                </View>
            </TouchableOpacity>
        )
    }

    renderModal() {
        return (
            <Modal
                onBackButtonPress={() => this.closeModal()}
                onBackdropPress={() => this.closeModal()} backdropOpacity={0.6} visible={this.state.visibleModal}>
                <View style={styles.modal}>
                    <View style={{ flex: 6, padding: 16, justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 20, alignSelf: 'center', marginBottom: 10 }}>New Topic</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ width: '20%' }}>Title: </Text>
                            <TextInput style={{ width: 200 }} placeholder='Input Topic Title'
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.setState({
                                    newTopic: text
                                })}
                            ></TextInput>
                        </View>
                        <Text>Icon: </Text>
                        <View style={{ marginTop: 10, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: 'black', opacity: 0.2 }}></View>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.addNewTopic()}
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
    render() {
        return (
            <View style={{ flex: 1, padding: 16 }}>
                <FlatList data={this.state.listTopic} renderItem={({ item }) => this.renderTopic(item)}
                    numColumns={2} style={{ marginTop: 56 }}>
                </FlatList>
                <FloatingAction showBackground={false}
                    onPressMain={() => this.openModal()}
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
        backgroundColor: 'white',
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