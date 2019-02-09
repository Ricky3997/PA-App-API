import React from "react";
import { Image } from "react-bootstrap";
import { Icon } from "react-fa";

const Footer = (props) => {
  return props.pictureUrl ?
    <Image roundedCircle alt="Profile avatar" src={props.pictureUrl}
           style={{
             border: props.mentorMode ? "green 3px solid" : "blue 2px solid",
             marginLeft: props.shiftLeft ? "-15px" : null, width: props.size === "m" ? "50px" : "30px" }}/> :
    <Icon name="fal fa-user" size={props.size === "m" ? "3x" : "1x"} />;
};

export default Footer;
