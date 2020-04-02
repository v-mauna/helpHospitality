import React from 'react'
import './home.css'
import Skyline from '../images/skyline.jpg'


export default class Home extends React.Component{
    render() {
        return (
          <div className="homePage">
              
              <div id='skyline'>
              <div id="overlay">
                  <img src={Skyline} alt="Skyline"/>
                  <p id='homeText'>New York's hospitality industry has been severely devastated by the COVID19 pandemic and needs our help.<br/>
            If you're looking to donate, please browse the list of <a href="/restaurants">restaurants</a> and visit their GoFundMe page.<br/>
            If you want to add your restaurant, we invite you to <a href='/signup'>sign up</a> and add your information.   </p>
            </div>
            </div>
          </div>
        )
      }
    }
    
