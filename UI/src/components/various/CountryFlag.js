import React from 'react';
import countries from 'svg-country-flags/countries';
import * as _ from 'lodash';

const CountryFlag = ({ country, width }) => {

  let flagIndex = "";
  Object.entries(countries).forEach((a) => {
    if (country === a[1]) flagIndex = a[0];
  });
  let flag;
  if(_.includes(Object.keys(countries), flagIndex)) flag = require(`svg-country-flags/svg/${flagIndex.toLowerCase()}.svg`);
  else flag="https://library.kissclipart.com/20180901/kbw/kissclipart-flag-icon-png-clipart-computer-icons-clip-art-8b029547f4b0f4c2.png";
  return (<img alt={country}
               width={width || "15px"} src={flag}/>
  );
};

export default CountryFlag;
