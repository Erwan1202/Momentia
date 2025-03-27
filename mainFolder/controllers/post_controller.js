// post_controller.js
const Post = require('../models/Post');

// creation post avec image upload
// Création d’un post avec upload d'image
exports.createPost = (req, res) => {
    const { caption, location, user_id } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
        return res.status(400).json({ error: 'Aucune image fournie.' });
    }

    const imageUrl = `http://momentia.cloud/uploads/${imageFile.filename}`;

    const sql = `INSERT INTO posts (user_id, caption, image_url, location, created_at) VALUES (?, ?, ?, ?, NOW())`;
    const values = [user_id, caption, imageUrl, location];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('❌ Erreur lors de l\'insertion du post :', err);
            return res.status(500).json({ error: 'Erreur lors de la création du post.' });
        }
        res.status(201).json({ message: '✅ Post créé avec succès !' });
    });
};

// modification post
exports.modifyPost = (req, res, next) => {
  try {
    const updatedData = {
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId,
    };

    if (req.file) {
      updatedData.imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    } else if (req.body.imageUrl) {
      updatedData.imageUrl = req.body.imageUrl;
    }

    Post.updateOne({ _id: req.params.id }, updatedData)
      .then(() => res.status(201).json({ message: 'Post updated successfully!' }))
      .catch((error) => res.status(400).json({ error }));
  } catch (error) {
    res.status(500).json({ error });
  }
};

// suppression post
exports.deletePost = (req, res, next) => {
  try {
    Post.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Post deleted successfully!' }))
      .catch((error) => res.status(400).json({ error }));
  } catch (error) {
    res.status(500).json({ error });
  }
};

// recuperation post
exports.getOnePost = (req, res, next) => {
  try {
    Post.findOne({ _id: req.params.id })
      .then((post) => res.status(200).json(post))
      .catch((error) => res.status(404).json({ error }));
  } catch (error) {
    res.status(500).json({ error });
  }
};

// recuperation de tous les posts
exports.getAllPosts = (req, res, next) => {
  try {
    Post.find()
      .then((posts) => res.status(200).json(posts))
      .catch((error) => res.status(400).json({ error }));
  } catch (error) {
    res.status(500).json({ error });
  }
};

// recuperation de tous les posts d'un utilisateur
exports.getAllPostsByUser = (req, res, next) => {
  try {
    Post.find({ userId: req.params.id })
      .then((posts) => res.status(200).json(posts))
      .catch((error) => res.status(400).json({ error }));
  } catch (error) {
    res.status(500).json({ error });
  }
};

// recuperation des posts par date decroissante
exports.getPostsByDate = (req, res, next) => {
  try {
    Post.find().sort({ created_at: -1 })
      .then((posts) => res.status(200).json(posts))
      .catch((error) => res.status(400).json({ error }));
  } catch (error) {
    res.status(500).json({ error });
  }
};