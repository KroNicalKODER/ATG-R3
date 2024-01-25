import React, { useEffect, useState } from 'react'
import Cards from './components/Cards'
import axios from 'axios'
import { UserProvider } from './Context'

import './App.css'
import FullCard from './components/FullCard'
import Loader from './components/Loader'

const App = () => {

  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    if(window.innerWidth <= 768){
      setMobile(true)
    }
    const handleResize = () => {
      setMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [allUsers,setAllUsers] = useState([])
  const [filtered, setFiltered] = useState([])
  const [showLoader, setShowLoader] = useState(false)
  const [err,setErr] = useState('')

  const fetchUsers = async () => {
    try {
      setShowLoader(true);
      await axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users')
      .then((res)=>{
        setShowLoader(false)
        setAllUsers(res.data)
        setFiltered(res.data)
        setErr('')
      })
    } catch (error) {
      setShowLoader(false)
      setErr(<span style={{fontSize:'0.7rem', color: 'red', fontWeight:'500',alignSelf:'center'}}>Could Not Fetch the Users... This is the default card shown here.</span>)
      console.log('error',error)
    }
  }
  
  const handleSearchChange = (e) => {
    console.log(e.target.value)
    if(!e.target.value || e.target.value === ''){
      setFiltered(allUsers)
      return
    }
    let filteredUsers = allUsers.filter(user=> user.profile.username.toLowerCase().includes(e.target.value.toLowerCase()))
    setFiltered(filteredUsers)
  }

  useEffect(()=>{
    fetchUsers()
  },[])
  
  return (
    <UserProvider>
    <div className={`full-wrapper ${mobile ? 'flex-mobile' : ''}`}>
      <div className='all-user-wrapper'>
        {err}
        <div style={{fontSize: '3rem', fontWeight: '700', alignSelf: 'self-start', marginLeft:'1rem', marginBottom: '1rem'}}>JUST SEARCH EM...</div>
        <input type="text" name="" id="" onChange={handleSearchChange} placeholder='Search by Username' style={{width: '90%', marginBottom: '1rem', padding: '6px 10px', color: 'black', fontWeight:'500'}} className="search-box" />          
        <div className='all-cards-wrapper'>
          {
            showLoader
            ?
            <Loader/>
            :
            <>
            { 
            filtered.length===0?
            'No User Found'
            :
            filtered.map((item,index)=>(
              <Cards key={index} user={item} />
              ))
            }
            </>
          }
        </div>
      </div>
      {
        mobile
        ?
        <hr/>
        :
        <></>
      }
      <div className='selected-user-wrapper'> 
          {
            showLoader 
            ?
            <Loader />
            :
            <div className={`${mobile ? 'margin-top-mobile' : ''}`}>
            <FullCard/>
            </div>
          }
      </div>
    </div>
    </UserProvider>
  )
}

export default App