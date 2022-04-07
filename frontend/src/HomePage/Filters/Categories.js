import Checkbox from "@mui/material/Checkbox";
import styled from "styled-components";

const Div = styled.div`
  display: flex;

  & > p {
    margin-top: 4%;
  }
  & span {
    color: darkgray;
  }
`;

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const Categories = () => {
  return (
    <>
      <p>Categories</p>
      <Div>
        <div>
          <Checkbox {...label} />
        </div>

        <p>
          All -<span>Super affordable stays with essential amenities</span>
        </p>
      </Div>
      <Div>
        <div>
          <Checkbox {...label} />
        </div>
        <p>
          Hotel -<span>Your friendly, premium neighbouhood hotel</span>
        </p>
      </Div>
      <Div>
        <div>
          <Checkbox {...label} />
        </div>
        <p>
          House/Apartment -<span>Affordable hotels at Premium locations </span>
        </p>
      </Div>
    </>
  );
};
