import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import Select from 'react-select';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { Avatar_11, Avatar_08, Avatar_09, Avatar_02, Avatar_10, Avatar_05, PlaceHolder, User, Attachment } from "../../Entryfile/imagepath"
import EditLead from "../../_components/modelbox/EditLead"
import { admin, leadStatus, rolesObj } from '../../utils/roles';
import {   Accordion,  AccordionItem,  AccordionItemHeading,  AccordionItemButton,  AccordionItemPanel,} from 'react-accessible-accordion';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

// import Sonnet from '../../components/Sonnet';
import 'react-accessible-accordion/dist/fancy-example.css';
export const RequestedTrips = () => {
  const role = useSelector((state) => state.auth.role);
  const options1= [
    { value: '82,500 Total', label: '82,500 Total' },
    { value: 'Version 1 : 82,000   (total)', label: 'Version 1 : 82,000   (total)' },
        
  ]
  const options= [
    { value: 'All', label: 'All' },
    { value: 'By Traveller', label: 'By Traveller' },
    { value: 'By Agent', label: 'By Agent' },
        
  ]
  
  const [hide, setHide] = useState(true);

  // function to toggle the boolean value

  let showButton = hide ? "Show More" : "Show Less";








  




  return (
    <div className="page-wrapper">
    <Helmet>
      <title>Post Stay</title>
      <meta name="description" content="Login page" />
    </Helmet>
    <div className='container-fluid p-0'>
      <div className="page-header caret_qotepage requirment-detail">
          <div className='row'>
            <div className='col-lg-12 '>
                <Accordion>
                  <AccordionItem>
                      <AccordionItemHeading>
                          <AccordionItemButton>
                             TRAVELER REQUIREMENT
                          </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel className='qequst_trpko'>
                          <div className='container-fluid'>
                            <div className='row'>
                              <div className='col-lg-4 bdr-right'>
                              <div class="divider-box">
                                <ul class="requirement-list">
                                  <li><span>Duration </span>
                                    <strong>5 Days &amp; 4 Nights</strong>
                                  </li>
                                  <li><span>Starting Date </span> 21 Jan 2019</li>
                                </ul>
                              </div>
                              <div class="divider-box">
                                <ul class="requirement-list">
                                  <li><span> Budget with Flight </span> <i class="fa fa-inr"></i> 50,500 to <i class="fa fa-inr"></i> 53,000per person</li>
                                </ul>
                              </div>
                              <div class="divider-box">
                                <ul class="requirement-list">
                                  <li><span>No. of  Travelers</span> <strong>2 Adults 0 children</strong></li>
                                </ul>
                              </div>
                              <div class="divider-box">
                                <ul class="requirement-list">
                                  <li><span>Children Age </span> <strong> N/A </strong></li>
                                </ul>
                              </div>
                              </div>
                                <div className='col-lg-3 bdr-right'>
                                <div class="divider-box">
                                    <ul class="requirement-list">
                                      <li><span>Destination </span> Bali</li>
                                      <li><span>From </span> delhi</li>
                                    </ul>
                                  </div>
                                </div>
                                <div className='col-lg-5'>
                                <div class="divider-box">
                                  <ul class="requirement-list">
                                    <li><span>Trip Stage </span> <strong>I'm definitely going, I know which place . . . let's go!</strong></li>
                                    <li><span>I will Book  </span>in next 2-3 days</li>
                                  </ul>
                                </div>
                                </div>
                            </div>
                            <div className='row mt-2'>
                              <div className='col-lg-12'>
                              <div class="section_title">
                                  <h3><i class="fa fa-eye-slash" aria-hidden="true"></i> Looking for</h3>
                              </div>
                              </div>
                            </div>
                            <div class="requirment-detail">
                              <div class="row">
                                <div class="col-4 bdr-right">
                                  <ul class="requirement-list">
                                    <li> <span>Hotel Accommodation</span> Yes </li>
                                    <li> <span>Hotel Category</span> 3 Star; 2 Star </li>
                                  </ul>
                                </div>
                                <div class="col-4 bdr-right">
                                  <ul class="requirement-list">
                                    <li><span>Need Flight / Train </span> Yes </li>
                                    <li><span>Cab for Local Sight Seeing </span> Yes</li>
                                  </ul>
                                </div>
                                <div class="col-4">
                                  <ul class="requirement-list">
                                        <li><span>Transport from home city?</span> <p>Yes</p></li>
                                        <li><span>Maximum Budget</span> <p>53000</p></li>
                                        <li><span>Minimum Budget</span> <p>50500</p></li>
                                  </ul>
                                </div>
                              </div>

                            </div>
                          </div>
                      </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem>
                      <AccordionItemHeading>
                          <AccordionItemButton>
                          QUOTATIONS
                          </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <div className='tablocation'>
                      <Tabs defaultActiveKey="home"   id="fill-tab-example" className="tab-change-area">
                          <Tab eventKey="home" title={
                          <div className='updatetabbtn'>
                           <p className='updtaed-text-1'> <i className='fa fa-inr'></i> 82,500<span> Total</span> </p>
                            <p class="updtaed-text-2">Updated : 20-05-2020<span class="quote-status-green-text"> Converted</span></p>      
                             </div>
                            } className='tab-head'>
                            <div className=''>
                              <div className='row'>
                                <div className='col-lg-12'>
                                  <div className='bordertabbody'>
                                    <div className='row '>
                                      <div className='col-lg-6'>
                                      <span class="quote-cfee-label">CFEE: <i class="fa fa-inr"></i> 500.0</span>
                                      </div>
                                      <div className='col-lg-6 '>
                                        <div className='row justify-content-end'>
                                          {/* <div className='col-lg-1 pr-0'></div> */}
                                          <div className='col-lg-7 pl-0'>
                                          <p className='lineone'> <span className='abslot-text'> <i class="fa fa-inr" aria-hidden="true"></i></span>  <Select options={options1}  placeholder="82,500 Total"/> </p>
                                          </div>
                                          <div className='col-lg-4'>
                                            <button className='btn btn-danger '>SEND AGAIN</button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='row'>
                                    <div className='col-lg-1'>
                                      <div className='text-center icon_tabs'>
                                        <i class="fa fa-download" aria-hidden="true"></i>
                                        <p> <small> Download <br /> Quote </small></p>
                                      </div> 
                                        </div>
                                        <div className='col-lg-10 text-end'>
                                          <div className='icon_tabs'>
                                          <i class="fa fa-compress" aria-hidden="true"></i>
                                            <p> <small> Compare <br /> Quotes </small></p>
                                        </div>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                              </div>
                             
                            </div>
                          </Tab>
                          <Tab eventKey="profile" title={
                            <div className='updatetabbtn'>
                            <p className='updtaed-text-1'> <i className='fa fa-inr'></i> 28,600<span> / Person</span> </p>
                             <p class="updtaed-text-2">Updated : 20-05-2020<span class="text-danger"> Canceled</span></p>      
                              </div>
                          } className='tab-head'>
                          <div className='row'>
                                <div className='col-lg-12'>
                                  <div className='bordertabbody'>
                                    <div className='row'>
                                      <div className='col-lg-6'>
                                      <span class="quote-cfee-label">CFEE: <i class="fa fa-inr"></i> 500.0</span>
                                      </div>
                                      <div className='col-lg-6'>
                                        <div className='row justify-content-center'>
                                          {/* <div className='col-lg-1 pr-0'></div> */}
                                          <div className='col-lg-7 pl-0'>
                                          <p className='lineone'> <span className='abslot-text'> <i class="fa fa-inr" aria-hidden="true"></i></span>  <Select options={options1}  placeholder="82,500 Total"/> </p>
                                          </div>
                                          <div className='col-lg-4'>
                                            <button className='btn btn-danger '>SEND AGAIN</button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='row'>
                                    <div className='col-lg-1'>
                                      <div className='text-center icon_tabs'>
                                        <i class="fa fa-download" aria-hidden="true"></i>
                                        <p> <small> Download <br /> Quote </small></p>
                                      </div> 
                                        </div>
                                        <div className='col-lg-1 '>
                                          <div className='text-center icon_tabs'>
                                          <i class="fa fa-compress" aria-hidden="true"></i>
                                            <p> <small> Compare <br /> Quotes </small></p>
                                        </div>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                              </div>
                          </Tab>
                        </Tabs>
                        <div className='row'>
                                <div className='col-lg-12'>
                                  <div class="section-title">
                                    <h3><i class="fa fa-files-o" aria-hidden="true"></i> Basic Details</h3>
                                  </div>
                                </div> 
                             </div>
                            <div className='row show_more'>
                                <div className='col-lg-4 trip-group new-trip'>
                                  <h4>Trip Type</h4>
                                  <h3>NA</h3>
                                </div>
                                <div class="col-lg-4 trip-group new-trip">
                                    <h4>Days</h4>
                                    <h3>6 days</h3>
                                </div>
                                <div class="col-lg-4 trip-group new-trip">
                                  <h4>Nights</h4>
                                  <h3>5 nights</h3>
                              </div>
                              <div class="col-lg-4 trip-group new-trip">
                                <h4>Quotation Price </h4>
                                <h3><i class="fa fa-inr"></i> 82,500 </h3>
                              </div>
                              <div class="col-lg-4 trip-group new-trip">
                                  <h4>Destination </h4>
                                  <h3>Bali</h3>
                              </div>
                              <div class="col-lg-4 trip-group new-trip">
                                <h4>No. of Adults &amp; children </h4>
                                <h3>2 Adults &amp; 0 Children</h3>
                              </div>
                              <div class="col-lg-9 trip-group new-trip">
                                <h4>Hotel Details</h4>
                                <h3>
                                    <p>Night 1,2,3,4,5, Apk resort and spa, Phuket, ,Double room + breakfast </p>
                                </h3>
                              </div>

                             

        {/*------------------ hide button section show button ------------------------*/}
        {/*------------------ hide button section show button ------------------------*/}
                            {/* {
                              show ? 'hide-component' : 'blocelemtn'
                             }  */}
                               {
                                !hide && ( <div className='   '>
                                <div className='col-lg-9 trip-group new-trip'>
                                  <h4>Flight Details</h4>
                                  <h3><p className='mb-0'>21 Jan 19 G831 X ClassDept:DEL@0110 hrsArr:HKT@0725 hrs</p>
                                      <p>26 Jan 19 G832 X ClassDept:HKT@0830 hrsArr:DEL@1220 hrs</p></h3>
                                </div>
                                <div class="col-9 trip-group new-trip">
                                    <h4>Cab Details</h4>
                                    <h3><p>All transfers on Sic Basis </p></h3>
                                </div>
                                <div class="col-5 trip-group new-trip">
                                    <h4>Inclusions</h4>
                                    <h3><p>Hotels : Hotels/ Villas and Room categories
                                  <br />Meal plan : Breakfast
                                  <br />Airport Transfer : Arrival (All transfers on Sic Basis )
                                  <br />Airport Transfer : Departure (All transfers on Sic Basis )
                                  <br />Airfare
                                  <br />Tours and Sight Seeing : Local tours and experiences (All transfers on Sic Basis )
                                  <br />Others : Other Inclusions (All transfers on Sic Basis )</p></h3>
                                </div>
                                <div class="col-5 trip-group new-trip">
                                        <h4>Exclusions</h4>
                                        <h3><p>Meal plan : Lunch
                                  <br />Meal plan : Dinner
                                  <br />Visa (On Arrival)
                                  <br />Travel insurance
                                  <br />Others : Other Exclusions (500 Convenience  fee of travel triangle not included in package price )</p></h3>
                                </div>
                                <div class="col-9 trip-group new-trip">
                                    <h4>Day 1 : Arrival at Phuket </h4>
                                    <h3><p>Arrival at THAILAND
                                  <br />Reach the Airport .Pick up from the airport and transfer to the hotel 
                                  <br />Relax at the hotel for the day. </p>
                                  <p>Overnight in Phuket</p></h3>
                                </div>
                                <div class="col-9 trip-group new-trip">
                                <h4>Day 2 : Full Day Phi Phi Island Tour by Big Boat with Lunch</h4>
                                      <h3><p>our Description:
                                    <br />Pick up service from the hotel. Depart from Nopparattara Pier. Bamboo Island, swimming snorkeling and Relax on the beach. Viking Cave, where they can get Bridnet. Pi Leh Bay, beautiful lagoon and Crystal pool. lunch in the local Restaurant  Loh sama Bay, enjoy with colorful fish. Maya Beach, the location of the famous movies ‚The Beach. Monkey beach for more fun snorkeling colorful coral. Arrive back at your hotel. </p>
                                    <p>Kindly Note:</p>
                                    <p>*AS the rate does not include National Park Entrance fees, it has to be pay at the Entrance as follows
                                    <br />-Adult THB400 pp net.
                                    <br />-Child THB200 pp net. </p>
                                    <p>*Pick up and drop off are available at all the major hotels in Ao Nang Beach, Klong Muang Beach and Tub Kaak Beach only.Supplement charge will be applied for pick up and drop off from other area.</p>
                                    <p>*Program is subject to change according to the weather and local conditions.
                                    <br />Maya Bay and the islets beyond will be closed from 01 Jun -30 Sep'18, we will explore alternate Island instead of Maya bay</p>
                                    </h3>
                                </div>
                                <div class="col-9 trip-group new-trip">
                                      <h4>Day 3 : Half Day Phuket City Tour</h4>
                                      <h3><p>Take in Phuket Island's natural beauty as you are driven along beach roads through Patong, Karon and Kata. Visit the 'Three Beaches' viewpoint where you can take in a great vista of the beautiful bays of Kata Noi, Kata, Karon and Kho Pu Island, at one of the island's best scenic spot.</p>
                                  <p>This tour gives an insight into the highlights of the 'Pearl of the Andaman'. It also includes a leisurely drive around Phuket town to view the Sino-Portuguese style buildings. Other attractions visited are Gems factory, Wat Chalong, a Cashew Nut Factory, Sunset viewpoint at Phromthep Cape/Windmill Point and other local products place.</p>
                                  <p>Kindly Note:
                                  <br />Pick up and drop off are available at all the major city hotels in Patong, Kata, Karon Kamala and Phuket Town.
                                  <br />Supplement charge will be applied for pick up and drop off from other area.
                                  <br />Program is subject to change according to the weather and local conditions.
                                  <br />PRIVATE TOUR is mean for private land transfer only, other services are bases on join-in services.</p>
                                  <p>Location: Phuket	 
                                  <br />Duration: 04:30   Hrs</p></h3>
                                </div>
                                <div class="col-9 trip-group new-trip">
                                            <h4>Day 4 : Full day Coral Island Tour </h4>
                                            <h3><p>Breakfast At Hotel
                                    <br />Koh Hey, off Phuket's south coast, is so well known for its coral reef that it is often referred to simply as Coral Island. In addition to the splendid reefs there are two fine beaches on the north and west of the island. Coral Island Snorkeling: Trip by speedboat from Phuket to the island which is about 15-20 minutes.Coral island lives up to its name with a reef only a few meters from the beach. Guides provide instruction and show you the best spots around this shallow reef. Look out for parrotfish, needlefish, damselfish, surgeonfish and lots more... We spend the entire day on the beach so you can plan your day as you choose. You have easy access to the reef since it starts only few meters from the beach.
                                    <br />Kindly Note:
                                    <br />Pick up and drop off are available at all the major city hotels in Patong, Kata, Karon and Phuket Town.
                                    <br />Supplement charge will be applied for pick up and drop off from other area.
                                    <br />Program is subject to change according to the weather and local conditions. 
                                    <br />Inclusions:Air-conditioned Transportation,Entrance fee for mentioned visit,Speedboat,English speaking local guide,Snorkeling equipments
                                    <br />Overnight in Phuket
                                    <br />Includes
                                    <br />Air-conditioned Transportation
                                    <br />Entrance fee for mentioned visit
                                    <br />English speaking local guide
                                    <br />Speed boat
                                    <br />Lunch at local Thai restaurant
                                    <br />Snorkeling equipments</p>
                                    </h3>
                                  </div>  
                                  <div class="col-9 trip-group new-trip">
                                    <h4>Day 5 : Day Of Leisure </h4>
                                    <h3><p>Day Of Leisure </p></h3>
                                  </div>
                                  <div class="col-9 trip-group new-trip">
                                    <h4>Day 6 : Departure Its Time to Fly Back to India with Unlimited Memories to Cherish forever </h4>
                                    <h3><p>Breakfast at hotel</p>
                                      <p>After the most wonderful holiday of life, it’s time to go back home with bag full of ever lasting memories. Our Driver will smoothly transfer you to Airport to board the return flight. 
                                      <br />After breakfast check out form the hotel &amp; transfer to the airport- On the way you can pick up souveirs for your loved ones back home and then board the flight and kiss the island good bye. Aerial View of the  THAILAND is mesmerizing do keep a pic for memory.</p></h3>
                                 </div>
                                 <div class="col-9 trip-group new-trip">
                                  <h4>Terms &amp; Condition</h4>
                                  <h3><p><strong>&gt;&gt;&gt;Terms &amp; Conditions:</strong>&nbsp;</p>
                                  <ul>
                                  <li><strong>Hotel and airlines cancellation policies apply.</strong></li>
                                  <li><strong>Rooms are Subject to&nbsp;availability.</strong></li>
                                  <li>&nbsp;<strong>Rates are subject to change in case of any changes in airport taxes, hotel rates, transport rates, government taxes or entrance fees.</strong></li>
                                  <li><strong>Airfare is Subject to change&nbsp;without prior notice and Flip Trip Holidays &nbsp;will not&nbsp;take any&nbsp;responsibility for the same.</strong></li>
                                  <li>&nbsp;&nbsp;<strong>Check in time is 1400 hrs and Check out time is&nbsp;<span data-term="goog_783051223">12noon</span>. Early check-in/ late&nbsp;checkout is subject to availability.</strong></li>
                                  <li><strong>We require 25% of the payment&nbsp; of land part&nbsp; per person as booking advance or 100% of flight amount at the time of confirmation&nbsp; .</strong></li>
                                  <li>&nbsp;<strong>Balance full &amp; final payment will be required at the time of confirmation.</strong></li>
                                  <li><strong>Once Booking Is Processed No Amendment Is Allowed If So Charges Will Born By Guest.</strong></li>
                                  <li><strong>In Cruise Gratuity Fees Is Excluding From The Package , This Is Directly Paid By Guest At Cruise.</strong></li>
                                  <li><strong>Visa On Arrival Countries , Expense on Visa Is A Part Of Guest. Flip Trip Holidays Will Not Take Care Any Charges.</strong></li>
                                  <li><strong>Tourism Tax Is Directly Collect By Hotel From The Guest In International Destination (&nbsp;Some destinations)</strong></li>
                                  <li><strong>In case of cancellation ,Inr 5000 wil be the cancellation charges Per Person&nbsp;</strong></li>
                                  <li><strong>Bali International Airport applied a new policy for international passenger service charge ( PSC) at IDR 225000 per passenger to be Paid in cash, This PSC is applied for Tickets issued on and after 1 January 2018.&nbsp;<br /></strong></li>
                                  </ul></h3>
                                      </div>
                                      <div class="col-9 trip-group new-trip">
                                          <h4>Other Information</h4>
                                          <h3><p>Thanks,</p>
                                        <p>Yours Sincerely,
                                        <br />Geetanjali 
                                        <br />(Sales Executive)
                                        <br />9910303581 
                                        </p></h3>
                                      </div>
                                      </div>)
                               }
                            <div className='col-lg-12 text-center'>
                                <button className='btn btn-primary btn-sm' onClick={() => setHide(!hide)} >{showButton}</button>
                              </div> 
        {/*------------------------------------ show content  ----------------------------------- */}
        {/*------------------------------------ show content ----------------------------------- */}


                              
                            </div>
                            <div className='row mt-5'>
                              <div className='col-lg-7'>
                                <p><i class="fa fa-commenting" aria-hidden="true"></i>  Comments</p>
                                <div className='group_textarea'>
                                  <textarea name="" id="" cols="88" rows="5"></textarea>
                                </div>
                                <div className='sub_btn text-end'>
                                  <button className='btn btn-success'>Post</button>
                                </div>
                              </div>
                            </div>
                            <div className='row mt-5'>
                              <div className='col-lg-2'>
                                <Select options={options}  placeholder="All" className='btn-sm'/>
                              </div>
                              <div className='col-lg-12 mt-3 comment-list'>
                                <div className='dynamic_comments_data comment-area'>
                                  <ul className='agent_comments '>
                                      <li className='clear-fix'>
                                        <div className='user-avatar'>
                                            <img src={"../../../src/assets/img/photo.webp"}  alt=""/>
                                        </div>
                                        <div className='comment-meta '>
                                          <h3>
                                            <b>Akhil Rauthan</b>
                                            <div>
                                            <p>Our accounts team needs your passport details to ensure the confirmation of bookings.<br />Please be ensured that these details
                                            <br />will not be shared with anyone outside accounts team.<br />Please fill your passport information here on thi...</p>

                                            </div>
                                          </h3>
                                          <div class="post-info">
                                            <span class="post-date">12 Jan 2019</span>
                                            <span class="last-seen post-lastseen">seen by traveller over 3 years ago</span>
                                          </div> 
                                        </div>
                                      </li>

                                      <li className='clear-fix'>
                                        <div className='user-avatar'>
                                            <img src={"../../../src/assets/img/photo.webp"}  alt=""/>
                                        </div>
                                        <div className='comment-meta '>
                                          <h3>
                                            <b>Akhil Rauthan</b>
                                            <div>
                                            <p>We have received your payment of 83000.0 Rupee and have started processing <br /> your bookingconfirmations.</p>
                                            <p>Our accounts team needs your passport details to ensure the confirmation of bookings.<br />etails
                                            Please fill your passport information here on thi....</p>

                                            </div>
                                          </h3>
                                          <div class="post-info">
                                            <span class="post-date">12 Jan 2019</span>
                                            <span class="last-seen post-lastseen">seen by traveller over 3 years ago</span>
                                          </div> 
                                        </div>
                                      </li>

                                      <li className='clear-fix'>
                                        <div className='user-avatar'>
                                            <img src={"../../../src/assets/img/photo.webp"}  alt=""/>
                                        </div>
                                        <div className='comment-meta '>
                                          <h3>
                                            <b>Fliptrip Holidays</b>
                                            <div>
                                            <p>Our accounts team needs your passport details to ensure the confirmation of bookings.<br />etails
                                            Please fill your passport information here on thi...</p>
                                            </div>
                                          </h3>
                                          <div class="post-info">
                                            <span class="post-date">12 Jan 2019</span>
                                            <span class="last-seen post-lastseen">seen by traveller over 3 years ago</span>
                                          </div> 
                                        </div>
                                      </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                        </div>
                      </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem>
                      <AccordionItemHeading>
                          <AccordionItemButton>
                          TTSN INVENTORIES
                          </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel className='qequst_trpko'>
                        <div className='row'>
                          <div className='col-lg-12'>
                            <div className='tablocation'>
                          <Tabs defaultActiveKey="home"  id="fill-tab-example" className="tab-change-area">
                          <Tab eventKey="home" title={
                            <div className='updatetabbtn'>
                            <p className='updtaed-text-1'> <i className='fa fa-inr'></i> 22,500<span> Total</span> </p>
                             <p class="updtaed-text-2">Updated : 20-05-2020<span class="quote-status-green-text"> Converted</span></p>      
                              </div>
                          } className='tab-head'>
                            <div className=''>
                              <div className='row'>
                                <div className='col-lg-12'>
                                  <div className='bordertabbody text-center'>
                                      <h5>No inventories for this quote</h5>
                                  </div>
                                </div>
                              </div>
                             
                            </div>
                          </Tab>
                          <Tab eventKey="profile" title={
                            <div className='updatetabbtn'>
                            <p className='updtaed-text-1'> <i className='fa fa-inr'></i> 28,600<span> Person</span> </p>
                             <p class="updtaed-text-2">Updated : 20-05-2020<span class="text-danger"> Canceled</span></p>      
                              </div>
                          } className='tab-head'>
                          <div className='row'>
                                <div className='col-lg-12'>
                                  <div className='bordertabbody text-center'>
                                    <h5>No inventories for this quote</h5>
                                  </div>
                                </div>
                              </div>
                          </Tab>
                        </Tabs>
                        </div>
                          </div>
                        </div>
                      </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem>
                      <AccordionItemHeading>
                          <AccordionItemButton>
                          VOUCHER & PAYMENT
                          </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel className='qequst_trpko payment-section'>
                      <div class="section-title padding-left-10">
                        <h3><span class="icon sprite-agent sprite-payment-icon"></span><i class="fa fa-mobile" aria-hidden="true"></i>  Payment Details</h3>
                      </div>
                      <div className='row mt-4'>
                        <div className='col-lg-12 text-end'>
                          <div className='right_notes '>
                           <div className='lites_notes'> <span> TT Commission : 5.9% </span></div>
                            <div className='lites_notes'> <span> Amount :  2360.0 </span></div>
                          </div>
                        </div>
                      </div>
                      <div className='padding_area'>
                        <div className='row justify-content-center mt-3'>
                          <div className='col-lg-11'>
                            <div className='view_invoice'>
                              <span>Total Payment has to received: <i class="fa fa-inr"></i>   83,000.00 </span> <span>Total Convenience fee:  500.0 </span>
                              <span>TCS Collected:  825.0 </span> <span> <Link to=''>View Invoice</Link></span>
                            </div>
                            <div className='view_invoice'>
                              <span>Payment due from Traveller:  0.00</span> <span>Payment due from TT:  0.00</span>
                            </div>
                          </div>
                          <div className='col-lg-11 mt-4'>
                            <div className='table_point'>
                              <table className='table table-bordered '>
                                <tr>
                                  <th>Receiving Date	</th>
                                  <th>Installment Amount	</th>
                                  <th>Transferable to TT	</th>
                                  <th>Transferable to You	</th>
                                  <th>Amount Transfer/ Status	</th> 
                                  <th>Mark Payment</th>
                                </tr>
                                <tr>
                                  <td>12 Jan 2019	</td>
                                  <td><i className='fa fa-inr'></i> 82,500.00 </td>
                                  <td><i className='fa fa-inr'></i> 82,500.00 </td>
                                  <td>-</td>
                                  <td>Transferred to you on <br /> 23 Jan 2019</td>
                                  <td>Payment marked</td>
                                </tr>
                                <tr>
                                  <td>12 Jan 2019</td>
                                  <td>-</td>
                                  <td>-</td>
                                  <td><i className='fa fa-inr'></i> 42,500.00</td>
                                  <td>Transferred to you on 23 Jan 2019</td>
                                  <td>Payment marked </td>
                                </tr>
                                <tr>
                                  <td>12 Jan 2019	</td>
                                  <td>-</td>
                                  <td>-</td>
                                  <td><i className='fa fa-inr'></i> 36,315.00</td>
                                  <td>Transferred to you on <br />   23 Jan 2019</td>
                                  <td>Payment marked </td>
                                </tr>
                              </table>
                            </div>
                          </div>
                          <div className='col-lg-12'>
                            <div class="section-title padding-left-10">
                              <h3> <i class="fa fa-tag" aria-hidden="true"></i> Voucher Details</h3>
                            </div>
                            <div className='table_point voucher'>
                              <table className='table table-bordered'>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <Link to='/'>Upload Vouchers </Link>
                                        <div className='duedate'>Due Date: 15 Jan 2019</div>
                                        <ul className='mt-3'>
                                          <li><Link to=''> <i class="fa fa-fighter-jet" aria-hidden="true"></i>  Flight </Link></li>
                                          <li><Link to=''> <i class="fa fa-bed" aria-hidden="true"></i>   Hotel </Link></li>
                                          <li><Link to=''> <i class="fa fa-tag" aria-hidden="true"></i>  Other's </Link></li>
                                        </ul>
                                      </td>
                                      <td>
                                        <Link to='/'>Upload Payment Proof  </Link>
                                        <div className='duedate'>Due Date: NA</div>
                                        <ul className='mt-3'>
                                          <li><Link to=''> <i class="fa fa-fighter-jet" aria-hidden="true"></i>  Flight </Link></li>
                                          <li><Link to=''> <i class="fa fa-bed" aria-hidden="true"></i>   Hotel </Link></li>
                                          <li><Link to=''> <i class="fa fa-tag" aria-hidden="true"></i>  Other's </Link></li>
                                        </ul>
                                      </td>
                                    </tr>
                                  </tbody>
                              </table>
                            </div>
                          </div>  
                        </div>
                      </div>  
                      </AccordionItemPanel>
                  </AccordionItem>


                  <AccordionItem>
                      <AccordionItemHeading>
                          <AccordionItemButton>
                          TRAVELER’S REVIEW
                          </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel className='qequst_trpko payment-section'>
                        <div className='padding_area'>
                          <div class="dp-wrap post-style-list">
                              <div class="hotel-list-wrap"><span class="hotel-list">Overall rating</span>
                                <span class="por"> NA  </span>
                              </div>
                              <div class="hotel-list-wrap"><span class="hotel-list">Hotels </span>
                                <span class="por">  NA </span>
                              </div>
                              <div class="hotel-list-wrap"><span class="hotel-list">Cab &amp; Driver </span>
                                <span class="por"> NA</span>
                              </div>
                              <div class="hotel-list-wrap"><span class="hotel-list">Services of Travel Agent </span>
                                <span class="por">  NA  </span>
                              </div>
                            </div>
                        </div>
                      </AccordionItemPanel>
                  </AccordionItem>
            </Accordion>
            </div>
            


{/*  */}

 









          </div>
        </div>
    </div>
  </div>
  );
}

export default RequestedTrips;