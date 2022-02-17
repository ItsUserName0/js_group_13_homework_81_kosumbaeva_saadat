const express = require('express');
const { nanoid } = require('nanoid');
const Link = require('../models/Link');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    if (!req.body.originalUrl) {
      return res.status(400).send({message: 'Url is required!'});
    }

    let shortUrl = nanoid(6);
    let existLink = await Link.findOne({shortUrl: shortUrl});
    while (existLink) {
      shortUrl = nanoid(6);
      existLink = await Link.findOne({shortUrl: shortUrl});
    }

    const linkData = {
      originalUrl: req.body.originalUrl,
      shortUrl: shortUrl,
    };

    const link = new Link(linkData);
    await link.save();

    return res.send(link);
  } catch (e) {
    next(e);
  }
});

router.get('/:shortUrl', async (req, res, next) => {
  try {
    const link = await Link.findOne({shortUrl: req.params.shortUrl});
    if (!link) {
      return res.status(404).send({message: 'Not Found'});
    }
    return res.status(301).redirect(link['originalUrl']);
  } catch (e) {
    next(e);
  }
});

module.exports = router;