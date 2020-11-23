import { Model, DataTypes } from 'sequelize';

export default class Comment extends Model {
  static init(sequelize) {
    return super.init({
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    }, {
      modelName: 'Comment',
      tableName: 'comments',
      timestamps: true,
      sequelize,
    });
  };

  static associate(db) {
    db.Comment.belongsTo(db.Movie);
  };  
};