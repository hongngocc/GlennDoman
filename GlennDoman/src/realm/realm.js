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
            realm.close();
            return topics;
        })
        .catch(err => console.log('Can not get by error: ', err)),

    createTopic: function (topicObj, isUpdate = false) {
        Realm.open({ schema: [schema.wordSchema, schema.topicSchema] })
            .then(realm => {
                realm.write(() => {
                    realm.create('Topic', topicObj, isUpdate);
                })
                realm.close();
            })
            .catch(err => console.log('Can not create by error: ', err))
    },

    deleteTopic: function (topicObj) {
        Realm.open({ schema: [schema.wordSchema, schema.topicSchema] })
            .then(realm => {
                realm.write(() => {
                    realm.delete(topicObj);
                })
                realm.close();
            })
            .catch(err => console.log('Can not delete Topic by error: ', err))
    },

    deleleWord: function (text) {
        Realm.open({ schema: [schema.lessonSchema, schema.wordSchema, schema.topicSchema] })
            .then(realm => {
                realm.write(() => {
                    realm.objects('Word').filtered(`text = "${text}"`).forEach(word => {
                        realm.delete(word);
                    })
                })
                realm.close();
            })
            .catch(err => { console.log('Can not delete Word by error: ', err); })
    },

    loadTopicByName: (topicName) =>
        Realm.open({ schema: [schema.wordSchema, schema.topicSchema] })
            .then(realm => {
                let choosedTopic = realm.objects('Topic').filtered(`title = "${topicName}"`);
                let topicObj = {};
                choosedTopic.forEach(data => {
                    topicObj = convertToJsonObj(data, 'topic');
                })
                realm.close();
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
                realm.close();
            })
            .catch(err => ToastAndroid.show('Can not create', ToastAndroid.SHORT, ToastAndroid.BOTTOM)),

    toggleCompleteState: (words) => {
        Realm.open({ schema: [schema.lessonSchema, schema.wordSchema, schema.topicSchema] })
            .then(realm => {
                realm.write(() => {
                    for (let i = 0; i < words.length; i++) {
                        const text = words[i].text;
                        let word = realm.objects('Word').filtered(`text = "${text}"`);
                        let wordObjRealm = {};
                        word.forEach(value => {
                            wordObjRealm = value;
                        })

                        wordObjRealm.isComplete = true;

                        realm.create('Word', wordObjRealm, true);
                    }
                })
                realm.close();
            })
    },

    createLesson: (description, words, time) => {
        Realm.open({ schema: [schema.lessonSchema, schema.wordSchema, schema.topicSchema] })
            .then(realm => {
                realm.write(() => {
                    let listWord = [];
                    words.forEach(word => {
                        realm.objects('Word').filtered(`text = "${word}"`).forEach(_word => {
                            listWord.push(_word);
                        });
                    });

                    let less = realm.create('Lesson', {
                        description: description,
                        words: listWord,
                        time: time,
                        timeCompleted: '',
                        isComplete: false
                    })

                    console.log(less)
                });

                realm.close();
            })
    },

    getAllLesson: (isHistory = false) => Realm.open({ schema: [schema.lessonSchema, schema.wordSchema, schema.topicSchema] })
        .then(realm => {
            let lessons = [];
            realm.objects('Lesson').filtered(`isComplete = ${isHistory}`).forEach(lessonRealm => {
                let lessonObj = convertToJsonObj(lessonRealm, 'lesson');
                lessons.push(lessonObj)
            })
            realm.close();
            console.log('getAllLesson', lessons)
            return lessons;
        }),

    updateLesson: (lessonObj) => {
        let lessonRealm = new Realm({ schema: [schema.lessonSchema, schema.wordSchema, schema.topicSchema] })
        lessonRealm.write(() => {
            lessonRealm.create('Lesson', lessonObj, true)
        })
    },

    loadLessonByDescription: (description) =>
        Realm.open({ schema: [schema.lessonSchema, schema.wordSchema, schema.topicSchema] })
            .then(realm => {
                let _lesson = realm.objects('Lesson').filtered(`description = "${description}"`);
                let lessonObj = {};
                _lesson.forEach(data => {
                    lessonObj = convertToJsonObj(data, 'lesson');
                })
                realm.close();
                return lessonObj;
            })
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
        case 'lesson':
            let lessonObj = {};
            lessonObj.description = realmObj.description;
            lessonObj.words = [];
            lessonObj.time = realmObj.time;
            lessonObj.timeCompleted = realmObj.timeCompleted;
            lessonObj.isComplete = realmObj.isComplete

            realmObj.words.forEach(wordRealm => {
                let wordObj = {};
                wordObj.text = wordRealm.text;
                wordObj.isComplete = wordRealm.isComplete;
                wordObj.path = wordRealm.path;

                lessonObj.words.push(wordObj)
            })
            return lessonObj;
    }
}
