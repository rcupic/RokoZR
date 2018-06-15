const userRepository = require("../repository/userRepository");
const creditCardRepository = require('../repository/creditCardRepository');

class authController {
  Login(data, callback) {
    userRepository.Login(data, (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  }
  Register(data, callback) {
    userRepository.Register({username:data.username,password:data.password}, (err, result) => {
      if (err) return callback(err);
      creditCardRepository.Create({id:data.id,pin:data.pin,userId: result.id});
      return callback(null, result);
    });
  }
}
module.exports = new authController();
