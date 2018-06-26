const db = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

class AdRepository {
  Create(model, callback) {
    db.ad
      .findOrCreate({
        where: {
          name: model.name,
          isActive: true
        },
        defaults: {
          name: model.name,
          amount: model.amount,
          userId: model.userId,
          donations: 0,
          isActive: true
        }
      })
      .spread((ad, created) => {
        if (created) return callback(null, ad);
        else return callback({ name: "Error", message: "Name exists!" });
      });
  }
  FindByUserId(id, callback) {
    db.ad
      .findOne({ where: { userId: id, isActive: true } })
      .then(fromResolve => {
        return callback(null, fromResolve);
      })
      .catch(err => {
        console.log(err);
        return callback(err);
      });
  }
  FindByName(model, callback) {
    db.ad
      .findOne({
        where: {
          name: model.search,
          userId: {
            [Op.ne]: model.userId
          },
          isActive: true
        },
        include: [
          {
            model: db.user,
            as: 'adOwner',
            attributes: ["username"]
          }
        ]
      })
      .then(fromResolve => {
        return callback(null, fromResolve);
      })
      .catch(err => {
        console.log(err);
        return callback(err);
      });
  }
  Donate(model,callback) {
    const value = model.donations;
    db.ad
      .update(
        {
          donations: sequelize.literal(`donations+${value}`)
        },
        {
          where: {
            id: model.id
          }
        }
      )
      .then(() => {
        return callback(null,null);
      })
      .catch(err => {
        return callback(err);
      });
  }
  Delete(model,callback) {
    db.ad
      .update(
        {
          isActive: false
        },
        {
          where: {
            id: model
          }
        }
      )
      .then(() => {
        return callback(null,null);
      })
      .catch(err => {
        console.log(err);
        return callback(err);
      });
  }
}
module.exports = new AdRepository();
