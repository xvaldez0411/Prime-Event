import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
import logOutIcon from '../logOutIcon.png'

const CreateEvent = () => {

  const [title, setTitle] = useState("")
  const [date, setDate] = useState({})
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [errors,setErrors] = useState({})
  const [user, setUser] = useState({})

  const navigate = useNavigate()

  useEffect(()=>{
    axios.get("http://localhost:8000/api/v1/users", {withCredentials:true})
        .then((res)=>{
            console.log(res.data)
            setUser(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
}, [])

const logout = (e)=>{
  axios.post("http://localhost:8000/api/v1/users/logout",
  {}, // must have due to having a post request .. 
  {withCredentials:true})
  .then((res)=>{
      console.log(res)
      console.log(res.data)
      navigate("/")
  })
  .catch((err)=>{
      console.log(err)
  })
}

  const titleHandle = (e)=>{
    setErrors("")
    setTitle(e.target.value)
  }

  const dateHandle = (e)=>{
    setErrors("")
    setDate(e.target.value)
  }

  const locationHandle = (e)=>{
    setErrors("")
    setLocation(e.target.value)
  }

  const descHandle = (e)=>{
    setErrors("")
    setDescription(e.target.value)
  }

  const submitHandle = (e)=>{
    e.preventDefault()

    const event = {
      title,
      date:new Date(date),
      location,
      description
    }
    axios.post("http://localhost:8000/api/v1/events", event, {withCredentials:true})
      .then((event)=>{
        console.log(event)
        navigate('/home')
      })
      .catch((err)=>{
        setErrors(err.response.data.error.errors)
      })
  }





  return (
    <div className='background' style={{
      backgroundColor: '#e8e8e9',
      opacity: '1',
      backgroundImage: 'repeating-radial-gradient( circle at 0 0, transparent 0, #e8e8e9 4px ), repeating-linear-gradient( #6d6b3355, #6d6b33 )',
    }}>
      <div className='container'>
          <div className='top-bar'>
            <div className='top-bar-title'>
              <h1 className='font-link'>Welcome, {user.firstName}</h1>
            </div>
            <div className='top-bar-btns'>
              <Link style={{color:"white", textDecoration:"none"}} to = {'/home'}>Home</Link>
              <Link style={{color:"white", textDecoration:"none"}} to = {`/user/profile/${user.username}`}>Profile</Link>
              <button onClick={logout}>Logout <img style={{height:'14px', width:'14px'}} src = {logOutIcon}/></button>
            </div>
          </div>
          <div className='mid-bar'>
            <h3 style={{marginLeft:"20px"}}>Create Event</h3>
          </div>
          <div className='form-container'>
            <h4 style={{fontStyle:'italic'}}>Let's create an event! Invite your friends, family or even that weird guy from the office!</h4>
            <form onSubmit={submitHandle}>
              <div className='form-top'>
                {errors.title? <p style={{color:'red'}}>{errors.title.message}</p>:null}
                <label>Event Title</label>
                <input type="text" value={title} onChange={titleHandle} />
              </div>
              <div className='form-mid'>
                <div>
                  {errors.date? <p style={{color:'red'}}>{errors.date.message}</p>:null}
                  <label>Event Date</label>
                  <input type="datetime-local" value={date} onChange={dateHandle} />
                </div>
                <div>
                  {errors.location? <p style={{color:'red'}}>{errors.location.message}</p>:null}
                  <label>Event Location</label>
                  <input type="text" value={location} onChange={locationHandle} />
                </div>
              </div>
              <div className='form-bottom'>
              {errors.description? <p style={{color:'red'}}>{errors.description.message}</p>:null}
              <label>Event Description</label>
              <textarea value={description} rows="5" cols="40" onChange={descHandle}></textarea>
              </div>
              <div className='form-btn'>
              <button>Add Event</button>
              </div>

            </form>
          </div>
      </div>
    </div>
  )
}

export default CreateEvent