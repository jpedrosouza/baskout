const controller = {};

controller.user = require('./controllers/user.controller');
controller.post = require('./controllers/post.controller');

module.exports = controller;