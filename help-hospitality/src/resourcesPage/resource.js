import React from 'react'
import './resource.css'


const resource = (props) =>(
      <article>
        <div className="resource">
            <div id="resource">
              <div className="resourceInfo">
                <p>
                  Name: {props.name}
                  <br />
                  Site:{' '}
                  <a href={`${props.site}`} rel="noopener noreferrer" target="_blank">
                    {' '}
                    {props.site}
                  </a>
                </p>
              </div>
            </div>
            </div>
      </article>
    )

    export default resource