let express = require('express');
let router = express.Router();
let Article = require('../models/article');
let Comment = require('../models/comment')
// let commentRouter = require('./comments');

// Getting articles list.
router.get('/', (req,res,next) => {
    Article.find({}, (err,articles) => {
        if(err) return next(err);
        res.render('articleList', {articles});
    })
})

// Getting article details and adding comments.
router.get('/:id', (req,res,next) => {
    Article.findById(req.params.id, (err, article) => { //Getting object id from the url.
        if (err) return next(err);
        Comment.find({articleId: req.params.id}, (err, comments) => { //if article id is equal or contains the id obtained from url.
            if (err) return next(err);
            res.render('articleDetails', {article, comments}); //rendering the page at which article details needs to be shown.
        })
    })
});

// Creating Comment.
router.post('/:id', (req,res,next) => {
    var id = req.params.id; //storing the id from the url inside a variable.
    req.body.articleId = id;
    Comment.create(req.body, (err,comment) => {
        if (err) return next(err);
        res.redirect(`/articles/${id}`);
    })
})

// Editing Comments.
router.get('/:articleId/comments/:commentId/edit', (req,res,next) => {
    Article.findById(req.params.articleId, (err,article) => {
        console.log(article, 'Article id here...')
        if(err) return next(err);
        Comment.findById(req.params.commentId, (err,data) => { //finding comment to update by it's id and updating it with the content of body.
        //console.log(req.params.commentId, 'Comment id reporting on duty.');
        //console.log(data, 'Comment data here!')
            if(err) return next(err);
            res.render('editComments', {article, data});
        })
    })
})

// Submitting the update form.
router.post('/:articleId/comments/:commentId/edit', (req,res,next) => {
    console.log('Here');
    console.log(req.params.articleId, 'Hello!');
    req.body.articleId = req.params.articleId;
    Comment.findByIdAndUpdate(req.params.commentId, req.body,(err,comment) => {
        console.log(comment, 'Comments Here!');
        res.redirect(`/articles/${req.params.articleId}`);
    })
})

// Deleting article.
router.get('/:articleId/comments/:commentId/delete', (req,res,next) => {
    Comment.findByIdAndDelete(req.params.commentId, (err, deleted) => {
        if (err) return next(err);
        res.redirect(`/articles/${req.params.articleId}`);
    })
})

module.exports = router;