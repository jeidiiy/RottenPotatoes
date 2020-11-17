import { Model, DataTypes } from 'sequelize';


export default class Comment extends Model {
  static init(sequelize) {
    return super.init({
      userid: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: 'Anonymous',
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, {
      modelName: 'Comment',
      tableName: 'comments',
      timestamps: true,
      sequelize
    });
  }

  static associate(db) {
    db.Comment.belongsTo(db.Movie);
  }
}

