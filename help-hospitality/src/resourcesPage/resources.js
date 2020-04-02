import React from 'react';
import './resources.css';
import BOH from '../images/noBailout.png'

const Resources = ()=> {
		return (
			<div className="resources">
				<div id="resources">
					<img src={BOH} alt="Lifesaver" />
					<p id="text">
						{' '}Below are further resources if you've been affected by the current closures due to COVID19 in the city.{' '}
					</p>
				</div>
			</div>
		);
    }
    
   export default Resources

