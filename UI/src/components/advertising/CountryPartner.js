import React from "react";
import { Image } from "react-bootstrap";

const CountryPartner = ({ country, index }) => {
  const partnerList = [{
    name: "McKinsey & Co.",
    logo: "https://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/lg/public/2014/05/28/mckinsey-logo.png"
  }, {
    name: "BCG",
    logo: "http://logolist.ru/uploads/posts/2016-05/0_bcg_logo.jpg"
  }, {
    name: "Prowler",
    logo: "https://www.prowler.io/ASSETS/press/images/prowler-primary-logo-lbg.svg"
  }, {
    name: "P&G",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Procter_and_Gamble_Logo.svg"
  }];

  const shortenCountry = (country) => {
    if (country === "United Kingdom") return "UK";
    else return country;
  };

  return <div>
    <h5>{partnerList[index].name} is Project Access{country ? ` ${shortenCountry(country)}'s ` : `'`} talent partner. A
      huge thank you to them for making our work possible</h5>
    <Image
      src={partnerList[index].logo}
      style={{ maxWidth: "300px", maxHeight: "150px" }}/>
  </div>;
};

export default CountryPartner;
