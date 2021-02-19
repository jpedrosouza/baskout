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