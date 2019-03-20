import React from "react";
import countries from "svg-country-flags/countries";

const CountryFlag = ({ country }) => {

  let flagIndex = "";
  Object.entries(countries).forEach((a) => {
    if (country === a[1]) flagIndex = a[0];
  });
  const flag = require(`svg-country-flags/svg/${flagIndex.toLowerCase()}.svg`);
  return (<img alt={country}
               width="15px" src={flag}/>
  );
};

export default CountryFlag;
