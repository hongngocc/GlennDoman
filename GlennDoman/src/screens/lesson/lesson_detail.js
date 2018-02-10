import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import styles from './style/lesson.detail';
import Ionicons from 'react-native-vector-icons/Ionicons';
import config from '../../config';

export default class LessonDetail extends Component {
    constructor(props) {
        super(props);
        this.len = this.props.listWord ? this.props.listWord.length - 1 : 0;
        this.state = {
            curIndex: 0
        };
        this.swipeLeft = this.swipeLeft.bind(this);
        this.swipeRight = this.swipeRight.bind(this);
    }

    dissmissCurrentModal() {
        this.props.navigator.dismissModal({
            animationType: 'slide-down'
        });
    }

    swipeLeft() {
        if (this.state.curIndex > 0) {
            setTimeout(() => {
                this.refs && this.refs.swiper && this.refs.swiper.jumpToCardIndex(this.state.curIndex - 1);
            }, 500)
        }
    }

    swipeRight() {
        if (this.state.curIndex < this.len) {
            setTimeout(() => {
                this.refs && this.refs.swiper && this.refs.swiper.jumpToCardIndex(this.state.curIndex + 1);
            }, 500)
        }
    }

    onSwiped(cardIndex) {
        this.setState({ curIndex: cardIndex })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'pink', justifyContent: 'center', alignItems: 'center' }}>
                <Swiper
                    ref='swiper'
                    cards={this.props.listWord}
                    renderCard={(card) => {
                        return (
                            <View style={styles.card}>
                                <Text style={styles.text}>{card}</Text>
                            </View>
                        )
                    }}
                    onSwiped={(cardIndex) => this.onSwiped(cardIndex)}
                    goBackToPreviousCardOnSwipeLeft={this.state.curIndex < this.len}
                    goBackToPreviousCardOnSwipeRight={this.state.curIndex > 0}
                    showSecondCard={false}
                    onSwipedAll={() => this.dissmissCurrentModal()}
                    cardIndex={0}
                    disableBottomSwipe={true}
                    disableTopSwipe={true}
                    backgroundColor={config.color.mainColor}>
                    <View style={styles.swipeSymbol}>
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => this.swipeRight()}>
                            {
                                this.state.curIndex > 0 ? <Ionicons name='ios-undo' size={40} color='white' style={{ textAlign: 'left' }} /> : null
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => this.dissmissCurrentModal()}>
                            <Ionicons name='ios-close-circle' size={40} color='white' style={{ textAlign: 'center' }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => this.swipeLeft()}>
                            {
                                this.state.curIndex < this.len ? <Ionicons name='ios-redo' size={40} color='white' style={{ textAlign: 'right' }} /> : null
                            }
                        </TouchableOpacity>
                    </View>
                </Swiper>
            </View>
        );
    }
}