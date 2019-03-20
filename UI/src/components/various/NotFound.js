import React from "react";
import { Image } from "react-bootstrap";

const NotFound = ({children}) => {
  return (<div>
      {children}
      <Image src={"https://media.giphy.com/media/6uGhT1O4sxpi8/giphy.gif"}/>
    </div>
  );
};

export default NotFound;
