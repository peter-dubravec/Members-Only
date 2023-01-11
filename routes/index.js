
module.exports = (passport) => {
    var express = require('express');
    var router = express.Router();

    const indexPageController = require("../controllers/indexPageController")
    const signupController = require("../controllers/signupController")
    const joinClubController = require("../controllers/joinClubController")
    const messageController = require("../controllers/messageController")
    const adminController = require("../controllers/adminController")

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/')
    }

    /* GET home page. */
    router.get('/', indexPageController.index_page_get);

    router.get('/sign-up', signupController.signup_get);

    router.post('/sign-up', signupController.signup_post);

    router.get("/join-club", ensureAuthenticated, joinClubController.join_club_get)

    router.post("/join-club", ensureAuthenticated, joinClubController.join_club_post)

    router.get("/create-message", ensureAuthenticated, messageController.create_message_get)

    router.post("/create-message", ensureAuthenticated, messageController.create_message_post)

    router.post("/delete-message", ensureAuthenticated, messageController.delete_message_post)

    router.get("/become-admin", ensureAuthenticated, adminController.become_admin_get)

    router.post("/become-admin", ensureAuthenticated, adminController.become_admin_post)
    // authentificate

    router.post('/', passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/",
        failureMessage: true
    }));

    // logout
    router.get("/log-out", ensureAuthenticated, (req, res, next) => {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect("/");
        });
    });

    return router

}
