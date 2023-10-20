const sequelize = require("../config/connection");
const { User, blogPost, Comment  } = require("../models");
const userData = require("./user_data.json");
const blogPostData = require("./blogPost_data.json");
const commentData = require("./comment_data.json");


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await blogPost.bulkCreate(blogPostData);
  
  await Comment.bulkCreate(commentData);

  console.log("It works!");

  process.exit(0);
};

seedDatabase();
