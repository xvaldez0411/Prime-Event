import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Register = (props) => {

    const [confirmReg, setConfirmReg] = useState("")
    const [errors, setErrors] = useState({})

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const register = (e)=>{
        e.preventDefault()

        axios.post("http://localhost:8000/api/v1/users/register",
        user,
        {
            withCredentials: true
        })
        .then((res)=>{
            console.log(res.data)
            setUser({
                username:"",
                email:"",
                password:"",
                confirmPassword:""
            })
            setConfirmReg("Thank you for registering! Now you can login..")
            setErrors({})
        })
        .catch((err)=>{
            console.log(err)
            setErrors(err.response.data.errors)
        })
    }

    
  return (
    <div>
        {/* <h1 style={{textAlign: 'center'}}>Register</h1> */}
        {confirmReg ? <h4 style={{color: 'green'}}>{confirmReg}</h4> : null}
        <form onSubmit={register} className='register-form'>
            <div>
                {/* <label>Username</label> */}
                {errors.username ? (<span className='error-text'>{errors.username.message}</span>) : null}
                <input
                placeholder='Username'
                type='text'
                name='username'
                value = {user.username}
                onChange={(e)=> handleChange(e)}
                />
            </div>
            <div>
            {/* <label>Email</label> */}
                {errors.email ? (<span className='error-text'>{errors.email.message}</span>) : null}
                <input
                placeholder='Email Address'
                type='email'
                name='email'
                value = {user.email}
                onChange={(e)=> handleChange(e)}
                />
            </div>
            <div>
            {/* <label>Password</label> */}
                {errors.password ? (<span className='error-text'>{errors.password.message}</span>) : null}
                <input
                placeholder='Password'
                type='password'
                name='password'
                value = {user.password}
                onChange={(e)=> handleChange(e)}
                />
            </div>
            <div>
            {/* <label>Confirm Password</label> */}
                {errors.confirmPassword ? (<span className='error-text'>{errors.confirmPassword.message}</span>) : null}
                <input
                placeholder='Confirm Password'
                type='password'
                name='confirmPassword'
                value = {user.confirmPassword}
                onChange={(e)=> handleChange(e)}
                />
            </div>
            <div>
                <button style={{backgroundColor:'#33CC00'}}>Register</button>
            </div>
        </form>
    </div>
  )
}

export default Register