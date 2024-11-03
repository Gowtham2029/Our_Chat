import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetMessages, sendMessage } from '../apicalls/messages';
import { hideLoader, showLoader } from '../Redux/loaderSlice';
import Store from '../utils/Store';

const ChatArea = ({socket}) => {
    const { selectedChat, user } = useSelector((store) => store.user)
    const [newMessage, setNewMessage] = useState("");
    const dispatch = useDispatch()

    const [time] = useState(new Date());

    const [messages, setMessages] = useState([]);

    const receipentUser = selectedChat.members.find(
        (mem) => mem._id !== user._id
    ) 

    // console.log(receipentUser)
    // console.log(selectedChat)

    const sendNewMessage = async () => {
      try{
        // dispatch(showLoader());
         const message = {
          chat: selectedChat._id,
          sender: user._id,
          text: newMessage
         }
        // send msg to server using socket
         socket.emit("sendMessage", {
          ...message,
          members: selectedChat.members.map((mem) => {return mem._id}),
          createdAt: newMessage.createdAt,
          read: false
         })

        // send msg to server to save in db
         const response = await sendMessage(message);
        //  dispatch(hideLoader());
         if(response.success){
          setNewMessage("");
         }

      }catch(error){
        // dispatch(hideLoader());
        alert("Error: " + error.message);

      }

    }
    const getMessages = async () => {
      try {
        dispatch(showLoader());
        const res = await GetMessages(selectedChat._id);
        dispatch(hideLoader());
        if(res.success){
          setMessages(res.data);
        }
        
      } catch (error) {
        dispatch(hideLoader());
        alert("Error: " + error.message)
        
      }
    }
    useEffect(()=>{
      getMessages();

     // receive msg from server using socket
     socket.off("receiveMessage").on("receiveMessage", (message) => { 
      const tempSelectedChat = Store.getState().user.selectedChat;
      if(tempSelectedChat._id === message.chat){
        setMessages((prev) => ([...prev, message]));
      }
      // setMessages((prev) => [...prev, message])
     })

    }, [selectedChat])

    useEffect(() => {
      const messagesDiv = document.getElementById("messages");
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, [messages])

  return (
    <div className='bg-slate-600 h-[77vh] p-5 rounded-md flex flex-col justify-between'> 
     {/* receipent user name */}
      <div>
        <div className="flex gap-5 items-center mb-2">
                  {receipentUser.ProfilePic && (
                    <img
                      src={receipentUser.ProfilePic}
                      alt="profile pic"
                      className="w-10 h-10 rounded-full"
                    />
                  )}

                  {!receipentUser.profilePic && (
                    <div className="bg-slate-700 rounded-full h-10 w-10 flex items-center justify-center">
                      <h1 className="text-2xl font-semibold">
                        {receipentUser && receipentUser.name[0].toUpperCase()}
                      </h1>
                    </div>
                  )}
                  <h1>
                    {receipentUser.name[0].toUpperCase() + receipentUser.name.slice(1)}
                  </h1>
        </div>
        <hr/>
      </div>
      

     {/* chat messages */}
      <div>
           <div id="messages" className='h-[55vh] p-5 overflow-y-scroll flex flex-col gap-3'>
            {
            messages.map(message => {
              
              const isCurrentUserSender = message.sender === user._id;
               return (<div key={message._id} className={`flex ${isCurrentUserSender && 'justify-end'}`}>
                <div className="flex flex-col">
                  <h1 className={`p-2 rounded-xl ${isCurrentUserSender ? 'bg-slate-700 rounded-bl-none': 'bg-slate-500 rounded-tr-none'}`}>
                    {message.text}
                  </h1>
                 <h3 className={`${isCurrentUserSender ? 'flex flex-row-reverse' : ''}`}>
                    {time.getHours()%12 + ":" + time.getMinutes()}
                    {(time.getHours() >= 12) ? " PM" : " AM"}
                  </h3>
                </div>
              </div>
              )
            })
           }
           </div>
      </div>

     {/* chat input */}
      <div>
           <div className='h-15 flex '>
            <input type="text" placeholder='Type a message' className='w-[85%] h-12 rounded-lg mr-2  text-black' 
             value = {newMessage}
             onChange = {(e) => setNewMessage(e.target.value)}
            />
            <button className='w-[10%] bg-slate-800 text-white text-xl rounded-md h-12' 
            onClick={sendNewMessage}
            >Send</button>
           </div>
      </div>
    </div>
  )
}

export default ChatArea