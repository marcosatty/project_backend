module.exports.checkAuth = function (req, res, next) {
  const userId = req.session.userid;

  if (!userId) {
      return res.redirect('/login'); // Use return para interromper a execução aqui
  }

  next();
};
