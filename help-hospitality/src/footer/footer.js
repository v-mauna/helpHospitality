import React from 'react'
import './footer.css'
import Logo from '../images/syncrLogo.png'

const Footer = () => (
  <footer id='footer'>
    <div id='footerText'>
      <a href="/"><img id="syncrLogo"src={Logo} alt="SNYCR Logo"/></a>
      <span id='subtext'>Support NYC Restaurants</span>
      <span id='subtext'>Established 2020</span>
      <span id='subtext'>Brooklyn, NY 11211</span>
      <span id='subtext'>© SYNCR</span>
      <br />
    </div>
    <div className="exploreNav">
    <ul>
      <li className='navItem'>
        Explore
        <ul className='nav-ul'>
        <li>
            <a
              id='footerLinks'
              href='/about'
              rel='noopener noreferrer'
            >
              about
            </a>
          </li>
          <li>
            <a
              id='footerLinks'
              href='/restaurants'
              rel='noopener noreferrer'
            >
              restaurants
            </a>
          </li>
          <li>
            <a
              id='footerLinks'
              href='/resources'
              rel='noopener noreferrer'
            >
              resources
            </a>
          </li> 
          <li>
            <a
              id='footerLinks'
              href='/signup'
              rel='noopener noreferrer'
            >
              signup
            </a>
          </li>
        </ul>
      </li>
    </ul>
    </div>
    <div className='contactNav'>
    <ul >
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
          <li>
            <a
              id='footerLinks'
              href='http://www.linkedin.com/in/v-mauna'
              target='_blank'
              rel='noopener noreferrer'
            >
            LinkedIn
            </a>
          </li>
        </ul>
      </li>
      
    </ul>
    </div>
  </footer>
)

export default Footer
