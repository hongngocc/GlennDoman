export const topicSchema = {
    name: 'Topic',
    properties: {
        title: 'string',
        words: 'Word[]'
    }
}

export const wordSchema = {
    name: 'Word',
    properties: {
        title: 'string',
        res: 'string'
    }
}