import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

const LogReg = () => {
  return (
    <div className='container'>
      <div className='logreg-topbar'>
        <h1>Prime Event</h1>
        <p></p>
      </div>
      <div className='logreg'>
          <div className='login'>
              <Login />
          </div>
          <div className='register'>
              <Register />
          </div>
      </div>
    </div>
  )
}

export default LogReg
