const { body, validationResult } = require("express-validator");
const Message = require("../models/message")

exports.create_message_get = (req, res) => {
    res.render("create-message", {
        title: "Create message",

    })
}

exports.create_message_post = [
    body("title", "Invalid title").trim().escape().isLength({ min: 1 }),
    body("text", "Invalid text").trim().escape().isLength({ min: 1 }),
    (req, res, next) => {
        const errors = validationResult(req)
        const message = new Message({
            title: req.body.title,
            text: req.body.text,
            createdBy: req.user._id
        })

        if (!errors.isEmpty()) {
            res.render("create-message", {
                title: "Create Message",
                errors: errors.array(),
                message
            })
        }

        message.save(err => {
            if (err) {
                return next(err)
            }

            res.redirect("/")
        })


    }
]

exports.delete_message_post = (req, res, next) => {
    Message.findByIdAndDelete(req.body.messageid, (err) => {
        if (err) {
            return next(err)
        }

        res.redirect("/")
    })
}