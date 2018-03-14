const adRepository = require('../repository/adRepository');

class AdController {
    Create(data,callback) {
        console.log(data);
        adRepository.Create(data,(err,result) => {
            if(err)
                return callback(err);
            return callback(null,result);
        });
    }
}
module.exports = new AdController();