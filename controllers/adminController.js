const User = require("../models/user")
const bcrypt = require("bcryptjs")

exports.become_admin_get = (req, res, next) => {
    res.render("become-admin", {
        title: "Become Admin"
    })
}

exports.become_admin_post = async (req, res, next) => {
    const validPassword = await bcrypt.compare(req.body.password, process.env.ADMIN_SECRET)

    if (!validPassword) {
        res.render("become-admin", {
            title: "Become Admin",
            error: "Invalid passphrase"
        })
        return
    }

    User.findByIdAndUpdate(req.user._id, { isAdmin: true }, (err => {
        if (err) {
            return next(err)
        }

        res.redirect("/")
    }))

}