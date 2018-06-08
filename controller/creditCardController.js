const creditCardRepository = require("../repository/creditCardRepository");

class creditCardController {
  Create(data,callback) {
    creditCardRepository.Create(data,(err,message) => {
        if(err)
            return callback(err);
        return callback(null,message);
    });
  }
  FindByUserAndId(data,callback) {
    creditCardRepository.FindByUserAndId(data,(err,card) => {
      if(err)
        return callback(err);
      return callback(null,card);
    });
  }
}
module.exports = new creditCardController();
