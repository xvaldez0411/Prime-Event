import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, Link, useNavigate} from 'react-router-dom'
import logOutIcon from '../logOutIcon.png'
import {formatInTimeZone, utcToZonedTime} from 'date-fns-tz'
import video1 from '../video.mp4'

const Profile = () => {

    const {username} = useParams()

    const navigate = useNavigate()

    const [userEventList, setUserEventList] = useState([])
    // const [user, setUser] = useState({})

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/v1/eventsbyuser/${username}`,
        {withCredentials:true}
        )
          .then((res)=>{
            console.log(res.data[0])
            setUserEventList(res.data)
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
            // console.log(res)
            // console.log(res.data)
            navigate("/login")
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    // useEffect(()=>{
    //   axios.get("http://localhost:8000/api/v1/users", {withCredentials:true})
    //       .then((res)=>{
    //           console.log(res.data)
    //           setUser(res.data)
    //       })
    //       .catch((err)=>{
    //           console.log(err)
    //       })
    // }, [])

  return (
    <div className='background' style={{backgroundImage:"url(https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)"}}>
      <div className='container'>
        <div className='top-bar'>
          <div className='top-bar-title'>
            <h1>{username}'s Profile</h1>
          </div>
          <div className='top-bar-btns'>
            <Link style={{color:"white", textDecoration:"none"}} to = {'/home'}>Home</Link>
            <button onClick={logout}>Logout <img style={{height:'14px', width:'14px'}} src = {logOutIcon}/></button>
          </div>
        </div>
        <div className='mid-bar'>
          <h3 style={{marginLeft:"20px"}}>Your current events</h3>
          </div>
        <div className='content'>
            {
              userEventList.map((item,index)=>{
                return (
                <div className='card' key={index}>
                    <h3>Event Title: {item.title}</h3>
                    <h3>Event Time: {item.date?formatInTimeZone(item.date,'America/Chicago','MM-dd-yyyy HH:mm'):null}</h3>
                    <h3>Guests attending: {item.attending.length}</h3>
                </div>
                )
              })
            }
        </div>
      </div>
    </div>
  )
}

export default Profile