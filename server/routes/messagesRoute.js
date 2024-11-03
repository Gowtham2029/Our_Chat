const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Chat = require('../models/chatModel')
const Message = require('../models/messageModel')

// new message ikkada nundi call chey

router.post('/new-message', async (req, res) => {
  try {

    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    // update last message of chat
    await Chat.findOneAndUpdate({ _id: req.body.chat}, {
        lastMessage : savedMessage._id,
        unread: {
            $inc: 1,
        }
    })

    res.send({
        success: true,
        message: "Message sent successfully",
        data: savedMessage
    })
  } catch (error) {
    res.status(500).json(error.message);
  }
});


// get all the messages

router.get("/get-all-messages/:chatId", async (req, res) => {
    try{
        const messages = await Message.find({ chat: req.params.chatId }).sort({ createdAt: 1 })
        res.send({
            success: true,
            message: "Messages fetched successfully",
            data: messages
        })

    }
    catch(error){
        res.send({
            success: false,
            message: error.message
        })
    }
});

module.exports = router;