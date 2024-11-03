import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterUser} from '../apicalls/users'
import { useDispatch } from 'react-redux'
import { hideLoader, showLoader } from '../Redux/loaderSlice'

const Register = () => {
  const dispatch = useDispatch(showLoader());
  const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const registerUser = async () => {
       dispatch(showLoader());
       const response = await RegisterUser(user)
        dispatch(hideLoader());
       if(!response.success){
         alert(response.message);
       }
       else{
        alert(response.message);
        window.location.href = '/';
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
            <h1 className='text-2xl  font-semibold text-center uppercase'>OurChat - Register</h1>
            <hr />
            <input type="text" 
            className='w-96 rounded-sm'
            value={user.name}
            onChange={(e) => setUser({...user, name:e.target.value})}
            placeholder='Enter your name'
            />


            <input type='email'
            value={user.email}
            onChange={(e) => setUser({...user, email:e.target.value})}
            placeholder='Enter your email'
            className='rounded-sm'  />


            <input type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password:e.target.value})} 
            placeholder='Enter the password'
            className='rounded-sm' />

            <button className='contained-btn'
            onClick={registerUser}
            >Register</button>
            <Link to="/" className='underline'>Already have an account ? Login</Link>
        </div>
    </div>
  )
}

export default Register