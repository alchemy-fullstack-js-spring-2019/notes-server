const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const { joinUsers } = require('../services/auth');
const Note = require('../models/Note');

module.exports = Router()
  .post('/', ensureAuth(), (req, res, next) => {
    const { title, body } = req.body;

    Note
      .create({ title, body, author: req.user.sub })
      .then(note => res.send(note))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Note
      .findById(req.params.id)
      .then(note => joinUsers([note], 'author'))
      .then(([note]) => res.send(note))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    const { page = 1 } = req.query;
    Note
      .find()
      .limit(20)
      .skip((page - 1) * 20)
      .then(notes => joinUsers(notes, 'author'))
      .then(notes => res.send(notes))
      .catch(next);
  })

  .put('/:id', ensureAuth(), (req, res, next) => {
    console.log(req.user);
    const { title, body } = req.body;
    Note
      .findOneAndUpdate(
        { _id: req.params.id, author: req.user.sub },
        { title, body },
        { new: true })
      .then(note => joinUsers([note], 'author'))
      .then(([note]) => res.send(note))
      .catch(next);
  });
