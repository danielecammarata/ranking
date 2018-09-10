
const express = require('express')

const router = express.Router()

router.get('/test', async (req, res) => {

    const { WebClient } = require('@slack/client')

    const token = 'xoxp-432288382578-431710618481-433554132487-5a3b9f688ef574be8b3ef950f3249407'

    const web = new WebClient(token)

    const conversationId = 'CCQ537VJ7'

    web.chat.postMessage({ channel: conversationId, text: 'Mucci caccia il grano!'}).then(
        (res) => {
            console.log('Message sent: ', res.ts)
        }
    ).catch(console.error)

})

module.exports = router