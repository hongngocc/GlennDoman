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

const { width, hight } = Dimensions.get('window');

const listDataFaker = [
    {
        icon: require('../../img/family.png'),
        topic: 'Family',
        words: [
            'Daddy', 'Mommy', 'Kitty'
        ],
        time: new Date().getTime()
    },
    {
        icon: require('../../img/animal.png'),
        topic: 'Animal',
        words: [
            'Lion', 'Chicken', 'Cat'
        ],
        time: new Date().getTime()
    },
    {
        icon: require('../../img/vehicle.png'),
        topic: 'Vehicle',
        words: [
            'Car', 'Train', 'Bicycle'
        ],
        time: new Date().getTime()
    },
    {
        icon: require('../../img/fruit.png'),
        topic: 'Fruit',
        words: [
            'Apple', 'Banana', 'Lemon, Pear, Bean, Tomato, Water Lemon, strawberry, coconut, cucumber'
        ],
        time: new Date().getTime()
    }
]

export default class Lesson extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.type === 'NavBarButtonPress') {
            switch (event.id) {
            }
        } else {
            switch (event.id) {
                case 'willAppear':
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

    editUnit() {
        console.log('edited');
    }

    showUnitDetail() {
        console.log('showed');
    }

    renderRow(rowData, index) {
        let swipeBtns = [
            {
                text: 'Edit',
                backgroundColor: config.color.lightBlue,
                onPress: () => { this.deleteUnit(this.props.rowData) }
            },
            {
                text: 'Delete',
                backgroundColor: config.color.red,
                onPress: () => { this.editUnit(this.props.rowData) }
            }
        ];
        let words = '';
        if (rowData && rowData.words) {
            rowData.words.map((e, i) => {
                if (i === rowData.words.length - 1) {
                    words += `${e}`
                } else {
                    words += `${e}, `;
                }
                if (i > 8) {
                    words += `...`;
                    return;
                }
            })
        }
        return (
            <View key={index} style={styles.rowContainer}>
                <Card>
                    <Swipeout right={swipeBtns}
                        style={{ width: '100%', height: '100%' }}
                        autoClose='true'
                        backgroundColor='transparent'>
                        <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center' }}
                            onPress={() => this.showUnitDetail()}>
                            <View style={styles.rowContent}>
                                <Image style={{ width: 64, height: 64 }} source={rowData.icon} />
                                <View style={styles.rightContent}>
                                    <View style={{ width: '100%', flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <Text numberOfLines={1} style={[globalStyle.textMainMedium, { flex: 1 }]}> {rowData.topic} </Text>
                                        <Text numberOfLines={1} style={[globalStyle.textSubLight, { flex: 2, textAlign: 'right' }]}> {moment(new Date(rowData.time)).format('DD MMM YYYY HH:mm:ss')} </Text>
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
            navigatorStyle: globalStyle.navigatorStyle
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <ScrollView contentContainerStyle={{ flex: 1, marginTop: 56 }}>
                    {
                        listDataFaker.map((e, i) => {
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