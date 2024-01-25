import React, { useEffect, useState, useContext } from 'react'
import { userContext } from '../Context'

import './Cards.css'

const Cards = ({user, mobile}) => {

    const [displayAlternate, setDisplayAlternate] = useState(true);
    // Get user data from context and display it on the card if available
    const {updateUser} = useContext(userContext)
    // console.log(obj)

  return (
    <div className='container' onClick={()=>updateUser(user)}>
        {
            displayAlternate ?
            <img src={user.avatar} alt="" onError={()=>setDisplayAlternate(false)} className='list-avatar-img' />
            :
            <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg" alt="" onError={()=>setDisplayAlternate(true)} className='list-avatar-img' />
        }
        <div className={`${mobile?'low-font': ''}`}>{user.profile.username}</div>
        <div className='username-wrapper'>
            <span className={`firstName ${mobile?'low-font': ''}`}>
                {user.profile.firstName}
            </span>
            <span className={`lastName ${mobile?'hidden':''}`}>
                {user.profile.lastName}
            </span>
        </div>
    </div>
  )
}

export default Cards