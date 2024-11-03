import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../apicalls/users'
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../Redux/loaderSlice';
 import { setUser } from '../Redux/userSlice';
const Login = () => {
    const navigate = useNavigate();
    const [user, setUsers] = useState({
        name: '',
        email: '',
        password: ''
    })
    const dispatch = useDispatch(showLoader());
    const loginUser = async () => {
        dispatch(showLoader());
        const response = await LoginUser(user);
        dispatch(hideLoader());
        if(!response.success){
            alert(response.message);
            dispatch(hideLoader());
        }
        else{
            alert(response.message);
            localStorage.setItem('token', response.data);
            window.location.href = '/home';
            dispatch(hideLoader());
        }
    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
            navigate('/home');
        }
    }, [])

  return (
    <div className='h-screen text-black flex justify-center items-center'>
        <div className='bg-white shadow-md p-5 flex flex-col gap-5 rounded-sm'>
            <h1 className='text-2xl  font-semibold text-center uppercase'>OurChat - Login</h1>
            <hr />
           
            <input type='email'
            value={user.email}
            onChange={(e) => setUsers({...user, email:e.target.value})}
            placeholder='Enter your email'
            className='w-96 rounded-sm'  />


            <input type="password"
            value={user.password}
            onChange={(e) => setUsers({...user, password:e.target.value})} 
            placeholder='Enter the password'
            className='rounded-sm' />

            <button className='contained-btn'
            onClick={loginUser}>Login</button>
            <Link to="/register" className='underline'>Don't have an account ? Register</Link>
        </div>
    </div>
  )
}

export default Login;