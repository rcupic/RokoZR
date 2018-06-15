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
      else if(user.messageTo.length !== 0) {
        for(i = 0;i < user.messageTo.length;i++) {
          if(!moment(user.userLogin.time).isBefore(moment(user.messageTo[i].createdAt))) 
            break;
        }
      }else 
        i = 0;
      user.unreadMessages = i;
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
