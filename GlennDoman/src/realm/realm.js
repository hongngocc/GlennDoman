import Realm from 'realm';

import * as schema from './schema/schema';

const ref = Realm.open({
    schema: [schema.topicSchema]
});

export function getAllTopic() {
    ref.then(realm => {
        let topicRealm = realm.objects('Topic');
        let topics = []
        topicRealm.forEach(value => {
            let valueS = JSON.stringify(value);
            let valueJSOn = JSON.parse(valueS);
            topics.push(valueJSOn)
        })
        return topics;
    })
}
export function createTopic(topicObj) {
    ref.then(realm => {
        realm.create('Topic', topicObj)
    })
}
export function updateTopic(topicObj) {
    ref.then(realm => {
        realm.create('Topic', topicObj, true);
    })
}

