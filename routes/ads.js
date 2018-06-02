const adsRouter = require('express').Router();
const adsController = require('../controller/adsController');

adsRouter.post('/',(req,res) => {
    req.body.userId = req.session.user.id;
    adsController.Create(req.body,(err) => {
        if(err) 
            res.redirect('ads/newAd');
        else
            res.render('myAd',{name: req.body.name,value: req.body.amount});
    });
});
adsRouter.get('/myAd',(req,res) => {
    if(req.session.user) {
        adsController.GetUsersAd(req.session.user.id,(err,result) => {
            if(err)
                res.render('secure',{name:req.session.user.username,account:req.session.user.account});
            else if(result === null) 
                res.render('newAd');
            else
                res.render('myAd',{name:req.session.user.username,account:req.session.user.account,adName:result.dataValues.name,donations:result.dataValues.donations});    
        });
    }else
        res.redirect('/');
});
adsRouter.get('/newAd',(req,res) => {
    if(req.session.user) {
        adsController.GetUsersAd(req.session.user.id,(err,result) => {
            if(err)
                res.render('secure',{name:req.session.user.username,account:req.session.user.account});
            else if(result !== null) 
                res.render('myAd',{name:result.dataValues.name,value:result.dataValues.amount});
            else
                res.render('newAd');    
        });
    }
    res.redirect('/ads/myAd');
});
adsRouter.get('/',(req,res) => {
    adsController.FindAllByName({search:req.query.search,userId:req.session.user.id},(err,result) => {
        if(err)
            res.send(null);
        res.send(result);
    });
});
module.exports = adsRouter;