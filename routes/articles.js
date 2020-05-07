let express = require('express');
let router = express.Router();
let Article = require('../models/article');
let Comment = require('../models/comment');

// Home
router.get('/home', (req,res) => {
    res.render('home');
})

// Login
router.get("/login", (req, res) => {
  res.render("login");
});

// Register
router.get("/register", (req, res) => {
  res.render("register");
});

// creating article.
router.get('/new', (req,res) => {
    res.render('articleForm');
})

// submitting article form to create it.
router.post('/new', (req,res) => {
    Article.create(req.body, (err,article) => {
        if (err) return next(err);
        res.redirect('/articles');
    })
})

// Editing article.
router.get('/:id/edit', (req,res, next) => {
    Article.findById(req.params.id, (err,article) => {
        if (err) return next (err);
        res.render('editArticle', { article });
    })
})

// Updating article.
router.post('/:id/edit', (req,res) => {
    Article.findByIdAndUpdate(req.params.id, req.body, (err,article) => {
        if (err) next(err);
        res.redirect(`/articles/${req.params.id}`);
    })
})

// Getting articles list.
router.get('/', (req,res,next) => {
    Article.find({}, (err,articles) => {
        if(err) return next(err);
        res.render('articleList', {articles});
    })
})

// Getting article details and adding comments.
router.get('/:id', (req,res,next) => {
    var articleId = req.params.id;
    console.log(articleId);
    Article.findById(articleId) //Getting object id from the url.
    .populate('comments', 'content author')
    .exec((err, article) => {
        if (err) return next(err);
        res.render("articleDetails", { article});
    })
});

// Creating Comment.
router.post('/:id', (req,res,next) => {
    var id = req.params.id; //storing the id from the url inside a variable.
    req.body.articleId = id;
    Comment.create(req.body, (err,comment) => {
        if (err) return next(err);

        // update article's comments array with newly created comment id
        Article.findByIdAndUpdate(id, {$push: {comments: comment.id}}, {new:true} ,(err,data) => {
            console.log(id, 'received');
            if (err) return next(err);
            res.redirect(`/articles/${id}`);
        })
    })
})

// Deleting article.
router.get('/:id/delete', (req,res) => {
    Article.findByIdAndDelete(req.params.id, (err,data) => {
        if (err) return next (err);
        res.redirect('/articles');
    })
})

module.exports = router;