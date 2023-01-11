const User = require("../models/user")
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs")


exports.signup_get = (req, res, next) => {
    res.render("sign-up", { title: "Members Only" })
}

exports.signup_post = [
    check("username", "Invalid username").trim().escape().isLength({ min: 1 }),
    check('password', 'Invalid password').exists().isLength({ min: 2 }),
    check(
        'passwordConfirmation',
        'passwordConfirmation field must have the same value as the password field',
    )
        .exists()
        .custom((value, { req }) => value === req.body.password),
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.render("sign-up", {
                title: "Members Only",
                errors: errors.array()
            })
            return
        }

        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) {
                return next(err)
            }

            const user = new User({
                username: req.body.username,
                password: hashedPassword
            })

            user.save(err => {
                if (err) {
                    return next(err)
                }

                res.redirect("/")
            })
        })
    }
]