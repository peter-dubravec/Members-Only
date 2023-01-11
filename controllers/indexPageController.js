const Message = require("../models/message")



exports.index_page_get = (req, res, next) => {
    const errors = Array.from(new Set(req.session.messages))

    Message.find({}).sort({ timestamp: -1 }).limit(3).populate("createdBy").exec((err, messages) => {
        if (err) {
            return next(err)
        }
        res.render("index", {
            title: "Members only",
            messages: messages.reverse(),
            errors: Array.from(errors)
        })
    })

}