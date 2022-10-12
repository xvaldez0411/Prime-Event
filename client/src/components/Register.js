import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Register = (props) => {

    const [confirmReg, setConfirmReg] = useState("")
    const [errors, setErrors] = useState({})

    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
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
                firstName:"",
                lastName:"",
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
        <label style={{marginBottom: '15px'}}>Register</label>
        {errors.firstName ? (<span className='error-text'>{errors.firstName.message}</span>) : null}

            <div>
                {/* <label>Username</label> */}
                {/* {errors.firstName ? (<span className='error-text'>{errors.firstName.message}</span>) : null} */}
                <input
                style={{padding:'10px', border:'none', width:'300px', height:'20px', borderRadius:'5px'}}
                placeholder='First Name'
                type='text'
                name='firstName'
                value = {user.firstName}
                onChange={(e)=> handleChange(e)}
                />
            </div>
            {errors.lastName ? (<span className='error-text'>{errors.lastName.message}</span>) : null}

            <div>
                {/* <label>Username</label> */}
                <input
                style={{padding:'10px', border:'none', width:'300px', height:'20px', borderRadius:'5px'}}
                placeholder='Last Name'
                type='text'
                name='lastName'
                value = {user.lastName}
                onChange={(e)=> handleChange(e)}
                />
            </div>
            {errors.username ? (<span className='error-text'>{errors.username.message}</span>) : null}

            <div>
                {/* <label>Username</label> */}
                <input
                style={{padding:'10px', border:'none', width:'300px', height:'20px', borderRadius:'5px'}}
                placeholder='Username'
                type='text'
                name='username'
                value = {user.username}
                onChange={(e)=> handleChange(e)}
                />
            </div>
            {errors.email ? (<span className='error-text'>{errors.email.message}</span>) : null}

            <div>
            {/* <label>Email</label> */}
                <input
                style={{padding:'10px', border:'none', width:'300px', height:'20px', borderRadius:'5px'}}
                placeholder='Email Address'
                type='email'
                name='email'
                value = {user.email}
                onChange={(e)=> handleChange(e)}
                />
            </div>
            {errors.password ? (<span className='error-text'>{errors.password.message}</span>) : null}

            <div>
            {/* <label>Password</label> */}
                <input
                style={{padding:'10px', border:'none', width:'300px', height:'20px', borderRadius:'5px'}}
                placeholder='Password'
                type='password'
                name='password'
                value = {user.password}
                onChange={(e)=> handleChange(e)}
                />
            </div>
            {errors.confirmPassword ? (<span className='error-text'>{errors.confirmPassword.message}</span>) : null}

            <div>
            {/* <label>Confirm Password</label> */}
                <input
                style={{padding:'10px', border:'none', width:'300px', height:'20px', borderRadius:'5px'}}
                placeholder='Confirm Password'
                type='password'
                name='confirmPassword'
                value = {user.confirmPassword}
                onChange={(e)=> handleChange(e)}
                />
            </div>
            <div>
                <button style={{backgroundColor:'#1E90FF', width:'100px', height:'40px', fontSize:'20px', color:'white'}}>Register</button>
            </div>
        </form>
    </div>
  )
}

export default Register