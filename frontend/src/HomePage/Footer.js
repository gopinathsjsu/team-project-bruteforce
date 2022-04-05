import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import {IoLogoFacebook} from'react-icons/io';
import{AiFillTwitterCircle,AiOutlineYoutube,AiOutlineInstagram} from 'react-icons/ai';
import {TiSocialLinkedinCircular} from 'react-icons/ti';
import MenuItem from "@material-ui/core/MenuItem"; 

const useStyles = makeStyles({
  align: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoWidth: {
    width: "30px",
    height: "30px",
  },
  sel: {
    border: "1px solid white",
    width: "100%",
    borderRadius: "8px",
    height: "44px",
    padding: "10px 25px",
    outline: "none",
    margin: "20px auto",
    color: "white !important",
  },
  whiteText: {
    color: "white",
  },
});

const Footer = () => {
  const classes = useStyles();
  return (
    <Div>
      <MainDiv>
        <Grid container className={classes.align}>
          <Grid item xs={12} md={6}>
            <span className={classes.whiteText}>
              Want to receive exclusive hotel offers? Subscribe to our newsletter!
            </span>
          </Grid>
          <Grid item container xs={12} md={6}>
            <Grid item xs={8} sm={10}>
              <Search type="text" placeholder="Email adress" />
            </Grid>
            <Grid item xs={4} sm={2}>
              <Click>Subscribe</Click>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.align}>
          <Grid item xs={12} md={9}>
            <span className={classes.whiteText}>
            Radisson N.V., Kesselstraße 5 – 7, 40221 Düsseldorf, Germany
            </span>
          </Grid>
          <Grid item xs={12} md={3}>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={"INDIA"}
              label="Country"
              className={classes.sel}
              style={{ fontSize: "14px", backgroundColor: "white" }}
            >
              <MenuItem value="INDIA">
                <em>INDIA</em>
              </MenuItem>
              <MenuItem value={"USA"}>USA</MenuItem>
              <MenuItem value={"GERMANY"}>GERMANY</MenuItem>
              <MenuItem value={"RUSSIA"}>RUSSIA</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Social>
            <IoLogoFacebook/>
            <AiFillTwitterCircle/>
            <AiOutlineInstagram />
            <AiOutlineYoutube/>
            <TiSocialLinkedinCircular />
        </Social>
        <Grid container>
          <Grid item sm={12} md={4}>
            <Bot1>
              <p>Company</p>
              <p>Jobs</p>
              <p>Press</p>
              <p>Investor Relation</p>
            </Bot1>
          </Grid>
          <Grid item sm={12} md={4}>
            <Bot1>
              <p>Mobile apps - searching on the go</p>
              <p>Radisson Business Studio</p>
            </Bot1>
          </Grid>
          <Grid item sm={12} md={4}>
            <Bot1>
              <p>Help</p>
              <p>Learn how Radisson works</p>
              <p>Terms and Conditions</p>
              <p>Legal Information</p>
              <p>Privacy Notice</p>
              <p>Site Map</p>
            </Bot1>
          </Grid>
        </Grid>

        <BotLogo>
          <h1>Radisson</h1>
          <p>Copyright 2021 Radisson | All rights reserved.</p>
        </BotLogo>
      </MainDiv>
    </Div>
  );
};

export default Footer;

const Div = styled.div`
  background-color: #0a1121;
  font-family: Proxima Vara,Arial,Helvetica,Sans,Sans-Serif;
`;
const Social = styled.div`
  display: flex;
  left: 0;
  * {
    width: 35px;
    height: 35px;
    margin: 15px 5px;
  }
`;
const MainDiv = styled.div`
  max-width: 1100px;
  margin: auto;
  padding: 30px;
  color: white !important;
`;
const Search = styled.input`
  width: 95%;
  height: 24px;
  border-radius: 8px;
  outline: none;
  padding: 10px;
  margin: 30px auto;
`;

const Click = styled.button`
  width: 98%;
  background-color: #697379;
  border-radius: 8px;
  height: 46px;
  margin: 30px auto;
  border: none;
  :hover {
    background-color: transparent;
  }
`;
const Bot1 = styled.div`
  padding: 25px;
  margin: auto;
  color: white !important;
  * {
    padding: 5px;
    font-size: 12px;
    color: white !important;
  }
  *:hover {
    text-decoration: underline;
  }
`;
const BotLogo = styled.div`
  text-align: center;
  color: white !important;
  p {
    padding: 10px 0 25px;
  }
`; 