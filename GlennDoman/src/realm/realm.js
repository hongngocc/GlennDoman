import Realm from 'realm';

import * as schema from './schema/schema';

export default RealmManager = {
    getAllTopic: () => Realm.open({ schema: [schema.wordSchema, schema.topicSchema] })
        .then(realm => {
            let topicRealm = realm.objects('Topic');
            return topicRealm;
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
                return choosedTopic;
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
            .catch(err => console.log('Can not add new word', err)),
    
    register: (tag, callback) => Realm.open({ schema: [schema.wordSchema, schema.topicSchema] })
    .then(realm => {
        realm.addListener(tag, callback);
    })
    .catch(err => {}),

    unregister: (tag, callback) => Realm.open({ schema: [schema.wordSchema, schema.topicSchema] })
    .then(realm => {
        realm.removeListener(tag, callback);
    })
    .catch(err => {}),
}
