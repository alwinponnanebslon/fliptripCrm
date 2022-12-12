import React from 'react';
import { images } from "../Utility/Images";

function Footer() {
    return ( 
        <footer>
    <div className="footer">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-12 col-md-4">
                    <div className="left comm">
                        <img src={images.logo} className='main-logo' alt="" />
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="mid comm">
                        <ul>
                            <li>
                              <img src={images.whatsapp} alt="" />+91 9310
                              985 146
                            </li>
                            <li>
                              <img src={images.phone} alt="" />+91 99535 47559
                            </li>
                            <li>
                              <img
                                src={images.gmail}
                                alt=""
                              />sales15.nitsaholidays@gmail.com
                            </li>
                          </ul>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="right comm">
                        <img src={images.rahman} alt="" />
                        <h5>Rahman Khan</h5>
                        <p>Senior Sales Executive
                        </p>
                        <p>93109 85146</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
     );
}

export default Footer;