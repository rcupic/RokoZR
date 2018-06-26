const db = require('../models');
class LastReadingRepository {
    Create(model,callback) {
        db.lastReading.create(model)
        .then(function() {
            return callback(null);
        })
        .catch(err => {
            return callback(err);
        });
    }
    Update(model,callback) {
        db.lastReading.update(model,
        {where : {
            userId: model.userId
        }})
        .then(function() {
            return callback(null);
        })
        .catch(err => {
            return callback(err);
        });
    }
}
module.exports = new LastReadingRepository();