// Realiza a criação do modelo da tabela 'users' no banco de dados.

module.exports = (sequelize, DataType) => {
    const UserModel = sequelize.define('users', {
        'name': DataType.STRING,
        'email': DataType.STRING,
        'admin': DataType.BOOLEAN,
        'password_hash': DataType.STRING,
        'password_salt': DataType.STRING
    })

    return UserModel;
}