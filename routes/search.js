const SearchRouter = require('express').Router();
const AdsController = require('../controller/adsController');

SearchRouter.get('/',(req,res) => {
    if(req.session.user)
        res.render('search',{name:req.session.user.username});
    else
        res.redirect('/');
});
SearchRouter.post('/',(req,res) => {
    if(req.session.user) {
        AdsController.DonateToAd({id: req.query.id,donations:req.body.donations})
        res.render('search');
    }else 
        res.redirect('/');
});
module.exports = SearchRouter;