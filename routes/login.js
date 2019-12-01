import ifAuthentified from "../middlewares/authentified";
import {createUser, findUserByName} from "../database/repositories/userRepository";

var express = require('express');
var router = express.Router();

router.get('/',ifAuthentified, function(req, res, next) {
    res.render('login');
});

router.post('/',ifAuthentified, function (req, res, next) {
    console.log("dkhlat");
    console.log(req.body.name);
    const userName = req.body.name;
    findUserByName(userName)
        .then(user => {
            if (user) {
                req.session.user = user;
                res.redirect('/');
            }
            else
                createUser(userName)
                    .then(user => {
                        req.session.user = user;
                        res.redirect('/');
                    })
                    .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
});

module.exports = router;
