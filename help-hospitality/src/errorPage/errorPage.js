import React, {Fragment} from 'react';
import Sunset from '../images/sunset.jpg'
import './errorPage.css'
const errorPage = () => {
    return(
    <Fragment>
        <div className="errorPage">
            <img id="errorPageImg" src={Sunset} alt="New York Streets"/>
            <div className="errorPageText">
                <p>Looks like a wrong turn was made.
                    <br/>
                    Try a different link. </p>
            </div>

        </div>
    </Fragment>
    )
}

export default errorPage