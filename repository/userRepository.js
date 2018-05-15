const db = require('../models');
class UserRepository {
    Login(model,callback) {
        db.user.findOne({where: 
            {username: model.username},
            defaults: 
            {username: model.username,
            password: model.password}})
        .then(user => {
            return callback(null,user);
        }).catch(err => {
            return callback(err);
        });
    }
    Register(model,callback) {
        db.user.findOrCreate({where: {username: model.username},defaults:{
            username: model.username,
            password: model.password
        }})
        .spread((user,created) => {
            if(created) {
                return callback(null,user);
            }
            return callback({'title':'Error','message':'Already exists(username)'});
        }).catch(err => {
            return callback(err);
        });
    }
    FindById(id,callback) {
        db.user.findOne({
            where: {
                id: id
            }
        })
        .then(fromResolve => {
            return callback(null,fromResolve);
        })
        .catch(err => {
            return callback(err);
        });
    }
}
module.exports = new UserRepository();