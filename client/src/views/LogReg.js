import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

const LogReg = () => {
  return (
    <div className='container' style={{backgroundColor:'#D8D8D8', paddingTop:'100px'}}>
      <p></p>
        <div className='logreg-topbar'>
          <h1>Lets get started!</h1>
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
