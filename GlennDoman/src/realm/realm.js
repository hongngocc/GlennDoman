import Realm from 'realm';

import * as schema from './schema/schema';

const ref = Realm.open({
    schema: [schema.topicSchema]
});

export default RealmManager = {
    getAllTopic: (callback) => ref.then(realm => {
        let topicRealm = realm.objects('Topic');
        let topics = []
        console.log(topicRealm.length)
        topicRealm.forEach(value => {
            let valueS = JSON.stringify(value);
            let valueJSOn = JSON.parse(valueS);
            topics.push(valueJSOn)
        })
        realm.addListener('change', callback)
        return topics;
    }),
    createTopic: function (topicObj) {
        ref.then(realm => {
            realm.write(() => {
            realm.create('Topic', topicObj)
            })
        })
    },
    updateTopic: function(topicObj) {
        ref.then(realm => {
            realm.create('Topic', topicObj, true);
        })
    }
}
