const adsRouter = require('express').Router();
const adsController = require('../controller/adsController');

adsRouter.post('/',(req,res) => {
    adsController.Create(req.body,(err) => {
        if(err)
            res.redirect('newAd');
        else
            res.render('myAd');
    });
});
adsRouter.get('/',(req,res) => {
    adsController.GetUsersAd(req.session.user.id,(err,result) => {
        if(err)
            res.render('secure',{name:req.session.user.username});
        else if(result == 0) 
            res.render('newAd');
        else
            res.render('myAd',{name:result.dataValues.name,value:result.dataValues.amount});    
    });
});
module.exports = adsRouter;