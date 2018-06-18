const db = require("../models");
class creditCardRepository {
    Create(model) {
        db.creditCard.create(model)
        .then(() => {
            return;
        })
        .catch(err => {
            console.log(err);
            return;
        });
    }
    FindByUserAndId(model,callback) {
        db.creditCard.findOne({
            where: {
                id: model.cardNo,
                userId: model.userId
            }
        })
        .then(card => {
            return callback(null,card);
        })
        .catch(err => {
            console.log(err);
            return callback(err);
        });
    }
}
module.exports = new creditCardRepository();