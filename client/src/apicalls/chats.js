import { axiosInstance } from "./axiosInstance"

export const GetAllChats = async () => {
    try{
        const response = await axiosInstance.get('/api/chat/get-all-chats');
        return response.data;

    }catch(error){
        throw error;
    }
}

export const createNewChat = async (members) => {
    try{
        const response = await axiosInstance.post('/api/chat/create-new-chat', {members});
        console.log(response.data);
        return response.data


    }catch(error){

        throw error;

    }
}