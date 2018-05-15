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
        adRepository.FindByUserId(data,(err,result) => {
            if(err)
                return callback(err);
            else
                return callback(null,result);
        });
    }
    FindAllByName(data,callback) {
        adRepository.FindAllByName(data,(err,result) => {
            if(err)
                return callback(err);
            return callback(null,result);
        });
    }
    DonateToAd(data) {
        adRepository.Donate(data);
    }
}
module.exports = new AdController();