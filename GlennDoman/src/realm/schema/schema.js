export const topicSchema = {
    name: 'Topic',
    primaryKey: 'title',
    properties: {
        title: 'string',
        words: {type: 'list', objectType: 'Word'},
        icon: 'string',
        time: 'string'
    }
}

export const wordSchema = {
    name: 'Word',
    primaryKey: 'text',
    properties: {
        text: 'string',
        isComplete: 'bool',
        path: 'string'
    }
}