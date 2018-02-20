import React from 'react';
import { ToastAndroid } from 'react-native';
import Realm from 'realm';

import * as schema from './schema/schema';

export default RealmManager = {
    getAllTopic: () => Realm.open({ schema: [schema.wordSchema, schema.topicSchema] })
        .then(realm => {
            let topics = [];
            realm.objects('Topic').forEach(topicRealm => {
                let topicJsonObj = convertToJsonObj(topicRealm, 'topic');
                topics.push(topicJsonObj)
            })
            return topics;
        })
        .catch(err => console.log('Can not get by error: ', err)),

    createTopic: function (topicObj, isUpdate = false) {
        Realm.open({ schema: [schema.wordSchema, schema.topicSchema] })
            .then(realm => {
                realm.write(() => {
                    realm.create('Topic', topicObj, isUpdate);
                })
            })
            .catch(err => console.log('Can not create by error: ', err))
    },

    deleteTopic: function (topicObj) {
        Realm.open({ schema: [schema.wordSchema, schema.topicSchema] })
            .then(realm => {
                realm.write(() => {
                    realm.delete(topicObj);
                })
            })
            .catch(err => console.log('Can not delete Topic by error: ', err))
    },

    deleleWord: function (text) {
        Realm.open({ schema: [schema.wordSchema, schema.topicSchema] })
            .then(realm => {
                realm.write(() => {
                    realm.objects('Word').filtered(`text = "${text}"`).forEach(word => {
                        realm.delete(word);
                    })
                })
            })
            .catch(err => { console.log('Can not delete Word by error: ', err); })
    },

    unregisterChange: function () {
        Realm.open({ schema: [schema.wordSchema, schema.topicSchema] })
            .then(realm => {
                realm.removeListener('change')
            });
    },

    loadTopicByName: (topicName) =>
        Realm.open({ schema: [schema.wordSchema, schema.topicSchema] })
            .then(realm => {
                let choosedTopic = realm.objects('Topic').filtered(`title = "${topicName}"`);
                let topicObj = {};
                choosedTopic.forEach(data => {
                    topicObj =  convertToJsonObj(data, 'topic');
                })

                return topicObj;
            }),

    addNewWord: (title, objWord, isUpdate) =>
        Realm.open({ schema: [schema.wordSchema, schema.topicSchema] })
            .then(realm => {
                realm.write(() => {
                    let newWord = realm.create('Word', objWord);
                    let index = 1;
                    let topicRealmObj = {};
                    let topic = realm.objects('Topic').filtered(`title = "${title}"`);
                    topic.forEach(value => {
                        topicRealmObj = value;
                    })
                    topicRealmObj.words.push(newWord);
                    realm.create('Topic', topicRealmObj, isUpdate);
                })
            })
            .catch(err => ToastAndroid.show('Can not create', ToastAndroid.SHORT, ToastAndroid.BOTTOM)),

    register: (tag, callback) => Realm.open({ schema: [schema.wordSchema, schema.topicSchema] })
        .then(realm => {
            realm.addListener(tag, callback);
        })
        .catch(err => { }),

    unregister: (tag, callback) => Realm.open({ schema: [schema.wordSchema, schema.topicSchema] })
        .then(realm => {
            realm.removeListener(tag, callback);
        })
        .catch(err => { }),

    toggleCompleteState: (text) => {
        Realm.open({ schema: [schema.wordSchema, schema.topicSchema] })
            .then(realm => {
                realm.write(() => {
                    let word = realm.objects('Word').filtered(`text = "${text}"`);
                    let wordObjRealm = {};
                    word.forEach(value => {
                        wordObjRealm = value;
                    })

                    wordObjRealm.isComplete = !wordObjRealm.isComplete

                    realm.create('Word', wordObjRealm, true);
                })
            })
    }
}

export function convertToJsonObj(realmObj, type) {
    switch (type) {
        case 'topic':
            let topicJsonObj = {};
            topicJsonObj.title = realmObj.title;
            topicJsonObj.words = [];
            topicJsonObj.icon = realmObj.icon;
            topicJsonObj.time = realmObj.time;

            realmObj.words.forEach(wordRealm => {
                let wordObj = {};
                wordObj.text = wordRealm.text;
                wordObj.isComplete = wordRealm.isComplete;
                wordObj.path = wordRealm.path;

                topicJsonObj.words.push(wordObj)
            })
            return topicJsonObj;
    }
}
