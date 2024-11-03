import {axiosInstance} from './axiosInstance';


export const sendMessage = async (message) => {
   try {
       
    const response = await axiosInstance.post("/api/messages/new-message", message);
    return response.data;

   } catch (error) {
     throw error;
   }
}

export const GetMessages = async (messageId) => {
    try {
        const response = await axiosInstance.get(`/api/messages/get-all-messages/${messageId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}