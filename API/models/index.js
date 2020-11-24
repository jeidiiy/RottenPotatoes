require('dotenv').config();
import Sequelize from 'sequelize';
import Movie from './Movie';
import Comment from './Comment';
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')['default'][env];
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.Movie = Movie;
db.Comment = Comment;

Object.keys(db).forEach(modelName => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;