const Controller = require('../../lib/controller');
const bookModel = require('./bookModel');

class BookController extends Controller {
    // you can override the operations in the controller class
    // here to provide custom logic such as validate
    // query parameters
}

module.exports = new BookController(bookModel);