import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image
} from 'react-native';
import Realm from 'realm';
import { Card } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

export default class AddTopic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listWords: ['Daddy', 'Mommy', 'Kitty'],
            visibleModal: false
        }
    }

    renderListWords() {
        return (
            <View></View>
        )
    }

    renderSetIconTopic() {
        let path = this.state.icon;
        return (
            <Card style={{ justifyContent: 'center', width: '30%', alignSelf: 'center' }}>
                <Image style={{ width: 32, height: 32, alignSelf: 'center' }} source={require(`../../img/home.png`)}></Image>
            </Card>
        )
    }

    showModal() {
        this.setState({
            visibleModal: true
        })
    }
    render() {
        let { listWords } = this.state;
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
                <View style={styles.container}>
                    {
                        this.renderSetIconTopic()
                    }
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ width: '10%' }}>Title: </Text>
                        <TextInput underlineColorAndroid='transparent' style={{ width: '90%' }} placeholder="Input Topic Title" />
                    </View>
                    <View style={{ borderBottomWidth: 1, backgroundColor: 'grey', opacity: 0.2 }}></View>
                    {
                        listWords.map((e, i) => {
                            return (
                                <View style={[styles.card, { marginTop: 5 }]}>
                                    <Card style={styles.cardItem}>
                                        <Text style={{ fontSize: 24 }}>{e}</Text>
                                    </Card>
                                </View>
                            )
                        })
                    }
                    <TouchableOpacity onPress={() => this.showModal()}
                        style={styles.card}>
                        <Card style={styles.cardItem}>
                            <Icon name='ios-add' size={48} color='green' />
                        </Card>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    card: {
        height: 64,
        marginTop: 16
    },
    cardItem: { justifyContent: 'center', alignItems: 'center' },

})