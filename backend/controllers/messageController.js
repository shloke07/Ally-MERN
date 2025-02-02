const protect = require("../middleware/protect");
const Message = require("../models/messageModel");

const messageController = async (req,res) => {
    const {userId} = req.params;
    const userData = await protect(req);
    

    const ourUserId = userData._id;
    

    const messages = await Message.find({
        sender:{ $in: [userId, ourUserId]},
        recipient:{ $in: [userId, ourUserId]},
    }).sort({createdAt: 1 })

    res.json(messages);
    
    
}

module.exports = messageController;