import React from "react";
import { Image } from "react-bootstrap";
import { Icon } from "react-fa";

const Footer = (props) => {
  let size;
  if(props.size === "m") size = "50px";
  else if(props.size === "l") size = "75px";
  else size = "30px";

  return props.pictureUrl ?
    <Image roundedCircle alt="Profile avatar" src={props.pictureUrl}
           style={{
             border: props.mentorMode ? "green 3px solid" : "blue 2px solid",
             marginLeft: props.shiftLeft ? "-15px" : null, width: size }}/> :
    <Icon name="fal fa-user" size={props.size === "m" ? "3x" : "lg"} />;
};

export default Footer;
