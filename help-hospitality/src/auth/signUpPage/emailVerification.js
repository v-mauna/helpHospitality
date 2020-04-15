import React from 'react'
import './emailVerification.css'
const emailVerification = () =>(
    <div className="modal">
  <div className="modal-content">
    <span className="close-btn">&times;</span>
    <p>Please confirm your e-mail address via the link then proceed to the <a href="/login">Login</a> page</p>
  </div>
</div>
)

export default emailVerification