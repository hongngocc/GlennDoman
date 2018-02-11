import Realm from 'realm';

import * as schema from '../realm/schema/schema';
export const initData = () => {

    Realm.open({ schema: [schema.wordSchema, schema.topicSchema] })
        .then(realm => {
            realm.write(() => {
                let topic = realm.create('Topic', {
                    title: 'Animals',
                    words: [],
                    icon: '',
                    time: new Date().getTime().toString()
                });
                topic.words.push({ text: 'Cat', isComplete: false, path: '' });
                topic.words.push({ text: 'Dog', isComplete: false, path: '' });
                topic.words.push({ text: 'Bear', isComplete: false, path: '' });
                topic.words.push({ text: 'Fish', isComplete: false, path: '' });
                topic.words.push({ text: 'Elephant', isComplete: false, path: '' });

                let family = realm.create('Topic', {
                    title: 'Family',
                    words: [],
                    icon: '',
                    time: new Date().getTime().toString()
                });

                family.words.push({ text: 'Dad', isComplete: false, path: '' });
                family.words.push({ text: 'Mommy', isComplete: false, path: '' });
                family.words.push({ text: 'Uncle', isComplete: false, path: '' });
                family.words.push({ text: 'Brother', isComplete: false, path: '' });
                family.words.push({ text: 'Sister', isComplete: false, path: '' });
            });
            realm.close();
        }).catch(err => {});
}