// import { Offer1 } from "./offers/Offer1";
import styled from "styled-components";
import { Filters } from "./Filters/Filters";
import { HotelInfo } from "./HotelInfo/HotelInfo";
import { TopFilterBar } from "./Filters/TopFilterBar";
import { FooterTwo } from "./FooterTwo";
import { COVID } from "./COVID.js";
// import { Navbar2 } from "../Components/Navbar2/Navbar2";
// import { hotels } from "./db";
import { hotels } from "../HomePage/HotelDetail/db";
import { useState, useEffect } from "react";
import { Search } from "./Search";
// import NavbarSticky from "./Home/NavbarSticky";

const MainDiv = styled.div`
  display: flex;
  width: 100%;
`;
const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2%;
  width: 25%;
  position: sticky;
  position: -webkit-sticky;
`;
const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 74%;
  padding: 2%;
`;

const Div = styled.div`
  & header > img {
    padding: 20px;
  }
`;
const checkboxesList = [
  'New Jersey',
  'Maryland',
  'Connecticut',
  'Florida',
  'Massachussets',
];
const getDefaultCheckboxes = () =>
  checkboxesList.map(checkbox => ({
    name: checkbox,
    checked: false,
  }));

export const HotelOptions = () => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const data = hotels;
    // console.log(hotels.hotel);
    setCardData(data.hotel);
  }, []);
  return (
    <div style={{ position: "realtive" }}>
      <Div
        style={{
          position: "fixed",
          zIndex: "999999999",
          backgroundColor: "#fff",
          width: "100%",
          height: "70px",
        }}
      >
        <div
          style={{
            height: "50px",
            width: "100%",
            marginTop: "-30px",
            backgroundColor: "white",
          }}
        >
          <Search />
        </div>

        {/* <Navbar2 /> */}
        {/* <NavbarSticky /> */}
      </Div>
      <div style={{ position: "absolute", marginTop: "75px" }}>
        <COVID />
        <MainDiv>
          <LeftDiv>
            <Filters />
          </LeftDiv>
          <RightDiv>
            <TopFilterBar />
            {/* <Offer1 /> */}
            hello
            {cardData.map((e) => {
              return <HotelInfo key={e.id} data={e} />;
            })}
          </RightDiv>
        </MainDiv>
        {/* <FooterTwo /> */}
      </div>
    </div>
  );
};
