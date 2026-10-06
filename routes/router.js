const Router = require('express').Router();

const authRouter = require('./auth.routes')
const destinationRouter = require('./destination.routes')

const router = Router

router.use("/auth", authRouter)
router.use('/destination', destinationRouter)

module.exports = router;