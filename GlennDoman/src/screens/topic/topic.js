import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { iconsMap } from '../../utils/appIcon';
import Modal from 'react-native-modal';

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

export default class Topic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleModal: false
        }
    }
    onPressFab(name) {
        switch (name) {
            case 'bt_add_topic':
                this.toggleModal()
                break;
            case 'bt_edit-topic':
                break;
        }
    }

    toggleModal() {
        this.setState(prevState => {
            this.setState({
                visibleModal: !prevState.visibleModal
            })
        })
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
                <Modal
                    onBackButtonPress={() => this.toggleModal()}
                    onBackdropPress={() => this.toggleModal()} backdropOpacity={0.6} visible={this.state.visibleModal}>
                    <View style={styles.modal}>
                        <View style={{ flex: 6 }}>
                            <Text style={{ fontSize: 20, alignSelf: 'center', marginBottom: 10 }}>New Topic</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{width: '20%'}}>Title: </Text>
                                <TextInput style={{width: '80%'}} placeholder='Input Topic Title'
                                    underlineColorAndroid='transparent'
                                ></TextInput></View>
                            <View style={{ paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: 'black', opacity: 0.2 }}></View>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <TouchableOpacity style={styles.btn}>
                                <Text>OK</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        width: '100%',
        height: '50%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})