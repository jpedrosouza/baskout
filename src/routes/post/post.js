const express = require('express');
const handlebars = require('express-handlebars');
const formidable = require('formidable');
const path = require('path');
const mv = require('mv');
const uuid = require('uuid');

const app = express();

const controller = require('../../database/controller');

app.use('/imgs', express.static(path.join(__dirname, '/../../../uploads')));
app.use(express.static(path.join(__dirname, '/../../../public')));
app.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: false }));
app.set('views', __dirname + '/../../views');
app.set('view engine', '.hbs');

// Cria um post no Blog e realiza o upload da imagem para o servidor, além
// de salvar todas as informações tanto da imagem quanto do post no banco
// de dados.
app.post('/create-post', async(req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        // Cria um novo nome para a imagem usando o UUIDV4, garantindo que as 
        // chances de que hajam armazenadas images com o mesmo nome sejam nulas.
        var newFileName = uuid.v4() + files.filetoupload.name;

        var oldpath = files.filetoupload.path;
        var newpath = 'D:/Work/baskout/uploads/' + newFileName;

        mv(oldpath, newpath, async function(err) {
            if (err) throw err;

            const response = await controller.user.getUserByEmail({ email: req.session.email });

            const userId = response[0]['id'];
            const title = fields.title;
            const subtitle = fields.subtitle;
            const content = fields.content;

            await controller.post.createPost({
                title: title,
                subtitle: subtitle,
                content: content,
                imageUrl: `post/imgs/${newFileName}`,
                userId: userId
            });

            var login = 'modal';

            if (req.session.login != null && req.session.login) {
                login = 'none';
            }

            return res.render('principal', { login: login });
        });
    });
});

app.get('/get-posts', async(req, res) => {
    const response = await controller.post.getPosts();

    return res.json(response);
});

module.exports = app;