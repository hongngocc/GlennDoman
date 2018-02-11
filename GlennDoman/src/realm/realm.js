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

    deleleWord: function (wordObj) {
        Realm.open({ schema: [schema.wordSchema, schema.topicSchema] })
            .then(realm => {
                realm.delete(wordObj);
            })
            .catch(err => { console.log('Can not delete Word by error: ', err); })
    },

    unregisterChange: function () {
        Realm.open({ schema: [schema.wordSchema, schema.topicSchema] })
            .then(realm => {
                realm.removeListener('change')
                realm.close();
            });
    },

    loadTopicByName: (topicName) =>
        Realm.open({ schema: [schema.wordSchema, schema.topicSchema] })
            .then(realm => {
                let choosedTopic = realm.objects('Topic').filtered(`title = "${topicName}"`);
                return choosedTopic;
            }),
}
