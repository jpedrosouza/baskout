const db = require('../database');

exports.createUser = (user) => {
    db.user.create({
            'name': user.name,
            'email': user.email,
            'admin': false,
            'password_hash': user.password_hash,
            'password_salt': user.password_salt
        }).then((user) => {
            console.log(">> Created user: " + JSON.stringify(user, null, 4));
            return user;
        })
        .catch((err) => {
            console.log(">> Error while creating user: ", err);
            return null;
        });
}

exports.getUserByPk = (user) => {
    return db.user.findByPk(user.id);
}

exports.getUserByEmail = (user) => {
    return db.user.findAll({
        where: {
            email: user.email
        }
    });
}