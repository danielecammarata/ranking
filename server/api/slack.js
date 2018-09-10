
const express = require('express')

const router = express.Router()

router.get('/test', async (req, res) => {

    const { WebClient } = require('@slack/client')

    const token = 'xoxp-432288382578-431710618481-432100598180-93f81725a9ef8770e92ce8a6908ba2a3'

    const web = new WebClient(token)

    const conversationId = 'CCQ537VJ7'

    web.chat.postMessage({ channel: conversationId, text: 'Mucci caccia il grano!'}).then(
        (res) => {
            console.log('Message sent: ', res.ts)
        }
    ).catch(console.error)

})

module.exports = router