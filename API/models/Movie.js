import { Model, DataTypes } from 'sequelize';

export default class Movie extends Model {
  static init(sequelize) {
    return super.init({
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    }, {
      modelName: 'Movie',
      tableName: 'movies',
      timestamps: true,
      sequelize,
    });
  };

  static associate(db) {
    db.Movie.hasMany(db.Comment);
  };  
};