const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { User, blogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require("sequelize");

const blogPostDataPath = path.join(__dirname, '../seeds/blogPost_data.json');
const blogPostModel = JSON.parse(fs.readFileSync(blogPostDataPath, 'utf8'));

router.get('/', (req, res) => {
    try {
        res.render('login', { layout: 'main', loggedIn: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});
// Come back and fix once you make Handlebars
router.get('/session', withAuth, async (req, res) => {
    try {
        const loggedIn = req.session.logged_in;
    const users = []; 

    res.render('session', {
      layout: 'main',
      loggedIn,
      comment, 
      users,
    });
  } catch (err) {
    res.status(500).json(err);
    }
});

  
  router.post('/session', async (req, res) => {
    try {
      // Handle form submission logic here
      // For example, you can update user session based on form data
      req.session.logged_in = true;
      res.redirect('/session'); // Redirect to the session page after form submission
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  