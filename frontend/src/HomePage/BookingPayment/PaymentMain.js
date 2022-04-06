import "./PaymentStyle.css";
import { PaymentDetail } from "./PaymentDetail";
import { PaymentStepTwo } from "./PaymentStepTwo";
import { PaymentSide } from "./PaymentSide";
import { PaymentStepOne } from "./PaymentStepOne";
import { PaymentInpDetail } from "./PaymentInpDetail";

import { useState, useEffect } from "react";
import { hotels } from "../HotelDetail/db.js";
import { useParams, useNavigate } from "react-router-dom";

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

export function PaymentMain() {
  const navigate = useNavigate();

  const [payData] = useState(initVar);

  const [confirm, setConfirm] = useState(false);

  const handleleave = () => {
    setConfirm(false);
    navigate.push("/");
  };

  const { id } = useParams();
  const [payDataDetail, setPayDataDetail] = useState({});
  const [payImg, setPayImg] = useState([]);
  const [cardOpen, setCardOpen] = useState(false);
  const [user, setUser] = useState({});

  const handleGoBack = () => {
    navigate.push("/hotels");
  };

  useEffect(() => {
    const data = hotels;
    const images = data.hotel[id - 1].images;
    setPayImg(images);
    console.log(hotels.hotel);
    setPayDataDetail(data.hotel[id - 1]);
    // console.log(payDataDetail);
    console.log(id);
  }, []);

  return (
    <div className="payMain">
      <div className="headerPay">
        <div>
          <img
            onClick={() => {
                navigate.push("/");
            }}
            src="/Images/Payment/Union.svg"
            alt=""
          />
        </div>
      </div>
      <div className="paymentB1">
        <div className="payModify" onClick={handleGoBack}>
          {"< "} Modify your booking
        </div>
        <div className="payB1B1">
          <div className="paymentB1Main">
            <div className="paySave">
              Yay! You just saved $ {payDataDetail.price * 2} on this booking!
            </div>
            {cardOpen ? (
              <>
                <PaymentInpDetail setCardOpen={setCardOpen} user={user} />
                <PaymentStepOne
                  price={
                    payDataDetail.price -
                    Math.round(payDataDetail.price / 4) -
                    Math.round(payDataDetail.price / 20) + 10
                  }
                  setConfirm={setConfirm}
                />
              </>
            ) : (
              <>
                <PaymentDetail setCardOpen={setCardOpen} setUser={setUser} />
                <PaymentStepTwo />
              </>
            )}
          </div>
          <PaymentSide
            initVar={initVar}
            payImg={payImg}
            payDataDetail={payDataDetail}
          />
        </div>
      </div>

      {confirm && (
        <div className="payBlur">
          <div>
            <div className="paymentConfirmed">
              <div className="payTick">
                <img src="/Images/Payment/Group.svg" alt="" />
              </div>
              <div>Booking Confirmed</div>
              <div>
                You will receive a mail in your above mentioned email-ID
              </div>
              <div>View Order Details</div>
              <button onClick={handleleave} className="payThankYou">
                THANK YOU
              </button>
            </div>
            <div>
              <PaymentSide
                initVar={initVar}
                payImg={payImg}
                payDataDetail={payDataDetail}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
