import React from 'react'
import './home.css'
import Skyline from '../images/skyline.jpg'

export default class Home extends React.Component {
  render () {
    return (
      <main className='homePage'>
        <div id='skyline'>
          <img src={Skyline} alt='Skyline' />
          <p className='homeText'>
            New York's restaurant industry has been severely devastated by the
            COVID19 pandemic as has its staff members.
            Our restaurants have helped us when we needed a break from our
            kitchens, when we needed a place to crash after a long day or a
            friendly face to talk to. Now it's our turn to help them.
            If you're looking to donate, please browse our list of{' '}
            <a id="homeLinks" href='/restaurants'>restaurants</a> to find a link to their
            donation's page.
            If you are a restaurant owner, we invite you to{' '}
            <a id="homeLinks" href='/signup'>sign up</a> and submit your restaurant's information.
            If you're a restaurant worker looking for some help, please check out our list of{' '}
            <a id="homeLinks" href='/resources'>resources.</a>
            <p/>
            New York and its people are strong and we will bounce back, united and stronger.
            </p>
        </div>
      </main>
    )
  }
}
  