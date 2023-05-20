const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

User.hasMany(Blog, {
    foreignKey: "user_id",
    onDelete: "CASCADE",

})

User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE",

})

Blog.hasMany(Comment, {
    foreignKey: "blog_id",
    onDelete: "CASCADE",

})

Blog.belongTo(User, {
    foreignKey: "user_id",

})

Comment.belongTo(User, {
    foreignKey: "user_id",

})

Comment.belongTo(Blog, {
    foreignKey: "blog_id",

})


module.exports = { User, Blog, Comment };

