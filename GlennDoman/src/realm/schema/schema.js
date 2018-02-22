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

export const lessonSchema = {
    name: 'Lesson',
    properties: {
        description: 'string',
        // topics: {type: 'list', objectType: 'Topic'},
        words: {type: 'list', objectType: 'Word'},
        time: 'string',
        timeCompleted: 'string',
        isComplete: 'bool'
    }
}