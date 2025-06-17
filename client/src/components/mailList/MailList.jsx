import React from 'react';
import "./mailList.css"
const MailList = () => {
    return (
        <div className='mail'>
            <h1 className="mailTitle">Save time, save money!</h1>
            <p className="mailDesc">Sign up to get notified about all discounts.</p>
            <div className="mailInputContainer">
                <input type="text" placeholder='Your email'/>
                <button>Subscribe</button>
            </div>
        </div>
    );
};

export default MailList;