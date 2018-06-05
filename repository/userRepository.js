const db = require("../models");
class UserRepository {
  Login(model, callback) {
    db.user
      .findOne({
        where: { username: model.username }
      })
      .then(user => {
        return callback(null, user);
      })
      .catch(err => {
        return callback(err);
      });
  }
  Register(model, callback) {
    db.user
      .findOrCreate({
        where: { username: model.username },
        defaults: {
          username: model.username,
          password: model.password,
          account: 2000,
          balance: 0
        }
      })
      .spread((user, created) => {
        if (created) {
          return callback(null, user);
        }
        return callback({
          title: "Error",
          message: "Already exists(username)"
        });
      })
      .catch(err => {
        return callback(err);
      });
  }
  FindById(id, callback) {
    db.user
      .findOne({
        where: {
          id: id
        }
      })
      .then(user => {
        return callback(null, user);
      })
      .catch(err => {
        console.log(err);
        return callback(err);
      });
  }
  Update(model) {
    db.user
      .update(model, {
        where: {
          id: model.id
        }
      })
      .then(() => {
        return;
      })
      .catch(err => {
        console.log(err);
        return;
      });
  }
  FindByName(model,callback) {
    console.log(model);
    db.user
      .findOne({
        where: {
            username: model.search,
        }
      })
      .then(user => {
        return callback(null,user);
      })
      .catch(err => {
        console.log(err);
        return callback(err);
      })
  }
}
module.exports = new UserRepository();
