import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams, useNavigate, Link} from 'react-router-dom'
import homeIcon from '../homeIcon.png'
import profileIcon from '../profileIcon.png'
import logOutIcon from '../logOutIcon.png'

const UpdateEvent = () => {

  const [title, setTitle] = useState("")
  const [date, setDate] = useState({})
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [errors,setErrors] = useState({})
  const [user, setUser] = useState({})


  const navigate = useNavigate()
  const {id} = useParams()

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
        navigate("/login")
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/v1/events/${id}`)
      .then((res)=>{
        setTitle(res.data.event.title)
        setDate(res.data.event.date)
        setLocation(res.data.event.location)
        setDescription(res.data.event.description)
      })
      .catch((err)=>{
        console.log(err)
      })

  }, [])

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
      date,
      location,
      description
    }
    axios.put(`http://localhost:8000/api/v1/events/${id}`, event)
      .then((event)=>{
        console.log(event)
        navigate('/home')
      })
      .catch((err)=>{
        setErrors(err.response.data.error.errors)
      })
  }

  return (
    <div className='background' style={{backgroundImage:'url(https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'}}>
      <div className='container'>
        <div className='top-bar'>
          <h1>Welcome, {user.username}!</h1>
          <Link to = {'/home'}><button><img style={{height:'14px', width:'14px'}} src={homeIcon}/></button></Link>
          <Link to = {`/user/profile/${user.username}`}><button><img style={{height:'14px', width:'14px'}} src = {profileIcon}/></button></Link>
          <button onClick={logout}><img style={{height:'14px', width:'14px'}} src = {logOutIcon}/></button>
        </div>
        <h1 className='page-title'>Update Event</h1>
          <form onSubmit={submitHandle}>
            <div className='col'>
              <div className='left-col'>
                {errors.title? <p style={{color:'red'}}>{errors.title.message}</p>:null}
                <label style={{fontWeight:'bold'}}>Event Title</label>
                <input type="text" value={title} onChange={titleHandle} />

                {errors.date? <p style={{color:'red'}}>{errors.date.message}</p>:null}
                <label style={{fontWeight:'bold'}}>Event Date</label>
                <input type="datetime-local" value={date} onChange={dateHandle} />

                {errors.location? <p style={{color:'red'}}>{errors.location.message}</p>:null}
                <label style={{fontWeight:'bold'}}>Event Location</label>
                <input type="text" value={location} onChange={locationHandle} />


              </div>
              <div className='right-col'>
              {errors.description? <p style={{color:'red'}}>{errors.description.message}</p>:null}
              <label style={{fontWeight:'bold'}}>Event Description</label>
              <textarea value={description} rows="5" cols="40" onChange={descHandle}></textarea>
              <button>Update Event</button>
              </div> 
            </div>
          </form>
      </div>
    </div>
  )
}

export default UpdateEvent