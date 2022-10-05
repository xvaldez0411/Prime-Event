import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {

    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    
    const navigate = useNavigate()

    const login = (event)=>{
        event.preventDefault()
        axios.post("http://localhost:8000/api/v1/users/login",
        {
            email: email,
            password: password
        },
        {
            withCredentials: true
        })
        .then((res)=>{
            console.log(res, "res")
            console.log(res.data, "is res data!")
            navigate("/home")
        })
        .catch((err)=>{
            console.log(err.response.data)
            setErrorMessage(err.response.data.message)
        })
    }


  return (
    <div>
        <h1 style={{textAlign: 'center'}}>Login</h1>
        <p className='error-text'>{errorMessage ? errorMessage:""}</p>
        <form onSubmit={login} className='login-form'>
            <div>
                <label>Email</label>
                <input
                type="text"
                name='email'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Password</label>
                <input 
                type='password'
                name='password'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                />
            </div>
            <div>
                <button type='submit'>Sign in</button>
            </div>
        </form>
    </div>
  )
}

export default Login