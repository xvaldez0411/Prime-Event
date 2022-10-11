import React, {useState,useEffect} from 'react'
import {formatInTimeZone, utcToZonedTime} from 'date-fns-tz'
import {Link, useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
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
        navigate("/")
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
    <div className='background' style={{
        backgroundColor:'#F0FFFF',
        color:'black'
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
            <h2 style={{
                textAlign:'center',
                marginBottom:'50px',
                fontStyle:'italic'     //add extra styling here ..
                }}>{event.title}</h2>
            <div className='view-col' style={{width:'300px'}}> 
                <div className='view-left'>
                    <p style={{fontWeight:'bold'}}>Event Date & Time:</p>
                    <p>{event.date?formatInTimeZone(event.date,'America/Chicago','MM-dd-yyyy HH:mm'):null}</p>
                    <p style={{fontWeight:'bold'}}>Event Description:</p>
                    <p style={{wordWrap:'break-word'}}>{event.description}</p>
                    <p style={{fontWeight:'bold'}}>Event Location:</p>
                    <p>{event.location}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewEvent