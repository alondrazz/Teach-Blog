const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { User, blogPost, dashBoard } = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require("sequelize");

const blogPostDataPath = path.join(__dirname, '../seeds/blogPost_data.json');
const blogPost = JSON.parse(fs.readFileSync(blogPostDataPath, 'utf8'));

router.get('/', (req, res) => {
    try {
        res.render('login', { layout: 'main', loggedIn: req.session.logged_in });
    } catch (err) {
        res.statusMessage(500).json(err);
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
      books, 
      users,
    });
  } catch (err) {
    res.status(500).json(err);
    }
});

// router.get('/display/:id', async (req, res) => {
//     try {
//       const bookId = parseInt(req.params.id, 10);  // Convert id to an integer
  
//       const bookData = await Book.findOne({ where: { id: bookId } });
//       if (!bookData) {
//         res.status(404).json({ message: 'No book found with that id!' });
//         return;
//       }
  
//       const book = bookData.get({ plain: true });
//       const triviaData = await Trivia.findAll({ where: { book_id: bookId } });
  
//       const milestoneTrivia = triviaData.map(t => t.get({ plain: true }));
  
//       console.log('Image URL:', book.image);
  
//       res.render('singleBook', {
//         layout: 'main',
//         title: book.title,
//         image: book.image,
//         id: book.id,
//         milestoneTrivia
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
  
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
  
//   router.get('/user', withAuth, async (req,res)=> {
//     try {
//       const userTriviaData = await UserTrivia.findAll({where: {user_id: req.session.user_id}})
//       const userTrivia = userTriviaData.map(t=>t.get({plain:true}))
//       const triviaIds = userTrivia.map(t=>t.trivia_id)
//       const triviaData = await Trivia.findAll({
//         where: {
//           id: { [Op.in]: triviaIds },
  
//         }, 
//         include: [Book]
//       });
//       const trivia = triviaData.map(t=>t.get({plain:true}))
//       console.log(trivia);
//       res.render("profile", {trivia})
//     } catch (err) {
//       console.log(err.message);
//       res.status(500).json(err.message)
//     }
//   })
  
//   module.exports = router;
  