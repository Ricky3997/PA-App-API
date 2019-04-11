import React from "react";
import { Image } from "react-bootstrap";
import { Select } from "antd";
const { Option } = Select;

const UniWithLogoSpan = ({name, logo, height, width}) => {
  return (
          <span>
            <Image src={logo}
                   style={{ maxHeight: height || "30px", maxWidth: width || "140px" }}
            />
          </span>
  );
};

export default UniWithLogoSpan;
