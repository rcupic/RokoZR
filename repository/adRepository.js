const db = require('../models');

class AdRepository {
    Create(model,callback) {
        db.ad.findOrCreate({where:{
            name:model.name},
            defaults:{
                name:model.name,
                amount:model.amount,
                userId:model.userId 
            }}
        ).spread((ad,created) => {
            if(created)
                return callback(null,ad);
            else
                return callback({'name':'Error','message': 'Name exists!'});
        });
    }
}
module.exports = new AdRepository();