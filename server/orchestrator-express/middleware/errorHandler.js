function errHandler (err, req, res, next) {
  const errName = err.name

  switch(errName) {
    case 'notFound':
      res.status(404).json({ message: 'Data Not Found' })
    default:
      res.status(500).json({ message: 'Error', error: err.message })
  }
}

module.exports = errHandler