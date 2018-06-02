const db = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

class AdRepository {
    Create(model,callback) {
        db.ad.findOrCreate({where:{
            name:model.name},
            defaults:{
                name:model.name,
                amount:model.amount,
                userId:model.userId ,
                donations: 0
            }}
        ).spread((ad,created) => {
            if(created)
                return callback(null,ad);
            else
                return callback({'name':'Error','message': 'Name exists!'});
        });
    }
    FindByUserId(id,callback) {
        db.ad.findOne({where: {userId: id}})
        .then((fromResolve) => {
            return callback(null,fromResolve);
        })
        .catch(err => {
            return callback(err);
        });
    }
    FindAllByName(model,callback) {
        db.ad.findAll(
            {
                where: 
                {
                    name: model.search, 
                    userId: {
                        [Op.ne]: model.userId
                    }       
                },
                include: [
                    {
                        model: db.user,
                        attributes: ['username']
                    }
                ]
            }
        )
        .then(fromResolve => {
            return callback(null,fromResolve);
        })
        .catch(err => {
            return callback(err);
        });
    }
    Donate(model) {
        const value = model.donations;
        db.ad.update(
            {
                donations: sequelize.literal('donations+'+value)
            },
            {
                where: {
                    id: model.id
                }
            }
        )
        .then(() => {
            return;
        })
        .catch(err => {
            console.log(err);
            return;
        });
    }
}
module.exports = new AdRepository();