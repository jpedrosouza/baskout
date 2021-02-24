const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();

const controller = require('../../database/controller');

app.use(express.static(path.join(__dirname, '/../../../public')));
app.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: false }));
app.set('views', __dirname + '/../../views');
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
    var login = 'modal';

    if (req.session.login != null && req.session.login) {
        login = 'none';
    }

    return res.render('principal', { login: login });
});

app.get('/blog', async(req, res) => {
    var admin = false;

    if (req.session.login != undefined && req.session.login != null && req.session.login) {
        var email = req.session.email;

        const resp = await controller.user.getUserByEmail({ email: email });

        if (resp[0]['admin']) {
            admin = true;
        }
    }

    return res.render('blog', { admin: admin });
});

app.get('/cadastro', (req, res) => {
    return res.render('cadastro');
});

app.get('/logado', (req, res) => {
    return res.render('logado');
});

app.get('/criador', (req, res) => {
    return res.render('post-criador');
});

app.get('/post', async(req, res) => {
    const postId = req.query.id;

    const response = await controller.post.getPostByPk({ id: postId });

    console.log(response[0]['title']);

    var title = response[0]['title'];
    var subtitle = response[0]['subtitle'];
    var content = response[0]['content'];

    return res.render('post', { title: title, subtitle: subtitle, content: content });
});

module.exports = app;