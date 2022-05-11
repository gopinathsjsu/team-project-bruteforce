const handleBooking = async () => {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      guestCount,
      totalAmount: totalAmount + amenitiesAmount,
      totaldays: totalDays,
      remainingAmount: room.rentperday,
      extracostapplied: "extra cost",
      offerapplied: "offer",
    };

    try {
      setLoading(true);
      const result = await axios.post(
        "http://localhost:4000/api/bookings/bookroom",
        bookingDetails
      );
      setLoading(false);
      Swal.fire(
        "Congratulations",
        "Your Room Booked Successfully",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          setIsRoomBooked(true);
          if (rewards === 0) {
            const result = axios
              .put(
                "http://localhost:4000/api/users/updateUserRewards/" +
                  JSON.parse(localStorage.getItem("currentUser"))._id
              )
              .then((userRes) => {
                setIsRoomBooked(true);
                console.log(userRes);
                const user = JSON.parse(localStorage.getItem("currentUser"));
                user.rewards = 0;
                console.log(JSON.stringify(user));
                localStorage.setItem("currentUser", JSON.stringify(user));
              })
              .catch((error) => {
                console.log(error);
              });
            // window.location.href = "/home";
          } else {
            window.location.href = "/home";
          }
        }
        window.location.href = "/bookings";
      });
    } catch (error) {
      setError(error);
      Swal.fire("Opps", "Error:" + error, "error");
    }
    setLoading(false);
    //TESTING CARD
    //https://stripe.com/docs/testing
    //https://www.npmjs.com/package/react-stripe-checkout
    // fetch("/save-stripe-token", {
    //   method: "POST",
    //   body: JSON.stringify(token),
    // }).then((response) => {
    //   response.json().then((data) => {
    //     alert(`We are in business, ${data.email}`);
    //   });
    // });
  };

  if (isRoomBooked) {
    // code of decreasing room count
    console.log("In axios room count ========================");
    console.log(match.params.roomCount);
    console.log(room.maxcount);
    const totalRooms = room.maxcount - match.params.roomCount;
    console.log(totalRooms);
    console.log(room._id);
    axios
      .put("http://localhost:4000/api/rooms/updateRoom/" + room._id, {
        totalRooms,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }