const handlePrice = async () => {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      guestCount,
      totalAmount: totalAmount + amenitiesAmount,
      totaldays: totalDays,
      remainingAmount: room.rentperday,
      extracostapplied: "",
      offerapplied: "",
    };

    axios
      .post("http://localhost:4000/api/bookings/getprice", bookingDetails)
      .then((result) => {
        console.log(result);

        var newRoomCost = 0;
        if (guestCount > 2) {
          newRoomCost = result.data.totalAmount + (guestCount - 2) * 15;
          if (roomCount > 1) {
            newRoomCost = newRoomCost * roomCount;
          }
        } else {
          newRoomCost = result.data.totalAmount;
          if (roomCount > 1) {
            newRoomCost = newRoomCost * roomCount;
          }
        }

        setnewtotal(newRoomCost);
        setnewOffer(result.data.offerapplied);
        setExtra(result.data.extracostapplied);
        setDisplay(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };