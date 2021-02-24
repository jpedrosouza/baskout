require('dotenv/config');
const Sequelize = require('sequelize');

// Este arquivo realiza a conexão do servidor com o banco de dados, além
// de ser responsável por criar todas as referenciações.

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./models/user.mode')(sequelize, Sequelize);
db.post = require('./models/post.model')(sequelize, Sequelize);

db.user.hasMany(db.post, { as: 'posts' });
db.post.belongsTo(db.user, { foreignKey: 'userId', as: 'users' });

sequelize.authenticate().then(() => {
    console.log('Connected with success!')
}).catch((err) => {
    console.log('Connection failed!')
});

module.exports = db;