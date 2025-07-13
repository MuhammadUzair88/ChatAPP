import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { getReceiverSocketId, io } from "../SocketIO/server.js";

const SendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.userId;

    if (!message) {
      return res.status(400).json({ message: "Message content is required" });
    }

    // Check if conversation exists
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, recieverId] },
    });

    // If not, create it
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, recieverId],
      });
    }

    // Create message
    const newMessage = new Message({
      senderId,
      recieverId,
      message,
    });

    // Save message and add to conversation
    await newMessage.save();
    conversation.messages.push(newMessage._id);
    await conversation.save();

    const receiverSocketId=getReceiverSocketId(recieverId)

    if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage)
    }
    return res.status(201).json({ message: "Message sent", newMessage });
  } catch (error) {
    console.error("Error in SendMessage:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const getmessages=async(req,res)=>{

try{
        const {id:receiverId}=req.params;
    const senderId=req.userId;

    const findConversation=await Conversation.findOne({
        members:{$all:[senderId, receiverId]}
    }).populate("messages")
    if(!findConversation){
        return res.status(400).json({ message: "No Chat Started Yet" });
    }

    return res.status(201).json({ message: "Messages Fetched ", conversation:findConversation });
}
catch(error){
   console.error("Error in SendMessage:", error);
    return res.status(500).json({ message: "Internal Server Error" });
}

}

export {SendMessage,getmessages};
