const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

module.exports = router