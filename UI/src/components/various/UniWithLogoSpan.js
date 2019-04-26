import React from 'react';
import { Image } from 'react-bootstrap';

const UniWithLogoSpan = ({ name, logo, height, width }) => {
  return (
    <span>
      <Image src={logo} style={{ maxHeight: height || "30px", maxWidth: width || "140px" }}/>
    </span>
  );
};

export default UniWithLogoSpan;
