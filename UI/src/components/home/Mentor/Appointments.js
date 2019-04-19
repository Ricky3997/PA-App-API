import React from 'react';
import { Button, Card, CardColumns, CardDeck, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import EventHappening from './EventHappening';
import moment from 'moment';
import { Icon } from 'react-fa';
import AppointmentCard from './AppointmentCard';

const Appointments = ({}) => {
  return (
    <div>
      <h5>
        Your next scheduled calls 📆
      </h5>
      <CardDeck>
        <AppointmentCard
          mentee={'Nicole'}
          purpose={'Personal Statement draft revision'}
          date={moment("08-10-2019-17-00", "DD-MM-YYYY-hh-mm").format('dddd DD MMM hh:mm A')}/>
        <AppointmentCard
          mentee={'John'}
          purpose={'Student loan application'}
          date={moment("08-10-2019-19-00", "DD-MM-YYYY-hh-mm").format('dddd DD MMM hh:mm A')}/>
      </CardDeck>
    </div>
  );
};

export default Appointments;
