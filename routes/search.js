const SearchRouter = require('express').Router();
const AdsController = require('../controller/adsController');

SearchRouter.get('/',(req,res) => {
    if(req.session.user)
        res.render('search',{name:req.session.user.username,account:req.session.user.account});
    else
        res.redirect('/');
});
SearchRouter.post('/',(req,res) => {
    if(req.session.user) {
        if(req.session.user.account < req.body.donations)
            res.redirect('/');
        AdsController.DonateToAd(
            {
                id: req.query.id,
                donations:req.body.donations
            },
            {
                id:req.session.user.id,
                account:req.session.user.account-req.body.donations
            }
        );
        req.session.user.account -= req.body.donations;
        res.render('search',{name:req.session.user.username,account:req.session.user.account});
    }else 
        res.redirect('/');
});
module.exports = SearchRouter;