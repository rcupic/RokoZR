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
        console.log(model);
        db.creditCard.findOne({
            where: {
                id: model.cardNo,
                userId: model.userId,
                pin: model.pin
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