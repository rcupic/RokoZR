const db = require('../models');
class LastReadingRepository {
    Create(model) {
        db.lastReading.create(model);
    }
    Update(model) {
        db.lastReading.update(model,
        {where : {
            userId: model.userId
        }});
    }
}
module.exports = new LastReadingRepository();