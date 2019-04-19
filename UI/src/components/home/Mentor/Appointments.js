import React from 'react';
import { CardDeck } from 'react-bootstrap';
import moment from 'moment';
import * as _  from 'lodash';
import AppointmentCard from './AppointmentCard';

const Appointments = ({mentees}) => {
  return (
    <div>
      <h5>
        Your next scheduled calls 📆
      </h5>
      <CardDeck>
        <AppointmentCard
          mentee={_.sample(mentees)}
          purpose={'Personal Statement draft revision'}
          date={moment("08-10-2019-17-00", "DD-MM-YYYY-hh-mm").format('dddd DD MMM hh:mm A')}/>
        <AppointmentCard
          mentee={_.sample(mentees)}
          purpose={'Student loan application'}
          date={moment("08-10-2019-19-00", "DD-MM-YYYY-hh-mm").format('dddd DD MMM hh:mm A')}/>
      </CardDeck>
    </div>
  );
};

export default Appointments;
