import { Card } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import React from 'react';

const LoadingCard = () => {
  return <Card className="text-center">
    <Card.Header>
      < ReactLoading type={"spin"} className='pa_orange_text'/>
    </Card.Header>
    <Card.Body>
      < ReactLoading type={"bars"} className='pa_orange_text'/>
    </Card.Body>
  </Card>;
};

export default LoadingCard;