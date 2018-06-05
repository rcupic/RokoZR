const messagesRepository = require("../repository/messagesRepository");

class MessagesController {
  Create(data,callback) {
    messagesRepository.Create(data,(err,message) => {
        if(err)
            return callback(err);
        return callback(null,message);
    });
  }
  FindBySentTo(data,callback) {
    messagesRepository.FindBySentTo(data,(err,messages) => {
      if(err)
        return callback(err);
      return callback(null,messages);
    });
  }
}
module.exports = new MessagesController();
