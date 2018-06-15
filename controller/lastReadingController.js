const lastReadingRepository = require('../repository/lastReadingRepository');
class LastReadingController {
    Create(data) {
        data.time = new Date();
        lastReadingRepository.Create(data);
    }
    Update(data) {
        data.time = new Date();
        lastReadingRepository.Update(data);
    }
}
module.exports = new LastReadingController();