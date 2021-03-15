function errorHandler (err, req, res, next) {
  const errName = err.name

  switch(errName) {
    case 'notFound':
      res.json({ message: 'notFound'})
      break;
    default:
      res.json(err)
  }
}

module.exports = errorHandler