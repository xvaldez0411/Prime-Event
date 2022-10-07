import React, {useState,useEffect} from 'react'
import {formatInTimeZone, utcToZonedTime} from 'date-fns-tz'
import {Link, useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import homeIcon from '../homeIcon.png'
import profileIcon from '../profileIcon.png'
import logOutIcon from '../logOutIcon.png'

const ViewEvent = () => {

    const [event,setEvent] = useState("")
    const [user, setUser] = useState({})
    const [newDate,setNewDate] = useState({}) // ??????????

    const {id} = useParams()
    const navigate = useNavigate()

    
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/v1/events/${id}`)
        .then((res)=>{
        console.log(res.data)
        setEvent(res.data.event)
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
    axios.get("http://localhost:8000/api/v1/users", {withCredentials:true})
        .then((res)=>{
            console.log(res.data)
            setUser(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
  }, [])

  return (
    <div className='background'>
        <div className='container'>
            <div className='top-bar'>
                <div className='top-bar-title'>
                <h1>Welcome, {user.firstName}!</h1>
                </div>
                <div className='top-bar-btns'>
                <Link to = {'/home'}><button>Home <img style={{height:'14px', width:'14px'}} src={homeIcon}/></button></Link>
                <Link to = {`/user/profile/${user.username}`}><button>Profile <img style={{height:'14px', width:'14px'}} src = {profileIcon}/></button></Link>
                <button onClick={logout}>Logout <img style={{height:'14px', width:'14px'}} src = {logOutIcon}/></button>
                </div>
            </div>
            <h2 style={{
                textAlign:'center',     //add extra styling here ..
                }}>{event.title}</h2>
            <div className='view-col'> 
                <div className='view-left'>
                    <p>Event Date & Time: {event.date?formatInTimeZone(event.date,'America/Chicago','yyyy-MM-dd HH:mm'):null}</p>
                    <p>Event Description:{event.description}</p>
                </div>
                <div className='view-right'>
                    <span>Event Location: {event.location}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewEvent