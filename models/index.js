const User = require('./User');
const Comment = require('./Comment');
const blogPost = require('./blogPost');


User.hasMany(blogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

blogPost.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

blogPost.hasMany(Comment, {
    foreignKey: 'blogPost_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(blogPost, {
  foreignKey: 'blogPost_id'
});




module.exports = { User, Comment, blogPost, };
