import React, { Component } from 'react';
import {
    View,
    Text,
    Platform,
    Image,
    TouchableOpacity,
    TimePickerAndroid,
    DatePickerAndroid,
    Picker,
    FlatList,
    Dimensions,
    ScrollView,
    ToastAndroid,
    TextInput
} from 'react-native';
import { Card } from 'native-base';
import Modal from 'react-native-modal';
import moment from 'moment';
import globalStyle from '../../globalStyle';
import config from '../../config';
import RealmManager from '../../realm/realm';

const NUMBERS_LIST = [5, 10, 15];
const widthItem = (Dimensions.get('window').width - 32) / 3

export default class AddLesson extends Component {
    constructor(props) {
        super(props);
        const curTime = new Date();
        this.curYear = curTime.getFullYear();
        this.curMonth = curTime.getMonth();
        this.curDate = curTime.getDate();
        this.state = {
            topics: null,
            description: '',
            time: new Date(),
            selectedNumber: 5,
            words: [],
            visibleModal: false,
            listData: [],
            counter: 0
        }
        this.words = [],
            this.topics = [],
            this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.type === 'NavBarButtonPress') {
            switch (event.id) {
                case 'add_lesson':
                    RealmManager.createLesson(this.state.description, this.words, this.state.time.getTime().toString());
                    this.props.navigator.pop();
                    break;
            }
        } else {
            switch (event.id) {
                case 'willAppear':
                    RealmManager.getAllTopic().then(topics => this.setState({ listData: topics }))
                        .catch(err => console.log(err))
                    break;
                case 'didAppear':
                    break;
                case 'willDisappear':
                    break;
                case 'didDisappear':
                    break;
                default:
                    break;
            }
        }
    }

    showModal() {
        this.setState({
            visibleModal: true
        })
        // this.clearAllPick();
    }

    closeModal() {
        this.setState({
            visibleModal: false
        })
        this.clearAllPick();
    }

    async openTimePicker() {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: this.state.time.getHours() || new Date().getHours(),
                minute: this.state.time.getMinutes() | new Date().getMinutes(),
                is24Hour: false, // Will display '2 PM'
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                // Selected hour (0-23), minute (0-59)
                this.setState({
                    time: new Date(this.curYear, this.curMonth, this.curDate, hour, minute)
                })
            }
        } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
        }
    }

    async openDatePicker() {
        try {
            const hour = this.state.time.getHours() || new Date().getHours();
            const minute = this.state.time.getMinutes() || new Date().getMinutes();
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: this.state.time,
                //   mode: 'spinner'
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                this.setState({
                    time: new Date(year, month, day, hour, minute)
                })
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    convertDateToString() {
        let { day, month, year } = this.state.time;
        let _date = `${day} `;

        switch (month) {
            case 0:
                _date = _date + 'Jan'
                break;
            case 1:
                _date = _date + 'Fer'
                break;
            case 2:
                _date = _date + 'Mar'
                break;
            case 3:
                _date = _date + 'Apr'
                break;
            case 4:
                _date = _date + 'May'
                break;
            case 5:
                _date = _date + 'Jun'
                break;
            case 6:
                _date = _date + 'Jul'
                break;
            case 7:
                _date = _date + 'Aug'
                break;
            case 8:
                _date = _date + 'Sep'
                break;
            case 9:
                _date = _date + 'Oct'
                break;
            case 10:
                _date = _date + 'Nov'
                break;
            case 11:
                _date = _date + 'Dec'
                break;

            default:
                break;
        }

        return _date + ` ${year}`;
    }

    toggleWordPicker(topicIndex, wordIndex, text, topicTitle) {
        if (this.state.counter <= this.state.selectedNumber) {
            let _listData = this.state.listData;
            let _word = _listData[topicIndex].words[wordIndex];
            if (_word.picked === undefined) {
                _word.picked = false;
            }
            if (this.state.counter === this.state.selectedNumber) {
                if (_word.picked) {
                    _word.picked = !_word.picked;
                } else {
                    return
                }
            } else {
                _word.picked = !_word.picked;
            }
            if (_word.picked) {
                this.words.push(_word.text)
                this.setState({ counter: this.state.counter + 1 })
            } else {
                let index = this.words.indexOf(text);
                if (index >= 0) {
                    this.words.splice(index, 1);
                }
                this.setState({ counter: this.state.counter - 1 })
            }
            _listData[topicIndex].words[wordIndex] = _word;
            this.setState({
                listData: _listData,
            })
        }
    }

    clearAllPick() {
        let _listData = this.state.listData;
        _listData.forEach(topic => {
            topic.words.forEach(word => {
                word.picked = false;
            })
        });
        this.setState({ listData: _listData, counter: 0 })
    }

    renderModal() {
        return (
            <Modal backdropColor='black'
                onBackButtonPress={() => this.closeModal()}
                onBackdropPress={() => this.closeModal()} backdropOpacity={0.5} visible={this.state.visibleModal}>
                <View style={{
                    width: '100%',
                    height: '85%',
                    backgroundColor: '#f1f1f1',
                    borderRadius: 10,
                    padding: 16
                }}>
                    <Text style={[globalStyle.textMain, { paddingBottom: 16, borderBottomColor: config.color.mainColor, borderBottomWidth: 1 }]}>{`Totals: ${this.state.counter} / ${this.state.selectedNumber}`}</Text>
                    <ScrollView style={{ marginTop: 10 }}>
                        {
                            this.state.listData.map((e, i) => {
                                let topicIndex = i;
                                let topicTitle = e.title;
                                return (
                                    <View style={{ marginBottom: 32 }}>
                                        <Text style={globalStyle.textMain}>{e.title}</Text>
                                        {
                                            e.words.map((e, i) => {
                                                return (
                                                    <TouchableOpacity onPress={() => this.toggleWordPicker(topicIndex, i, e.text, topicTitle)}>
                                                        {
                                                            e.isComplete ? null :
                                                                <View style={{ borderBottomWidth: 1, borderBottomColor: config.color.disableColor, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <Text style={{ padding: 10 }}>{e.text}</Text>
                                                                    {
                                                                        e.picked ? <Image style={{ width: 24, height: 24 }} source={require('../../img/confirm.png')}></Image> : null
                                                                    }
                                                                </View>
                                                        }
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 16, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.clearAllPick()}>
                            <Text>Clear All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                visibleModal: false,
                                words: this.words
                            })
                        }}>
                            <Text>OK</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.closeModal()}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    onChangeText(value) {
        this.setState({ description: value });
    }

    render() {
        return (
            <View style={{ flex: 1, paddingTop: 5, marginTop: Platform.OS === 'ios' ? 0 : 56, backgroundColor: 'white' }}>
                <View style={{ height: 225 }}>
                    <Card style={{ padding: 10 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={[globalStyle.textMain, { textAlign: 'center' }]}>About</Text>
                            {/*
                                this.state.topics ?
                                    <Text style={[globalStyle.textMain, { textAlign: 'center' }]}>{this.state.topics}</Text> : null
                            */}
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
                            <View style={{ width: '30%', flexDirection: 'row' }}>
                                <Text style={[globalStyle.textSubLight, { flex: 85 }]}>Set Time</Text>
                                <Text style={[globalStyle.textSubLight, { flex: 15 }]}>:</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.openTimePicker()}
                                style={{ width: '70%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 16 }}>
                                <Text style={globalStyle.textSubLight}>{moment(this.state.time).format('HH:mm')}</Text>
                                <Image style={{ width: 24, height: 24 }} source={require('../../img/clock.png')}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
                            <View style={{ width: '30%', flexDirection: 'row' }}>
                                <Text style={[globalStyle.textSubLight, { flex: 85 }]}>Set Date </Text>
                                <Text style={[globalStyle.textSubLight, { flex: 15 }]}>:</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.openDatePicker()}
                                style={{ width: '70%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 16 }}>
                                <Text style={globalStyle.textSubLight}>{moment(this.state.time).format('DD MMM YYYY')}</Text>
                                <Image style={{ width: 24, height: 24 }} source={require('../../img/calendar.png')}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
                            <View style={{ width: '30%', flexDirection: 'row' }}>
                                <Text style={[globalStyle.textSubLight, { flex: 85 }]}>Numbers </Text>
                                <Text style={[globalStyle.textSubLight, { flex: 15 }]}>:</Text>
                            </View>
                            <Picker onValueChange={(value) => this.setState({
                                selectedNumber: value
                            })}
                                style={{ width: 100, marginLeft: 8 }} selectedValue={this.state.selectedNumber}>
                                {
                                    NUMBERS_LIST.map((e, i) =>
                                        <Picker.Item label={`${e}`} value={`${e}`}></Picker.Item>
                                    )
                                }
                            </Picker>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 16, alignItems: 'center' }}>
                            <View style={{ width: '30%', flexDirection: 'row' }}>
                                <Text style={[globalStyle.textSubLight, { flex: 85 }]}>Description </Text>
                                <Text style={[globalStyle.textSubLight, { flex: 15 }]}>:</Text>
                            </View>
                            <TextInput
                                style={[globalStyle.textSubLight, { width: '70%', marginLeft: 12, paddingLeft: 4, borderWidth: 1, borderColor: '#00000070' }]}
                                value={this.state.description}
                                underlineColorAndroid={'transparent'}
                                onChangeText={(text) => this.setState({ description: text })}
                                numberOfLines={1}
                            />
                        </View>
                    </Card>
                </View>
                <Card style={{ padding: 10 }}>
                    <Text style={[globalStyle.textMain, { textAlign: 'center', marginBottom: 10 }]}>Words</Text>
                    <FlatList extraData={this.state}
                        data={this.state.words} numColumns={3}
                        renderItem={({ item }) =>
                            <View style={{ width: widthItem, alignItems: 'center', padding: 7 }}>
                                <Text>{`${item}`}</Text>
                            </View>
                        }>
                    </FlatList>
                    <TouchableOpacity onPress={() => this.showModal()}
                        style={{ width: 28, height: 28, alignSelf: 'center' }}>
                        <Image style={{ width: 28, height: 28 }} source={require('../../img/pencil.png')}></Image>
                    </TouchableOpacity>
                </Card>
                {
                    this.renderModal()
                }
            </View>
        );
    }
}