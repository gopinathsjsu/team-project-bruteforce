
import styled from "styled-components";
import React,{ useEffect, useState } from "react";
import "./StayHistory.css";
import { hotels } from "./HotelDetail/db.js";


var initVar = {
    name: "SPOT ON 46946 Hotel Aalishan",
    poster: "./Images/Payment/payaali1.jpg",
    days: "1",
    new: "true",
    date: "Thu, 14 Oct - Fri, 15 Oct",
    room: "1 Room, 2 Guests",
    type: "SPOT ON NON-AC",
    price: 30722,
    pdrop: 11684,
  };

const PayImgDiv = styled.div`
  width: 80px;
  height: 69px;
  border: 1px solid #858585;
  border-radius: 4px;
  background-size: contain;

  & img {
    width: 100%;
    height: 100%;
  }
`;

function StayHistory() {
    const id = 1
    const [payData] = useState(initVar);
    const [payImg, setPayImg] = useState([]);
    const [payDataDetail, setPayDataDetail] = useState({});

    useEffect(() => {
        const data = hotels;
        const images = data.hotel[id - 1].images;
        setPayImg(images);
        setPayDataDetail(data.hotel[id - 1]);

      }, []);

    // let renderHistory = null;
  
    // renderHistory = hotelHistory.hotel.map((pro) => {
    //   console.log(pro);
    //   return ()

    return(
    <div>

        <h1 className="heading"> Your Bookings so Far </h1>

        <div className="paymentB1Side ">
        <div>
            <div>
            <div className="paymentSideHead">{payDataDetail.name}</div>
            <div className="paymentSideDays">{payData.days} Nights</div>
            </div>
            <PayImgDiv>
            <img src={payImg[0]} alt="" />
            </PayImgDiv>
        </div>
        <div className="margin30">
            <div className="paySideIcon paySideFont14">
            <img src="/Images/Payment/Group 24.svg" alt="" />
            {payData.date}
            </div>
            <div className="paySideFont14">{payData.room}</div>
        </div>
        <div className="margin30">
            <div className="paySideIcon paySideFont14">
            <img src="/Images/Payment/Type.svg" alt="" />
            {payData.type}
            </div>
        </div>
        
        <div>
            <div>
            <div className="paySideFinalAmt">Total Paid Amount</div>
            
            </div>
            <div className="payAmt">
            $
            {payDataDetail.price -
                Math.round(payDataDetail.price / 4) -
                Math.round(payDataDetail.price / 20) +
                5}
            </div>
        </div>
        </div>
    </div>
    );    
}

export default StayHistory