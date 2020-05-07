let express = require("express");
let router = express.Router();
let Comment = require("../models/comment");
let Article = require("../models/article");

// rendering edit comments.
router.get("/:id/edit", (req, res, next) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) return next(err);
    res.render("editComments", { comment });
  });
});

// submitting edit form,
router.post("/:id/edit", (req, res, next) => {
  Comment.findByIdAndUpdate(req.params.id, req.body, (err, comment) => {
    if (err) return next(err);
    res.redirect(`/articles/${comment.articleId}`);
  });
});

// deleting comment.
router.get("/:commentId/delete", (req, res, next) => {
  let commentId = req.params.commentId;
  Comment.findByIdAndDelete(commentId, (err, data) => {
    if (err) return next(err);
    Article.findByIdAndUpdate(
      data.articleId,
      { $pull: { comments: commentId } },
      (err, updatedArticle) => {
        //using pull to remove comments from the database.
        if (err) return next(err);
        res.redirect("/articles/" + data.articleId);
      }
    );
  });
});

module.exports = router;
