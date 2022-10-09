import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import logOutIcon from '../logOutIcon.png'


const EventList = () => {

  const [eventList, setEventList] = useState([])
  const [user, setUser] = useState({})
  const [attending,setAttending] = useState([])

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
        navigate("/login")
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/v1/events`)
    .then((res)=>{
        console.log(res)
        setEventList(res.data.events)
    })
    .catch((err)=>{
        console.log(err)
    })

  }, [])

  const deleteHandle =(id)=>{
    axios.delete(`http://localhost:8000/api/v1/events/${id}`)
    .then((res)=>{
        console.log(res)
        setEventList(eventList.filter((event)=>event._id !== id))
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  const attendHandle = (id, joinString) =>{ //attempting to use this for join button to change to GOING
    axios.post(`http://localhost:8000/api/v1/events/${joinString}/${id}`, {user:user._id})
    .then((res)=>{
      console.log(res)
      const newList = eventList.map((item, index)=>{
        if(item._id === res.data.updatedEvent._id) {
          item = {...res.data.updatedEvent}
        }
        return item
      })
      setEventList([...newList])
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  
  return (
    <div className='background' style={{backgroundImage:'url(https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'}}>
      <div className='container'>
        <div className='top-bar'>
          <div className='top-bar-title'>
          <h1 className='font-link'>Welcome, {user.firstName}</h1>
          </div>
          <div className='top-bar-btns'>
            <Link style={{color:"white", textDecoration:"none"}} to = {'/events/new'}>Create Event</Link>
            <Link style={{color:"white", textDecoration:"none"}} to = {`/user/profile/${user.username}`}>Profile</Link>
            <button onClick={logout}>Logout <img style={{height:'14px', width:'14px'}} src={logOutIcon}/></button>
          </div>
        </div>
        <div className='mid-bar'>
        <h3 style={{marginLeft:"20px"}}>All Events</h3>
        </div>
        <table className='event-list'>
          <thead>
            <tr>
              <th className='table-head'>Event Title</th>
              <th className='table-head'>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              eventList.map((item,index)=>(
                <tr key={index} className='table-content'>
                  <td className='table-data'><Link to = {`/events/${item._id}`}>{item.title}</Link></td>
                  <td className='table-data'>
                    {user._id === item.createdBy._id? 
                    <div>
                    <button><Link to={`/events/update/${item._id}`} className='edit-btn'>Edit</Link></button>
                    <button className='delete-btn' onClick={()=>deleteHandle(item._id)}>Delete</button>
                    </div>
                    :
                    item.attending.some((person)=> person._id === user._id) ? 
                    <button style={{backgroundColor:'rgb(152,0,0)', color:'white'}} onClick={()=>attendHandle(item._id,'unjoin')}>Decline</button> : <button style={{backgroundColor:'#006600', color:'white'}} onClick={()=>attendHandle(item._id, 'join')}>Attend</button> 
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EventList