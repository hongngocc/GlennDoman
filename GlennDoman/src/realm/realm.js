import Realm from 'realm';

import * as schema from './schema/schema';

export default RealmManager = {
    getAllTopic: () => Realm.open({
        schema: [schema.topicSchema]
    }).then(realm => {
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
    })
}
