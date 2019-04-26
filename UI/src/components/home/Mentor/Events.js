import React from 'react';
import { CardColumns } from 'react-bootstrap';
import EventHappening from './EventHappening';
import moment from 'moment';

const Events = ({uni}) => {
  return (
    <div>
      <h5>
        Events happening at {uni} 📍
      </h5>
      <CardColumns>
        <EventHappening
          id={'akjhb355'}
          title={'Mentor Social'}
          date={moment("08-10-2019-18-00", "DD-MM-YYYY-hh-mm").format('dddd DD MMM hh:mm A')}
          description={'Come along to our first social of the year where you can meet all other PA mentors'}
          coverUrl={'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1985&q=80'}/>
        <EventHappening
          id={'akjhb34555'}
          title={'CV Training'}
          date={moment("14-10-2019-18-00", "DD-MM-YYYY-hh-mm").format('dddd DD MMM hh:mm A')}
          description={'About to apply for internships? We\'ll be running a CV training session to..'}
          coverUrl={'https://images.unsplash.com/photo-1485322551133-3a4c27a9d925?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'}/>
        <EventHappening
          id={'akjhb35335'}
          title={'Scholarship advice'}
          date={moment("23-10-2019-18-00", "DD-MM-YYYY-hh-mm").format('dddd DD MMM hh:mm A')}
          description={'Is your mentee asking about scholarships and you want to find out how best to help? Come find out more'}
          coverUrl={'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80'}/>
      </CardColumns>
    </div>
  );
};

export default Events;
