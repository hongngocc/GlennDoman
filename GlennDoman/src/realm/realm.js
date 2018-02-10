import Realm from 'realm';

import * as schema from './schema/schema';

export default RealmManager = {
    getDatabase() {
        Realm.open({
            schema: [schema.topicSchema, schema.wordSchema]
          }).then(realm => {
                console.log(realm)
          })
    }
}