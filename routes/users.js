const usersRouter = require('express').Router();
const usersController = require('../controller/userController');
usersRouter.get('/', (req, res) => {
  if (req.session.user) {
    usersController.FindByName(
      {
        search: req.query.search,
        username: req.session.user.username
      },
      (err, result) => {
        console.log(result);
        if (err) res.send({ name: 'error', message: 'something went wrong' });
        else if (result == null)
          res.send({ name: 'error', message: 'something went wrong' });
        else res.send(result);
      }
    );
  } else res.redirect('/');
});
module.exports = usersRouter;
