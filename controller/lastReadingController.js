const lastReadingRepository = require('../repository/lastReadingRepository');
class LastReadingController {
    Create(data,callback) {
        data.time = new Date();
        lastReadingRepository.Create(data,err => {
            if(err)
                return callback(err);
            return callback(null);
        });
    }
    Update(data,callback) {
        data.time = new Date();
        lastReadingRepository.Update(data,err => {
            if(err)
                return callback(err);
            return callback(null);
        });
    }
}
module.exports = new LastReadingController();