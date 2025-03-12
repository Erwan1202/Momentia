const Like = require('../models/Like');


exports.createLike = (req, res, next) => {
  const like = new Like.createLike({
    user_id: req.body.user_id,
    post_id: req.body.post_id
  });
  like.save()
    .then(() => res.status(201).json({ message: 'Like enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};


exports.deleteLike = (req, res, next) => {
    Like.deleteLike({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Like supprimé !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.getAllLikes = (req, res, next) => {
    Like.getAllLike()
    .then(likes => res.status(200).json(likes))
    .catch(error => res.status(400).json({ error }));
}

exports.getLikeById = (req, res, next) => {
    Like.getLikeById({ _id: req.params.id })
    .then(like => res.status(200).json(like))
    .catch(error => res.status(404).json({ error }));
}

exports.getLikesByPost = (req, res, next) => {
    Like.getLikeByPost({ post_id: req.params.id })
    .then(likes => res.status(200).json(likes))
    .catch(error => res.status(404).json({ error }));
}

exports.getLikeByComment = (req, res, next) => {
    Like.getLikeByComment({ comment_id: req.params.id })
    .then(likes => res.status(200).json(likes))
    .catch(error => res.status(404).json({ error }));
}

