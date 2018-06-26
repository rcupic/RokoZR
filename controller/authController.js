const userRepository = require("../repository/userRepository");
const creditCardRepository = require('../repository/creditCardRepository');
const bcrypt = require('bcrypt');

class authController {
  Login(data, callback) {
    userRepository.Login(data, (err, result) => {
      if (err) return callback(err);
      else if(bcrypt.compareSync(data.password,result.password))
        return callback(null, result);
      else
        return callback(null,null);
    });
  }
  Register(data, callback) {
    userRepository.Register({username:data.username,password:data.password}, (err, result) => {
      if (err) return callback(err);
      creditCardRepository.Create({id:data.id,userId: result.id},err => {
        if(err)
          return callback(err);
        return callback(null,result);
      });
    });
  }
}
module.exports = new authController();
