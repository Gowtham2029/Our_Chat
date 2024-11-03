import { configureStore } from '@reduxjs/toolkit';
import loaderSlice from '../Redux/loaderSlice';
import userSlice from '../Redux/userSlice';


const Store = configureStore({
        reducer : {
            loader : loaderSlice,
            user : userSlice,
        }
})

export default Store;