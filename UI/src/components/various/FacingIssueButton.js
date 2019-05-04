import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Icon } from 'react-fa';

const FacingIssueButton = () => {
  return (
    <OverlayTrigger placement="bottom" trigger="hover"
                    overlay={<Tooltip placement="bottom" className="i n">We are always here to help, do not wait regardless of what issue you have! Tell us, and we'll fix it! 🤗</Tooltip>}>
      <Button variant={"danger"} onClick={() => window.open("mailto:help@projectaccess.org", "_blank")}>
        <Icon name="fas fa-ticket"/> Issues?
      </Button>
    </OverlayTrigger>
  );
};

export default FacingIssueButton;
