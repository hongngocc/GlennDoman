import React, { Component } from 'react';
<<<<<<< HEAD
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Swipeout from 'react-native-swipeout';
import globalStyle from '../../globalStyle';
import config from '../../config';

const { width, hight } = Dimensions.get('window');

const listDataFaker = [
    {
        topic: 'Family',
        words: [
            'Daddy', 'Mommy', 'Kitty'
        ],
        time: new Date().getTime()
    },
    {
        topic: 'Animal',
        words: [
            'Lion', 'Chicken', 'Cat'
        ],
        time: new Date().getTime()
    }
]

export default class Lesson extends Component {
    constructor(props) {
        super(props);
        this.state = {}
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
        return (
            <View style={{ width: '100%', height: 56, justifyContent: 'center', borderWidth: 1, borderColor: 'red' }} key={index}>
                <Swipeout right={swipeBtns}
                    style={{ width: '100%' }}
                    autoClose='true'
                    backgroundColor='transparent'>
                    <TouchableOpacity style={{ width: '100%', height: 56 }}
                        onPress={() => this.showUnitDetail()}>
                        <View style={{ width: '100%' }}>
                            <Text style={globalStyle.textMain}> {rowData.topic} </Text>
                        </View>
                    </TouchableOpacity>
                </Swipeout>
            </View>
        );
    }

=======
import { View, Text } from 'react-native';
import Realm from 'realm';

export default class Lesson extends Component {
    componentDidMount() {
        
    }
>>>>>>> 073e8ee0921d07322bb658856ceedfcded66b92d
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
            </View>
        );
    }
}