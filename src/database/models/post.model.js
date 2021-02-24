// Realiza a criação do modelo da tabela 'posts' no banco de dados.

module.exports = (sequelize, DataType) => {
    const PostModel = sequelize.define('posts', {
        'title': DataType.STRING,
        'subtitle': DataType.STRING,
        'content': DataType.TEXT,
        'imageUrl': DataType.STRING,
        'userId': DataType.INTEGER
    });

    return PostModel;
};