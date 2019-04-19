import React from 'react';
import { CardDeck, Col, Row } from 'react-bootstrap';
import { Icon } from 'react-fa';
import FeatureNotReadyYetOnHover from '../various/FeatureNotReadyYetOnHover';
import JobCard from './JobCard';

const Jobs = ({ user }) => {
  return <div>
    <Row>
      <Col>
        <FeatureNotReadyYetOnHover>
          <h2>Project Access... to Cool Internships and Jobs <Icon name={'fas fa-briefcase'}/></h2>
        </FeatureNotReadyYetOnHover>
        <p>
          There are exclusive opportunities for Project Access mentors, uniquely tailored to your profile.
          <br/>
          Because you know, {user.firstName}, a lot of companies would want to work with you, but these ones really believe in our mission at Project Access!

        </p>
        <CardDeck>
          <JobCard
            title={'Summer BA Intern'}
            field={'Consulting'}
            skills={'Teamwork, Problem Solving'}
            dates={'June to August 2019'}
            link={'https://www.mckinsey.com/pt/sitecore/content/mckinsey/home/careers/search-jobs/jobs/business-analyst-intern-0003'}
            coverUrl={'http://intaadvising.gatech.edu/wp-content/uploads/2016/07/McKinsey__Company_logo.png'}
          />

          <JobCard
            title={'Off-cycle Analyst'}
            field={'Investment Banking'}
            skills={'Data analysis, Sales'}
            dates={'June to October 2019'}
            link={'https://www.liontree.com'}
            coverUrl={'https://www.liontree.com/-/media/Project/LionTree/liontree_splash_logo.ashx?h=140&la=en&w=450&hash=E735E993A4C0C9EEA7B3C995B619FD7FAC915B19'}
          />

          <JobCard
            title={'BD  Intern'}
            field={'Business Development'}
            skills={'Communication, Negotiation'}
            dates={'June to August 2019'}
            link={'https://careers.google.com/students/'}
            coverUrl={'http://www.google.com/logos/doodles/2015/googles-new-logo-5078286822539264.3-hp2x.gif'}
          />

          <JobCard
            title={'Summer Consultant'}
            field={'Consulting'}
            skills={'Teamwork, Problem Solving'}
            dates={'June to August 2019'}
            link={'https://talent.bcg.com/apply/FolderDetail/Internship-Application/10013667'}
            coverUrl={'https://www.rarerecruitment.co.uk/foundations/consulting/images/banner-bcg.jpg'}
          />

        </CardDeck>
      </Col>
    </Row>
  </div>;
};

export default Jobs;
