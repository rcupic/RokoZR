const userRepository = require("../repository/userRepository");
const moment = require('moment');

class userController {
  Update(data) {
    userRepository.Update(data);
  }
  FindById(data, callback) {
    userRepository.FindById(data, (err, user) => {
      let i;
      if (err) return callback(err);
      for(i = user.messageTo.length;i > 0;i--) {
        if(!moment(user.userLogin.time).isBefore(moment(user.messageTo[i-1].createdAt)))
          break;
      }
      user.unreadMessages = user.messageTo.length - i;
      user.messageTo = user.messageTo.reverse();
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
