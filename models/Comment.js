 const { Model, Datatypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
    {
       id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        },
       comment: {
        type: Datatypes.INTEGER,
        allowNull: false,
       },
       date_created: {
        type: Datatypes.INTEGER,
        allowNull: false,
       },
       user_id: {
        type: Datatypes.INTEGER,
        references: {
            model: "user",
            key: "id",
        }
       }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "comment", 
    }
);

module.exports = Comment;