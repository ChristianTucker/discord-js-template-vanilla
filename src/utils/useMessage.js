

function useMessage(content) {
    return {
        content,
        author: {
            id: 'test',
            username: 'TestUser',
            discriminator: '1234'
        },
        channel: {
            id: 'testID',
            messages: [],
            send(content) {
                return this.messages.push(content)
            }
        }
    }
}
  
module.exports = useMessage;