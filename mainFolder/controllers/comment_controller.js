const Comment = require('../models/Comment');

//creation commentaire
exports.createComment = (req, res, next) => {
    try {
        const comment = new Comment({
            postId: req.body.postId,
            userId: req.body.userId,
            content: req.body.content
        });
        comment.save().then(() => {
            res.status(201).json({
                message: 'Comment saved successfully!'
            });
        }).catch((error) => {
            res.status(400).json({
                error: error
            });
        });
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//modification commentaire
exports.updateComment = (req, res, next) => {
    try {
        const comment = new Comment({
            _id: req.params.id,
            postId: req.body.postId,
            userId: req.body.userId,
            content: req.body.content
        });
        Comment.updateOne({ _id: req.params.id }, comment).then(() => {
            res.status(201).json({
                message: 'Comment updated successfully!'
            });
        }).catch((error) => {
            res.status(400).json({
                error: error
            });
        });
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//suppression commentaire
exports.deleteComment = (req, res, next) => {
    try {
        Comment.deleteOne({ _id: req.params.id }).then(() => {
            res.status(200).json({
                message: 'Comment deleted successfully!'
            });
        }).catch((error) => {
            res.status(400).json({
                error: error
            });
        });
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//recuperation commentaire
exports.getCommentById = (req, res, next) => {
    try {
        Comment.findOne({ _id: req.params.id }).then((comment) => {
            res.status(200).json(comment);
        }).catch((error) => {
            res.status(404).json({
                error: error
            });
        });
    }

    catch (error) {
        res.status(500).json({
            error: error
        });
    }

}

//recuperation de tous les commentaires
exports.getAllComment = (req, res, next) => {
    try {
        Comment.find().then((comments) => {
            res.status(200).json(comments);
        }).catch((error) => {
            res.status(400).json({
                error: error
            });
        });
    }
    catch (error) {
        res.status(500).json({
            error: error

        });
    }
}

//recuperation des commentaires d'un post
exports.getCommentsByPost = (req, res, next) => {
    try {
        Comment.find({ postId: req.params.id }).then((comments) => {
            res.status(200).json(comments);
        }).catch((error) => {
            res.status(400).json({
                error: error
            });
        });
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//recuperation des commentaires d'un utilisateur
exports.getCommentsByUser = (req, res, next) => {
    try {
        Comment.find({ userId: req.params.id }).then((comments) => {
            res.status(200).json(comments);
        }).catch((error) => {
            res.status(400).json({
                error: error
            });
        });
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//recuperation des commentaires d'un utilisateur sur un post
exports.getCommentsByUserAndPost = (req, res, next) => {
    try {
        Comment.find({ userId: req.params.userId, postId: req.params.postId }).then((comments) => {
            res.status(200).json(comments);
        }).catch((error) => {
            res.status(400).json({
                error: error
            });
        });
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//recuperation des dernier commentaires 
exports.getCommentsByDate = (req, res, next) => {
    try {
        Comment.find().sort({ createdAt: -1 }).then((comments) => {
            res.status(200).json(comments);
        }).catch((error) => {
            res.status(400).json({
                error: error
            });
        });
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//recuperation des commentaires par likes
exports.getCommentsByLikes = (req, res, next) => {
    try {
        Comment.find().sort({ likes: -1 }).then((comments) => {
            res.status(200).json(comments);
        }).catch((error) => {
            res.status(400).json({
                error: error
            });
        });
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//like commentaire
exports.likeComment = (req, res, next) => {
    try {
        Comment.findOne({ _id: req.params.id }).then((comment) => {
            Comment.updateOne({ _id: req.params.id }, { likes: comment.likes + 1 }).then(() => {
                res.status(200).json({
                    message: 'Comment liked successfully!'
                });
            }).catch((error) => {
                res.status(400).json({
                    error: error
                });
            });
        }).catch((error) => {
            res.status(404).json({
                error: error
            });
        });
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//dislike commentaire
exports.dislikeComment = (req, res, next) => {
    try {
        Comment.findOne({ _id: req.params.id }).then((comment) => {
            Comment.updateOne({ _id: req.params.id }, { likes: comment.likes - 1 }).then(() => {
                res.status(200).json({
                    message: 'Comment disliked successfully!'
                });
            }).catch((error) => {
                res.status(400).json({
                    error: error
                });
            });
        }).catch((error) => {
            res.status(404).json({
                error: error
            });
        });
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
}
