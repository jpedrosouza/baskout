// Este arquivo é responsável por criar todas as querys com o banco de 
// dados em relação a tabela 'posts'.

const db = require('../database');

exports.createPost = (post) => {
    db.post.create({
        'title': post.title,
        'subtitle': post.subtitle,
        'content': post.content,
        'imageUrl': post.imageUrl,
        'userId': post.userId
    });
}

exports.getPosts = () => {
    return db.post.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
    })
}

exports.getPostByPk = (post) => {
    return db.post.findAll({
        where: {
            id: post.id
        },
        include: ["users"]
    });
}