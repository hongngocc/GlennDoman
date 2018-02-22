import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import Swipeout from 'react-native-swipeout';
import globalStyle from '../../globalStyle';
import config from '../../config';
import { Card } from 'native-base';
import styles from './style/lesson';
import { FloatingAction } from 'react-native-floating-action';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { iconsMap } from '../../utils/appIcon';
import RealmManager from '../../realm/realm';

const { width, hight } = Dimensions.get('window');

export default class Lesson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: []
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.type === 'NavBarButtonPress') {
            switch (event.id) {
            }
        } else {
            switch (event.id) {
                case 'willAppear':
                    RealmManager.getAllLesson().then(lessons => {
                        this.setState({ listData: lessons })
                    })
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

    deleteUnit() {
        console.log('deleted');
    }

    editUnit(rowData) {
        this.props.navigator.push({
            screen: 'kids.EditLesson',
            title: rowData ? moment(new Date(parseInt(rowData.time))).format('DD MMM YYYY HH:mm') : 'Edit Lesson',
            navigatorStyle: globalStyle.navigatorStyle,
            navigatorButtons: {
                rightButtons: [
                    {
                        id: 'edit_lesson_done',
                        icon: iconsMap['md-checkmark']
                    }
                ]
            },
            passProps: {
                lesson: rowData || {}
            }
        })
    }

    showUnitDetail(listWord) {
        this.props.navigator.push({
            screen: "kids.LessonDetail",
            title: 'Choose difference lesson',
            passProps: {
                listWord: listWord || []
            },
            navigatorStyle: globalStyle.navigatorNoTabStyle,
            animationType: 'slide-up'
        });
    }

    renderRow(rowData, index) {

        let swipeBtns = [
            {
                text: 'Edit',
                backgroundColor: config.color.lightBlue,
                onPress: () => { this.editUnit(rowData) }
            },
            {
                text: 'Delete',
                backgroundColor: config.color.red,
                onPress: () => { this.deleteUnit(rowData) }
            }
        ];
        let words = '';
        if (rowData && rowData.words) {
            rowData.words.map((e, i) => {
                if (i === rowData.words.length - 1) {
                    words += `${e.text}`
                } else {
                    words += `${e.text}, `;
                }
                if (i > 8) {
                    words += `...`;
                    return;
                }
            })
        }
        let date = String(new Date(parseInt(rowData.time)));
        return (
            <View key={index} style={styles.rowContainer}>
                <Card>
                    <Swipeout right={swipeBtns}
                        style={{ width: '100%', height: '100%' }}
                        autoClose={true}
                        backgroundColor='transparent'>
                        <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center' }}
                            onPress={() => this.showUnitDetail(rowData.words)}>
                            <View style={styles.rowContent}>
                                <Image style={{ width: 64, height: 64 }} source={require('../../img/chat.png')} />
                                <View style={styles.rightContent}>
                                    <View style={{ width: '100%', flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <Text numberOfLines={1} style={[globalStyle.textMainMedium, { flex: 1 }]}> {rowData.description} </Text>
                                        <Text numberOfLines={1} style={[globalStyle.textSubLight, { flex: 2, textAlign: 'right' }]}> {moment(date).format('DD MMM YYYY HH:mm')} </Text>
                                    </View>
                                    <Text numberOfLines={2} style={globalStyle.textMain}> {words} </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Swipeout>
                </Card>
            </View>
        );
    }

    showAddLessonForm() {
        this.props.navigator.push({
            screen: 'kids.AddLesson',
            title: 'Add Lesson',
            navigatorStyle: globalStyle.navigatorStyle,
            navigatorButtons: {
                rightButtons: [
                    {
                        id: 'add_lesson',
                        icon: iconsMap['md-checkmark']
                    }
                ]
            },
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF', marginTop: 56 }}>
                <ScrollView style={{ flex: 1 }}>
                    {
                        this.state.listData.map((e, i) => {
                            return this.renderRow(e, i);
                        })
                    }
                </ScrollView>
                <FloatingAction showBackground={false}
                    buttonColor={config.color.mainColor}
                    floatingIcon={<Ionicons name='ios-add' size={36} color='white' />}
                    onPressMain={() => this.showAddLessonForm()}
                />
            </View>
        );
    }
}