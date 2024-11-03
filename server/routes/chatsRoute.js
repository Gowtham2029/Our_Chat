 const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
 const chat = require('../models/chatModel')


 //create chat
    router.post('/create-new-chat', authMiddleware, async (req, res) => {
        try {
            const newChat = new chat(req.body)
            const savedChat = await newChat.save()
            return res.send({
                message: "Chat created successfully",
                success: true,
                data: savedChat
            })
        } catch (err) {
            return res.send({
                message: "error in the message " + err.message,
                success: false
            })
        }
    })

// get all chats of current user
router.get('/get-all-chats', authMiddleware, async (req, res) => {
    try {
        const chats = await chat.find({ members:{ $in: [req.body.userId]} }).populate("members").sort({ updatedAt: -1 })
        return res.send({
            message: "chats fetched successfully",
            success: true,
            data: chats
        })
    } catch (err) {
        return res.send({
            message: err.message,
            success: false
        })
    }
})

module.exports = router;