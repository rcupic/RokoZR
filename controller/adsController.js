const adRepository = require('../repository/adRepository');

class AdController {
    Create(data,callback) {
        adRepository.Create(data,(err,result) => {
            if(err)
                return callback(err);
            return callback(null,result);
        });
    }
    GetUsersAd(data,callback) {
        adRepository.FindById(data,(err,result) => {
            if(err)
                return callback(err);
            else
                return callback(null,result);
        });
    }
}
module.exports = new AdController();