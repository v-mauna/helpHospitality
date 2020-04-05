import React from 'react';
import './resources.css';
import BOH from '../images/boh.jpg'

const Resources = () => {
		return (
			<div className="resources">
				<img src={BOH} alt="Lifesaver" />
				<div id="resources">
					
					<p>
						{' '}Below are further resources if you've been affected by the current closures due to COVID19 in the city.{' '}
					</p>
				</div>
			</div>
		);
    }
    
   export default Resources

