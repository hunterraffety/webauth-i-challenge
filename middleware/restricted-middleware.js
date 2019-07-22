function protected(req, res, next) {
  if (req.session && req.session.name) {
    next();
  } else {
    res.status(401).json({ message: 'Please log in.' });
  }
}

module.exports = protected;
