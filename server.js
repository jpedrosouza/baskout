const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

const db = require('./src/database/database');
const routes = require('./src/routes/routes');

app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());

app.use('/', routes);

app.listen(7080, () => {
    // Sincroniza e reseta o banco de dados, apagando e recriando todas as 
    // tabelas criadas.

    // db.sequelize.sync({ force: true }); 

    // Sincroniza o banco de dados mas não o reseta e nem apaga as tabelas
    // existentes, apenas cria as tabelas se elas não existirem.

    db.sequelize.sync({});

    console.log(`Server listening at https://localhost:7080`);
});