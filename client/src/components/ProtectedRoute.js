import React, { useEffect, useState } from 'react'
import { AllUsers, GetCurrentUser } from '../apicalls/users';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllUsers, setUser, setAllChats} from '../Redux/userSlice';
import Home from '../pages/Home';
import { GetAllChats } from '../apicalls/chats';

const ProtectedRoute = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(Store => Store.user); 
    const navigate = useNavigate();
   

    const getCurrentUser = async () => {
      try
      {
        const response = await GetCurrentUser();
        const AllUsersResponse = await AllUsers();
        const allChatsResponse = await GetAllChats();
       if(response.success){
           dispatch(setUser(response.data))
           dispatch(setAllUsers(AllUsersResponse.data))
           dispatch(setAllChats(allChatsResponse.data))
           navigate("/home")
       }else{
           navigate("/")
           
       }
       }catch(error){
           navigate("/")
          
       }
   }

    useEffect(() => {
      if(localStorage.getItem("token")){
        getCurrentUser();
      }
        else{
            navigate("/")
        }
    }, [navigate]);
  
  return (user === null)?<div>Loading...</div>:(
    <div className='h-screen w-screen text-gray-200'>
      <div className='flex justify-between p-5'>
        <div className='flex items-center gap-1'>
        <i className="ri-wechat-2-line text-4xl"></i>
          <h1 className="text-3xl font-bold">OURCHAT</h1>
        </div>
        <div className='p-6 flex items-center text-1xl gap-1'>
        <i className="ri-user-3-line text-1xl"></i>
          <h1 className='text-1xl'>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</h1>
          <i className="ri-logout-circle-r-line ml-4 text-2xl hover:cursor-pointer"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          ></i>
        </div>

      </div> 
      <div className="p-5">
        <Home />
      </div>
    </div>
  )
}

export default ProtectedRoute