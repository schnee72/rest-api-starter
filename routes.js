const Router = require('express').Router;
const router = new Router();

// add routers here for each model
const bookRouter = require('./model/bookModel/bookRouter');

router.route('/').get((req, res) => {
    res.json({ message: 'Welcome to this API!' });
});

// hook up routers here
router.use('/api/books', bookRouter);

module.exports = router;