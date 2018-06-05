const db = require("../models");
class MessagesRepository {
    Create(model,callback) {
        db.message.create(model)
        .then(message => {
            return callback(null,message);
        })
        .catch(err => {
            return callback(err);
        });
    }
    FindBySentTo(model,callback) {
        db.message.findAll({
            where: {
                sentTo: model
            },
            include: {
                model: db.user,
                as: 'creator',
                attributed: ['username']
            }
        })
        .then(messages => {
            return callback(null,messages);
        })
        .catch(err => {
            console.log(err);
            return callback(err);
        });
    }
}
module.exports = new MessagesRepository();