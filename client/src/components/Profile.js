import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, Link, useNavigate} from 'react-router-dom'

const Profile = () => {

    const {username} = useParams()

    const navigate = useNavigate()

    const [userEventList, setUserEventList] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/v1/eventsbyuser/${username}`,
        {withCredentials:true}
        )
          .then((res)=>{
            console.log(res.data)
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
            console.log(res)
            console.log(res.data)
            navigate("/login")
        })
        .catch((err)=>{
            console.log(err)
        })
    }





  return (
    <div>Profile</div>
  )
}

export default Profile