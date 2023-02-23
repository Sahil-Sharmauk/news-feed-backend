const Router = require ('express');
const feedRouter=  require('./feedsRouter.js')
const router = Router();
router.use('/news-articles',feedRouter)

module.exports = router;