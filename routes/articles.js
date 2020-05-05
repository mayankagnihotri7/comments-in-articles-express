let express = require('express');
let router = express.Router();
let Article = require('../models/article');
let Comment = require('../models/comment')
// let commentRouter = require('./comments');

router.get('/', (req,res,next)=>{
    Article.find({}, (err,articles) => {
        if(err) return next(err);
        res.render('articleList', {articles});
    })
})

router.post('/', (req,res,next)=>{
    Article.create(req.body, (err,article) => {
        if (err) return next(err);
        res.redirect('/articles');
    })
})

router.get('/:id', (req,res) => {
    Article.findById(req.params.id, (err,article)=>{
        if(err) return next(err);
        // Comment.find({articleId}, (err,article)=>{
            // if(err) return next(err);
            res.render('articleDetails', {article});
        // })
    })
});

router.post('/:articleId/comments', (req,res)=>{
    req.body.articleId = req.params.articleId;
    Comment.create(req.body, (err,createComment) => {
        if(err) return next(err);
        // Article.findByIdAndUpdate(articleId, {$push: {comments: 'createComment.id'}}, (err,article) => {
            // if(err) return next(err);
            res.redirect(`/articles/${articleId}`)
        // });
    });
});

// Comment edit form.
router.get('articleId/comments/:commentId/edit', (req,res) => {
    res.render('editCommentForm');
});

// Update comments.


// router.use('/', commentRouter);

module.exports = router;