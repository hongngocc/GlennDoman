import Realm from 'realm';

import * as schema from '../realm/schema/schema';
export const initData = () => {
    Realm.open({ schema: [schema.topicSchema] })
        .then(realm => {
            realm.write(() => {
                const animalTopic = realm.create('Topic', {
                    title: 'Animals',
                    words: ['Cat', 'Panda', 'Dog'],
                    icon: 'animal',
                    time: new Date().getTime().toString()
                })
            })
        })
        .catch(error => {
            console.log(error);
        });
}