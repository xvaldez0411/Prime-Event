import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

const LogReg = () => {
  return (
    <div className='container' style={{backgroundColor:'#D8D8D8', paddingTop:'100px'}}>
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
