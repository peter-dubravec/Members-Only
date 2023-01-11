const { check, validationResult } = require("express-validator");
const User = require("../models/user")
const bcrypt = require("bcryptjs")

exports.join_club_get = (req, res, next) => {
    return res.render("join-club")
}

exports.join_club_post = [
    check("password").exists(),
    (req, res, next) => {
        if (!validationResult(req).isEmpty) {
            res.send("password error")
            return
        }

        if (bcrypt.compareSync(req.body.password, process.env.MEMBER_SECRET)) {
            User.findByIdAndUpdate(req.user._id, { isMember: true }, (err) => {
                if (err) {
                    return next(err)
                }
                return res.redirect("/")
            })
        } else {
            res.render("join-club", {
                error: "Incorrect secret"
            })
        }
    }
]