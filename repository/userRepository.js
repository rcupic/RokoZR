const db = require('../models');
class UserRepository {
    Login(model,callback) {
        db.user.findOne({where: {username: model.username, password: model.password}})
        .then(user => {
            return callback(null,user);
        }).catch(err => {
            console.log(err);
            return callback(err);
        });
    }
}
module.exports = new UserRepository();