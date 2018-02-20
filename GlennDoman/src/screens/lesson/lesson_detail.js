import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import styles from './style/lesson.detail';
import Ionicons from 'react-native-vector-icons/Ionicons';
import config from '../../config';
import globalStyle from '../../globalStyle';
import { FloatingAction } from 'react-native-floating-action';
import { Image } from 'react-native-animatable';
import Tts from 'react-native-tts';

export default class LessonDetail extends Component {
    constructor(props) {
        super(props);
        // this.len = this.props.listWord ? this.props.listWord.length - 1 : 0;
        this.state = {
            curIndex: 0,
            curWord: this.props.listWord[0] || '',
            listWord: [],
            visibleText: false
        };
        this.swipeLeft = this.swipeLeft.bind(this);
        this.swipeRight = this.swipeRight.bind(this);
    }

    componentWillMount() {
        let {listWord} = this.props;
        let _listWord = this.state.listWord;
        listWord.forEach(element => {
            _listWord.push(element.text);
        });
        this.setState({
            listWord: _listWord,
            visibleText: false
        })
    }

    dissmissCurrentModal() {
        this.setState({ visibleText: true })
        setTimeout(() => this.props.navigator.dismissModal({
            animationType: 'slide-down'
        }), 1000);
    }

    swipeLeft() {
        // let index = this.state.curIndex;
        // if (index < this.len) {
        //     this.setState({ curIndex: index + 1 }, () => {
        //         this.refs && this.refs.swiper && this.refs.swiper.jumpToCardIndex(index + 1);
        //     })
        // }
    }

    swipeRight() {
        // let index = this.state.curIndex;
        // if (index > 0) {
        //     this.setState({ curIndex: index - 1 }, () => {
        //         this.refs && this.refs.swiper && this.refs.swiper.jumpToCardIndex(index - 1);
        //     })
        // }
    }

    onSwipedLeft(cardIndex) {
        if (cardIndex < this.len) {
            this.setState({ curIndex: cardIndex + 1 }, () => {
                this.refs && this.refs.swiper && this.refs.swiper.jumpToCardIndex(cardIndex + 1);
            })
        }
    }

    onSwipedRight(cardIndex) {
        if (cardIndex > 0) {
            this.setState({ curIndex: cardIndex - 1 }, () => {
                this.refs && this.refs.swiper && this.refs.swiper.jumpToCardIndex(cardIndex - 1);
            })
        }
    }

    playVoice(text) {
        Tts.stop();
        Tts.speak(text);
    }

    onSwiped(cardIndex) {
        let index = cardIndex + 1;
        this.setState({ curWord: this.props.listWord[index] });
    }

    render() {
        
        return (
            <View style={{ flex: 1, backgroundColor: 'pink', justifyContent: 'center', alignItems: 'center' }}>
                <Swiper
                    ref='swiper'
                    // goBackToPreviousCardOnSwipeLeft={true}
                    // showSecondCard={false}
                    // infinite={true}
                    cards={this.state.listWord}
                    renderCard={(card) => {
                        return (
                            <View style={styles.card}>
                                <Text style={globalStyle.textHugoCard}>{card}</Text>
                                <FloatingAction showBackground={false}
                                    buttonColor={config.color.mainColor}
                                    floatingIcon={<Ionicons name='md-volume-up' size={36} color='white' />}
                                    onPressMain={() => this.playVoice(card)}
                                />
                            </View>
                        )
                    }}
                    onSwiped={(cardIndex) => this.onSwiped(cardIndex)}
                    // onSwipedLeft={(cardIndex) => this.onSwipedLeft(cardIndex)}
                    // onSwipedRight={(cardIndex) => this.onSwipedRight(cardIndex)}
                    // goBackToPreviousCardOnSwipeLeft={this.state.curIndex < this.len}
                    // goBackToPreviousCardOnSwipeRight={this.state.curIndex > 0}
                    // showSecondCard={false}
                    onSwipedAll={() => this.dissmissCurrentModal()}
                    cardIndex={0}
                    // disableBottomSwipe={true}
                    // disableTopSwipe={true}
                    overlayLabelStyle={{ fontSize: 20 }}
                    backgroundColor={config.color.mainColor}>
                    <View style={styles.swipeSymbol}>
                        {/* <TouchableOpacity
                            style={{ flex: 1 }}>
                            <Ionicons name='ios-undo' size={40} color='white' style={{ textAlign: 'left' }} />
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => this.dissmissCurrentModal()}>
                            <Ionicons name='ios-close-circle' size={40} color='white' style={{ textAlign: 'center' }} />
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity
                            style={{ flex: 1 }}>
                            <Ionicons name='ios-redo' size={40} color='white' style={{ textAlign: 'right' }} />
                        </TouchableOpacity> */}
                    </View>
                </Swiper>
                {
                    this.state.visibleText ?
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'white', fontSize: 32, marginBottom: 16}}>Well done ^^</Text>
                        <Image style={{width: 100, height: 100}} source={require('../../img/stars.png')}></Image>
                    </View> : null
                }
            </View>
        );
    }
}