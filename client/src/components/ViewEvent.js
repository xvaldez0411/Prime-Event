import React, {useState,useEffect} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'

const ViewEvent = () => {

    const [event,setEvent] = useState("")
    const [user, setUser] = useState({})

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
    <div className='container'>
        <div className='top-bar'>
            <h1>Welcome, {user.username}!</h1>
            <Link to = {'/home'}><button>Home</button></Link>
            <Link to = {`/user/profile/${user.username}`}><button>Profile</button></Link>
            <button onClick={logout}>Logout</button>
        </div>
        <p>{event.title}</p>

    </div>
  )
}

export default ViewEvent