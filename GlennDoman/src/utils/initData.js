import Realm from 'realm';

import * as schema from '../realm/schema/schema';
export const initData = () => {
    Realm.open({ schema: [schema.topicSchema] })
        .then(realm => {
            if (realm.objects('Topic').length === 0) {
                realm.write(() => {
                    const animalTopic = realm.create('Topic', {
                        title: 'Animals',
                        words: ['Cat', 'Panda', 'Dog'],
                        icon: '../../img/animal.png',
                        time: new Date().getTime().toString()
                    })
                })
            } else {
                return;
            }
        })
        .catch(error => {
            console.log(error);
        });
}