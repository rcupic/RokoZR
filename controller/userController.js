const userRepository = require("../repository/userRepository");

class userController {
  Update(data) {
    userRepository.Update(data);
  }
  FindById(data, callback) {
    userRepository.FindById(data, (err, user) => {
      if (err) return callback(err);
      return callback(null, user);
    });
  }
  FindByName(data,callback) {
    userRepository.FindByName(data,(err,result) => {
      if(err)
        return callback(err);
      return callback(null,result);
    });
  }
}
module.exports = new userController();
