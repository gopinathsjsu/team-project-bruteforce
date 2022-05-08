import React, { useState, useEffect } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Room({ room, fromDate, toDate }) {
  const [show, setShow] = useState(false);

  console.log(room);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={room.imageurls[0]} className="smallimg" alt="" />
      </div>
      <div className="col-md-7">

        <h1 style={{ color: "rgb(150 177 231)", fontWeight: "bold" }}>

          {room.name}
        </h1>
        <b style={{ fontWeight: "550" }}>
          <p>Location : {room.location}</p>
          <p>Max Count : {room.maxcount}</p>
          <p>Phone Number : {room.phonenumber}</p>
          <p>Type : {room.type}</p>
        </b>

        <div style={{ float: "right" }}>
          {fromDate && toDate && (
            <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
              <button
                className="btn btn-primary m-2"
                style={{ border: "none",  }}
              >
                Book Now
              </button>
            </Link>
          )}

          <button
            className="btn btn-primary"
            style={{ border: "none", marginRight:"-82px"}}
            onClick={handleShow}
          >
            View Detail
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>
            <h1 style={{ color: "rgb(252, 158, 21)", fontWeight: "bold" }}>
              {room.name}
            </h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {room.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100 bigimg"
                    src={url}
                    alt="First slide"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <label style={{ fontWeight: "bold" }}>Description:&nbsp;</label>
          <label> {room.description}</label>
          <br></br>
          <label style={{ fontWeight: "bold" }}>Rent:&nbsp;</label>
          <label> {room.rentperday}$ per Day</label>
          <br></br>
          <label style={{ fontWeight: "bold" }}>Location:&nbsp;</label>
          <label> {room.location}</label>
          <br></br>
          <label style={{ fontWeight: "bold" }}>Contact details:&nbsp;</label>
          <label>{room.phonenumber}</label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
