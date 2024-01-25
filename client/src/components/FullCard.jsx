import React, { useEffect, useState } from 'react'
import './FullCard.css'
import { useContext } from 'react';
import { userContext } from '../Context';

const FullCard = () => {
    const [err,setErr] = useState('')
    const [showDefault,setShowDefault] = useState(false)
    const {currUser} = useContext(userContext)
    const timestamp = currUser.createdAt;
    const formattedDate = new Date(timestamp).toLocaleString();

    useEffect(()=>{
        setErr('')
        setShowDefault(false)
    },[currUser])

    const handleImageLoadError = () => {
        setShowDefault(true)
        setErr(<span style={{alignSelf: 'center', color: 'red', fontSize: '0.6rem', fontWeight:'600', marginTop:'1rem'}}> Error Loading Image...</span>)
    }
    
    return (
    <div className='full-card-wrapper'>
        <div className='full-card-image'>
            {
                showDefault 
                ? 
                <img
                    src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
                    alt=""
                    className='full-card-avatar'
                />
                :
                <img src={currUser.avatar} className='full-card-avatar' onError={handleImageLoadError} /> 
            }
            <div style={{marginTop:'0.5rem', fontSize: '1.2rem', fontWeight: '600'}}>{currUser.profile.username}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: '600'}}>({currUser.profile.firstName} {currUser.profile.lastName})</div>
        </div>
        <div className='full-card-content'>
            <div className="job-title">{currUser.jobTitle}</div>
            <div className="bio">ID - {currUser.id}</div>
            <div className="bio">{currUser.Bio}</div>
            <div className="email">{currUser.email}</div>
            <div className="created-at">Created At - {formattedDate}</div>
            {err}
        </div>
    </div>
  )
}

export default FullCard