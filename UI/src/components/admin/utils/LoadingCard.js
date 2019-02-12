import { Card } from "react-bootstrap";
import ReactLoading from "react-loading";
import React from "react";

const LoadingCard = (props) => {
  return <Card className="text-center">
    <Card.Header>
      < ReactLoading type={"spin"} color={"#ff9430"}/>
    </Card.Header>
    <Card.Body>
      <Card.Text>
        < ReactLoading type={"bars"} color={"#ff9430"}/>
      </Card.Text>
    </Card.Body>
  </Card>
}

export default LoadingCard;