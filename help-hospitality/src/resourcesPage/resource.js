import React from 'react'
import './resource.css'

const resource = props => (
  <div id='resource'>
        <a
          id='resourceLink'
          href={`${props.site}`}
          rel='noopener noreferrer'
          target='_blank'
        >
          {props.name}
        </a>
  </div>
)

export default resource
