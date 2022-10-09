import React from 'react'
import {Link} from 'react-router-dom'
import vid1 from '../video.mp4'
import pic1 from "../landingpagepic.png"

const LandingPage = () => {









  return (
    <div className= "landingContainer">
        <div className='landingTop'>
            <div className='landing-top-title'>
            <h1 className='font-link'>Welcome to Prime Event</h1>
            </div>
        </div>
        <div className='landingPic' style={{height:'580px',backgroundSize:'cover',backgroundImage:'url(https://images.pexels.com/photos/3184193/pexels-photo-3184193.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'}}>
            <div style={{position:'relative', left:'200px', top:'100px'}}>
                <div>
                    <p style={{width:'250px',wordWrap:'break-word'}}>A great party isn't all about where.. It's mainly about who's going!</p>
                </div>
                <div className='landing-top-link'>
                    <Link style={{color:''}} to = {"/login"}><button style={{height:'50px', width:'200px'}}>Sign in / Sign up</button></Link>
                </div>
            </div>
        </div>
        <div className='landingBody'>
            <div className='landing-col-left'>
                <div>
                    <video src={vid1} width="600" height="300" autoPlay loop muted></video>
                </div>
            </div>
            <div className='landing-col-right'>
                <div>
                    <h2>Create an event for:</h2>
                </div>
                <div>
                    <ul>
                        <li>Family</li>
                        <li>Friends</li>
                        <li>Work</li>
                        <li>Holidays</li>
                        <li>Just because its Tuesday</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LandingPage