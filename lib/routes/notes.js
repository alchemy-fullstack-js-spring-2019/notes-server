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

  .get('/', (req, res, next) => {
    Note
      .find()
      .then(notes => joinUsers(notes, 'author'))
      .then(notes => res.send(notes))
      .catch(next);
  });
