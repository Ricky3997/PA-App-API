import React from "react";
import { Image } from "react-bootstrap";

const   CountryPartner = ({ country, index }) => {
  const partnerList = [{
    name: "McKinsey & Co.",
    logo: "https://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/lg/public/2014/05/28/mckinsey-logo.png"
  }, {
    name: "BCG",
    logo: "http://logolist.ru/uploads/posts/2016-05/0_bcg_logo.jpg"
  }, {
    name: "Prowler",
    logo: "https://www.signspecialist.com/decals/custom/images/Prowler-logo.jpg"
  }];
  return <div>
    <h5>A big thank you to our main partner that makes all of this possible </h5>
    <Image
      src={partnerList[index].logo}
      style={{ maxWidth: "300px", maxHeight: "150px" }}/>
  </div>;
};

export default CountryPartner;
