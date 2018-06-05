const usersRouter = require("express").Router();
const usersController = require('../controller/userController');
usersRouter.get("/", (req, res) => {
    usersController.FindByName(
    {
      search: req.query.search,
      username: req.session.user.username
    },
    (err, result) => {
        console.log(result);
        if (err) res.send({name:'error',message:'something went wrong'});
        else if(result == null ) res.send({name:'error',message:'something went wrong'});
        else res.send(result);
    }
  );
});
module.exports = usersRouter;
