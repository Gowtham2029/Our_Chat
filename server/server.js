const express = require('express');
const app = express();

const dbConfig = require('./config/dbConfig')

const usersRoute = require('./routes/usersRoute')
const chatRoute = require('./routes/chatsRoute');
const messagesRoute = require('./routes/messagesRoute');

app.use(express.json());

const server = require('http').createServer(app);

const io  = require('socket.io')(server, {
   cors: {
      origin: "https://localhost:3000",
      methods: ["GET", "POST"]
   },

});

io.on('connection', (socket) => {
   socket.on("joinRoom", (userId) => {
      
      socket.join(userId);
   })

  // send msg to client (who are in the same room)
  socket.on("sendMessage", (message) => {
   console.log("message is: ", message)
   io.to(message.members[0]).to(message.members[1]).emit("receiveMessage", message);
  })
})



app.use('/api/users', usersRoute);
app.use('/api/chat', chatRoute);
app.use('/api/messages', messagesRoute);

const port = process.env.PORT || 5000;


server.listen(port, () => {
   console.log('listening on port ' + port);
})

dbConfig();