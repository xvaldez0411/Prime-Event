import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import homeIcon from '../homeIcon.png'
import profileIcon from '../profileIcon.png'
import logOutIcon from '../logOutIcon.png'
import createIcon from '../createIcon.png'

const EventList = () => {

  const [eventList, setEventList] = useState([])
  const [user, setUser] = useState({})
  const [isGoing, setIsGoing] = useState(false) // not sure about this ...

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

  const changeHandle = (key, oldValue) =>{ //attempting to use this for join button to change to GOING

  }
  
  return (
    <div className='background' style={{backgroundImage:'url(https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'}}>
      <div className='container'>
        <div className='top-bar'>
          <h1>Welcome, {user.username}</h1>
          <Link to = {'/events/new'}><button><img style={{height:'14px', width:'14px'}} src={createIcon}/></button></Link>
          <Link to = {`/user/profile/${user.username}`}><button><img style={{height:'14px', width:'14px'}} src={profileIcon}/></button></Link>
          <button onClick={logout}><img style={{height:'14px', width:'14px'}} src={logOutIcon}/></button>
        </div>
        <h1 className='page-title'>All Events</h1>
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
                  <td className='table-data'><Link to = {'/events/:id'}>{item.title}</Link></td>
                  <td className='table-data'>
                    
                    {user._id === item.createdBy._id? 
                    <div>
                    <button><Link to={`/events/update/${item._id}`} className='edit-btn'>Edit</Link></button>
                    <button className='delete-btn' onClick={()=>deleteHandle(item._id)}>Delete</button>
                    </div>
                    :<button onClick={()=>changeHandle()}>Join</button>}
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