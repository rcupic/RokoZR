const userRepository = require("../repository/userRepository");

class authController {
  Login(data, callback) {
    userRepository.Login(data, (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  }
  Register(data, callback) {
    userRepository.Register(data, (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  }
}
module.exports = new authController();
