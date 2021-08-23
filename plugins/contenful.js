const contentful = require('contentful')

const client = contentful.createClient({
    space : '72782df9afoq' ,
    accessToken: 'lqdJV-3zY107xPfTpo9VbBTac7-RlHIPNww4BWzT5ag'
})

module.exports = client