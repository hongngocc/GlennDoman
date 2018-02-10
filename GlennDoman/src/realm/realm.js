import Realm from 'realm';

import * as schema from './schema/schema';

const ref = Realm.open({
    schema: [schema.topicSchema]
});

export default RealmManager = {
    getAllTopic: () => ref.then(realm => {
        let topicRealm = realm.objects('Topic');
        let topics = []
        console.log(topicRealm.length)
        topicRealm.forEach(value => {
            let valueS = JSON.stringify(value);
            let valueJSOn = JSON.parse(valueS);
            topics.push(valueJSOn)
        })
        console.log("123", topics)
        return topics;
    }),
    createTopic: function (topicObj) {
        ref.then(realm => {
            realm.create('Topic', topicObj)
        })
    },
    updateTopic: function(topicObj) {
        ref.then(realm => {
            realm.create('Topic', topicObj, true);
        })
    }
}
