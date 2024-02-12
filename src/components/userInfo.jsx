import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const UserInfo = () => {
  return (
    <div>
      <main>
        <div className='info-container'>
        <div >
            <Link to='/'>
            <i><FontAwesomeIcon icon={faUserCircle} /></i>
            <h2>INFORMATIONS</h2>
            </Link>
        </div>
        </div>
      </main>
    </div>
  )
}

export default UserInfo
