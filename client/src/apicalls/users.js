const { axiosInstance } = require("./axiosInstance");

const LoginUser = async (user) => {
  try {
    const response = await axiosInstance.post("/api/users/", user);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const RegisterUser = async (user) => {
  try {
    const response = await axiosInstance.post("/api/users/register", user);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("api/users/get-current-user");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const AllUsers = async () => {
  try{
    const response = await axiosInstance.get("api/users/allusers")
    // console.log(response.data);
    return response.data;

  }catch(error){
    return error.response.data;
  }
} 

export { LoginUser, RegisterUser, GetCurrentUser, AllUsers };
