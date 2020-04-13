import React from 'react'
import './footer.css'
import Logo from '../images/syncrLogo.png'

const Footer = () => (
  <footer id='footer'>
    <div id='footerText'>
      <img id="syncrLogo"src={Logo} alt="SNYCR Logo"/>
      <span id='subtext'>Support NYC Restaurants</span>
      <span id='subtext'>Established 2020</span>
      <span id='subtext'>Brooklyn, NY 11211</span>
      <span id='subtext'>© SYNCR</span>
      <br />
    </div>
    <ul className='footerNav'>
      <li className='navItem'>
        Contact
        <ul className='nav-ul'>
          <li>
            <a
              id='footerLinks'
              href='mailto:hey@snycr.com'
              target='_blank'
              rel='noopener noreferrer'
            >
            hey@snycr.com
            </a>
          </li>
          Thank you for visiting.

        </ul>
      </li>
      
    </ul>
    <ul className='exploreNav'>
      <li className='navItem'>
        Explore
        <ul className='nav-ul'>
        <li>
            <a
              id='footerLinks'
              href='/about'
              target='_blank'
              rel='noopener noreferrer'
            >
              about
            </a>
          </li>
          <li>
            <a
              id='footerLinks'
              href='/restaurants'
              target='_blank'
              rel='noopener noreferrer'
            >
              restaurants
            </a>
          </li>
          <li>
            <a
              id='footerLinks'
              href='/resources'
              target='_blank'
              rel='noopener noreferrer'
            >
              resources
            </a>
          </li> 
          <li>
            <a
              id='footerLinks'
              href='/signup'
              target='_blank'
              rel='noopener noreferrer'
            >
              signup
            </a>
          </li>
          <li>
            <a
              id='footerLinks'
              href='/login'
              target='_blank'
              rel='noopener noreferrer'
            >
              Your Account
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </footer>
)

export default Footer
