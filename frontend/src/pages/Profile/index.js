import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './style.css'
import logoImg from '../../assets/star-wars-2.svg';
import { FiPower } from 'react-icons/fi'
import api from '../../services/api'

export default function Profile() {
  const name = localStorage.getItem('name')
  const token = localStorage.getItem('token')
  const [user, setUser] = useState({})

  const history = useHistory()

  useEffect(() => {
    api.get('users', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      setUser(response.data);
    })
  }, [token]);

  function handleLogout() {
    localStorage.clear()

    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="StarWars" />
        <span>Welcome, {name}</span>
        <button type="button">
          <FiPower size={18} color="#ffffff" onClick={handleLogout} />
        </button>
      </header>
    </div>
  )
}