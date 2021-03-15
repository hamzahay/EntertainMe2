function errorHandler (err, req, res, next) {
  const errCode = err.name

  switch(errCode) {
    case 'notFound':
      res.json({ message: 'notFound'})
      break;
    default:
      res.json(err)
  }
}

module.exports = errorHandler