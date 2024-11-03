import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewChat } from "../apicalls/chats";
import { setAllChats, setSelectedChat } from "../Redux/userSlice";
import { hideLoader, showLoader } from "../Redux/loaderSlice";
import ChatArea from "./ChatArea";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000")

const Home = () => {
  
  const { allUser, allChats, user, selectedChat } = useSelector(
    (Store) => Store.user
  );
  // const [filterUsers, setFilterUsers] = useState(AllUser);
  useEffect(() => {

    if(user){
      socket.emit("joinRoom", user._id);

    
    }

    
  }, [user]);

  const [input, setInput] = useState(undefined);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    value === "" ? setInput("") : setInput(value);
  };

  const createChat = async (receipentUserId) => {
    try {
      dispatch(showLoader());
      const response = await createNewChat([user._id, receipentUserId]);
      
      dispatch(hideLoader());
      if (response.success) {
        const newChat = response.data;
        const updatedChats = [...allChats, newChat];
        dispatch(setAllChats(updatedChats));
        dispatch(setSelectedChat(newChat));
      } else {
        console.log("Error creating new chat");
      }
    } catch (err) {
      dispatch(hideLoader());
      console.log(err.message);
    }
  };

  const openChat = (userId) => {
    const chat = allChats.find((chat) => {
      return (
        chat.members.map((mem) => mem._id).includes(user._id) &&
        chat.members.map((mem) => mem._id).includes(userId)
      );
    });
    if (chat) {
      dispatch(setSelectedChat(chat));
    }
  };

  const getData = () => {
    return allUser.filter((userFil) => {
      return (
        userFil?.name?.toLowerCase()?.includes(input?.toLowerCase()) ||
        allChats.some((ch) =>
          ch.members.map((mem) => mem._id).includes(userFil._id)
        )
      );
    });
  };

  const getIsSelectedChatorNot = (userItem) => {
    if (selectedChat) {
      return selectedChat.members.map((mem) => mem._id).includes(userItem._id);
    }
    return false;
  };

  return (
    <div className="flex">
      <div className="w-96">
        <div className="flex items-center">
          <i className="ri-search-line rounded-tl-md rounded-bl-md bg-slate-600 text-2xl py-2 px-3"></i>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            className="text-white bg-slate-600 rounded-tr-md rounded-br-md w-full p-6"
            placeholder="Search..."
          />
        </div>
        <div className="flex flex-col gap-3 mt-7 max-h-[30rem] overflow-y-scroll p-2">
          {getData().map((userItem) => {
            return (
              <div
                className={` bg-slate-600 rounded-md p-3 text-white text-lg flex justify-between cursor-pointer ${
                  getIsSelectedChatorNot(userItem) &&
                  "border border-white border-1"
                }`}
                key={userItem._id}
                onClick={() => openChat(userItem._id)}
              >
                <div className="flex gap-5 items-center">
                  {userItem.ProfilePic && (
                    <img
                      src={userItem.ProfilePic}
                      alt="profile pic"
                      className="w-10 h-10 rounded-full"
                    />
                  )}

                  {!userItem.profilePic && (
                    <div className="bg-slate-700 rounded-full h-10 w-10 flex items-center justify-center">
                      <h1 className="text-2xl font-semibold">
                        {userItem.name[0].toUpperCase()}
                      </h1>
                    </div>
                  )}
                  <h1>
                    {userItem.name[0].toUpperCase() + userItem.name.slice(1)}
                  </h1>
                </div>

                <div onClick={() => createChat(userItem._id)}>
                  {!allChats.find((chat) =>
                    chat.members.map((mem) => mem._id).includes(userItem._id)
                  ) && (
                    <button className="bg-slate-500 text-white px-3 py-1 rounded-md">
                      Create Chat
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-4/5 ml-5 mr-4">
        <div className="">{selectedChat && <ChatArea socket={socket} />}</div>
      </div>
    </div>
  );
};

export default Home;
