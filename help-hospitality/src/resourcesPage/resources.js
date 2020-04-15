import React from 'react'
import './resources.css'
import BOH from '../images/boh.jpg'
import ResourcesList from './resourcesList'
import Resource from './resource'
const Resources = () => {
  return (
    <div className='resources'>
      <img src={BOH} alt='Lifesaver' />
      <div id='resources'>
        We know there is a lot of information going around on how to provide support for our hospitality workers 
        and wanted to provide our own list of resources that we feel are especially useful in this confusing, and overhwelming time.
      </div>
      <div id='resourcesBlock'>
        {ResourcesList.map(resource => (
          <Resource key={resource.id} name={resource.name} site={resource.site} />
        ))}
      </div>
    </div>
  )
}

export default Resources
