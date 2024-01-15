const db = require("../database/db");
const httpstatus = require("../util/httpstatus");
const mime = require('mime-types');

const extension = mime.extension('application/pdf');
// console.log(extension);

const getMsgSenderReceiver = async (req, res) => {
  const { senderid, receiverid } = req.body;

  try {
    const messages = await db("message")
      .select("*")
      .where({
        sender_id: senderid,
        receiver_id: receiverid,
      })
      .orderBy("id", "desc");
    var json = httpstatus.successRespone({
      message: "Two User indidual messages",
      conversation: messages,
    });
    return res.send(json);
  } catch (error) {
    return res.send(httpstatus.errorRespone({ message: error.message }));
  }
};

const storeMessage = async (req, res) => {

  console.log(req.file);
  const {
    message,
    chatmaster_id,
    incoming,
    outgoing,
    type,
    senderid,
    receiverid,
    time,
    image,
  } = req.body;

  try {
    const msg_sender = await db.raw(
      `SELECT sender_income FROM chatmaster WHERE sender_id=${senderid}`
    );

    const data = msg_sender[0];

    if (data && data.length > 0) {
      var income = "true";
      var outcome = "false";
    } else {
      var income = "false";
      var outcome = "true";
    }

    var docsimg = req.file ? "img" : "";

    if(req.file){
      const filenamedocs = req.file.filename;
      // Check if the filename indicates an image
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
      const isImage = imageExtensions.some(ext => filenamedocs.toLowerCase().endsWith(`.${ext}`));
      
      // Check if the filenamedocs indicates a document
      const documentExtensions = ['pdf', 'doc', 'docx', 'txt'];
      const isDocument = documentExtensions.some(ext => filenamedocs.toLowerCase().endsWith(`.${ext}`));
      
      // Check if the filenamedocs indicates an audio file
  const audioExtensions = ['mp3', 'wav', 'ogg', 'aac'];
  const isAudio = audioExtensions.some(ext => filenamedocs.toLowerCase().endsWith(`.${ext}`));

  const videoExtensions = ['mp4', 'avi', 'mkv', 'mov'];
const isVideo = videoExtensions.some(ext => filenamedocs.toLowerCase().endsWith(`.${ext}`));
      if (isImage) {
       var docsimg = 'img';
      } else if (isDocument) {
        // It's a document
        var docsimg = 'doc';
      } 
      else if (isAudio) {
        // It's an audio file
        var docsimg = 'audio';
      }
      else if (isVideo) {
        docsimg = 'video';
      }
      else {
        // It's neither an image nor a document
        var docsimg = '';
      }
    }
   
    
    const chatmessage = {
      sender_id: senderid,
      receiver_id: receiverid,
      type: type,
      message: message,
      time: time,
      incoming: income,
      outgoing: outcome,
      subtype: docsimg,
      chatmaster_id: chatmaster_id,
      img: req.file ? req.file.filename : '',
    };


 

    const results = await db("message")
      .select("id", "type", "message", "chatmaster_id", "subtype", "img")
      .select(db.raw("incoming as incoming_boolean"))
      .select(db.raw("outgoing as outgoing_boolean"))
      .where("chatmaster_id", chatmaster_id);

    // Transform the results to convert string values to boolean
    const messages = results.map((message) => ({
      id: message.id,
      type: message.type,
      subtype: message.subtype,
      img: message.img,
      message: message.message,
      chatmaster_id: message.chatmaster_id,
      incoming: message.incoming_boolean === "true" ? 1 : 0, // Convert to boolean
      outgoing: message.outgoing_boolean === "true" ? 1 : 0, // Convert to boolean
    }));

    db("message")
      .insert(chatmessage)
      .then((data) => {
        console.log("chat inserted successfully");
        var json = httpstatus.successRespone({
          message: "chat inserted successfully",
          chatMessage: chatmessage,
          sendAfterConversation: messages,
        });
        return res.send(json);
      })

      .catch((err) => {
        res.send(httpstatus.errorRespone({ message: err.message }));
      });
  } catch (err) {
    res.send(httpstatus.errorRespone({ message: err.message }));
  }
};

const getchatMaster_id = async (req, res) => {
  try {
    const { user_id, receiver_id } = req.body;

    try {
      // const results = await db('chatmaster').select('chatmaster_id').where({ sender_id: user_id,receiver_id:receiver_id });
      const results = await db("chatmaster")
        .select("chatmaster_id")
        .where(function () {
          this.where({ sender_id: user_id, receiver_id: receiver_id }).orWhere({
            sender_id: receiver_id,
            receiver_id: user_id,
          });
        });
      //console.log(results);
      var json = httpstatus.successRespone({
        message: "get chat master id",
        chatmaster_id: results,
      });
      return res.send(json);
    } catch (err) {
      res.send(httpstatus.errorRespone({ message: err.message }));
    }
  } catch (err) {
    res.send(httpstatus.errorRespone({ message: err.message }));
  }
};

const joinChatMaster = async (req, res) => {
  try {
    const { user_id, receiver_id } = req.body;

    try {
      // const results = await db('chatmaster').select('chatmaster_id').where({ sender_id: user_id, receiver_id: receiver_id });

      const results = await db("chatmaster")
        .select("chatmaster_id")
        .where(function () {
          this.where({ sender_id: user_id, receiver_id: receiver_id }).orWhere({
            sender_id: receiver_id,
            receiver_id: user_id,
          });
        });
      // Check the length of the results array
      const resultsLength = results.length;

      if (resultsLength === 0) {
        // No records found
        var json = httpstatus.successRespone({
          message: "No chat master id found for the given criteria",
          chatmaster_id: 0,
          userid: user_id,
          r_id: receiver_id,
        });
        return res.send(json);
      } else {
        // Records found
        var json = httpstatus.successRespone({
          message: "Chat master id found",
          chatmaster_id: 1,
          userid: user_id,
          r_id: receiver_id,
        });
        return res.send(json);
      }
    } catch (err) {
      // Error in query execution
      res.send(httpstatus.errorRespone({ message: err.message }));
    }
  } catch (err) {
    // Error in request body parsing
    res.send(httpstatus.errorRespone({ message: err.message }));
  }
};

module.exports = {
  getMsgSenderReceiver,
  storeMessage,
  getchatMaster_id,
  joinChatMaster,
};
