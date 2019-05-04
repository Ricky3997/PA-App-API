import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import React from 'react';
import { Icon } from 'react-fa';

const StatusIcon = (props) => {
  if (props.status === 'notYetRequested') return <OverlayTrigger placement="bottom"
                                                                 overlay={<Tooltip placement="bottoom" className="in">Not
                                                                   Yet Requested</Tooltip>}>
    <Icon name={`fas fa-newspaper-o`} className='pa_blue_text'/>
  </OverlayTrigger>;
  else if (props.status === 'approved') return <OverlayTrigger placement="bottom" overlay={<Tooltip placement="bottoom"
                                                                                                    className="in">Approved</Tooltip>}>
    <Icon name={`fas fa-check-circle`} className='pa_green_text'/>
  </OverlayTrigger>;
  else if (props.status === 'requested') return <OverlayTrigger placement="bottom"
                                                                overlay={<Tooltip placement="bottoom" className="in">Pending
                                                                  Approval</Tooltip>}>
    <Icon name={`fas fa-hourglass`} className='pa_orange_dark_text'/>
  </OverlayTrigger>;
  else if (props.status === 'rejected') return <OverlayTrigger placement="bottom" overlay={<Tooltip placement="bottoom"
                                                                                                    className="in">Rejected {props.reason ? ` because: ${props.reason}` : ''}</Tooltip>}>
    <Icon name={`fas fa-ban`} className='pa_red_dark_text'/>
  </OverlayTrigger>;
  else return null;
};

export default StatusIcon;