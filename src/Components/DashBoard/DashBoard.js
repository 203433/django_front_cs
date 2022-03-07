import React from 'react'
import { useNavigate, Link, Outlet } from 'react-router-dom'

export default function DashBoard() {

    const navigate = useNavigate()
    const handleClick= () =>{
        navigate("/")
    }
  return (

    <div>
        <Link to='welcome'>
            saywelcome
        </Link>

        <br/>
        <Link to='goodbye'>
            sayya
        </Link>

        <h1>DashBoard</h1>

        <button onClick={handleClick}>
            Logout
        </button>

        <Outlet />

    </div>
  )
}
