const express = require('express');

const app = express();

const controller = require('../../database/controller');
const password_manager = require('../../utils/password_manager');

app.post('/create-user', async(req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const password_salt = await password_manager.gerarSalt();
    const password_hash = await password_manager.sha512(password, password_salt);

    await controller.user.createUser({
        name: name,
        email: email,
        password_hash: password_hash,
        password_salt: password_salt
    });

    return res.json({
        status_code: 200,
        message: 'User created successfully'
    });
});

app.post('/login', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const resp = await controller.user.getUserByEmail({ email: email });

    if (res.length == 0) {
        return res.send().end();
    }

    const passwordSalt = resp[0]['password_salt'];
    const passwordHash = resp[0]['password_hash'];

    const genPassHash = await password_manager.validarSenha(password, passwordSalt);

    if (passwordHash == genPassHash) {
        req.session.login = true;
        req.session.email = resp[0]['email'];

        return res.json({
            code: 200
        });
    } else {
        return res.json({
            code: 0
        });
    }
});

module.exports = app;