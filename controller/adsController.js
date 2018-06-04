const adRepository = require("../repository/adRepository");
const userRepository = require("../repository/userRepository");
const async = require("async");

class AdController {
  Create(data, callback) {
    adRepository.Create(data, (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  }
  GetUsersAd(data, callback) {
    adRepository.FindByUserId(data, (err, result) => {
      if (err) return callback(err);
      else return callback(null, result);
    });
  }
  FindAllByName(data, callback) {
    adRepository.FindAllByName(data, (err, result) => {
      if (err) return callback(err);
      return callback(null, result);
    });
  }
  DonateToAd(ad, user) {
    adRepository.Donate(ad);
    userRepository.Update(user);
  }
  Collect(user, callback) {
    async.waterfall(
      [
        callback => {
          adRepository.FindByUserId(user.id, (err, ad) => {
            if (err) return callback(err);
            return callback(null, ad);
          });
        },
        (ad, callback) => {
          adRepository.Delete(ad.id);
          return callback(null, ad);
        },
        ad => {
          userRepository.Update(
            {
              balance: parseInt(user.balance) - parseInt(ad.donations),
              id: user.id
            },
            {
              where: {
                id: user
              }
            }
          );
          return callback(null);
        }
      ],
      err => {
        if (err) {
          console.log(err);
          return callback(err);
        }
        return callback(null);
      }
    );
  }
}
module.exports = new AdController();
