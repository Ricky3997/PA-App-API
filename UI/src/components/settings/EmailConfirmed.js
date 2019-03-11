import React from "react";
import { Icon } from "react-fa";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const EmailConfirmed = (props) => {
  return <span style={{ color: props.user.emailConfirmed ? "green" : "red", fontSize: "18px" }}>
                <Icon name="fas fa-envelope"/>
    {props.user.emailConfirmed ? " Email Confirmed" : " Email Not Confirmed"}
    {props.user.emailConfirmed ? null :
      <Button variant={"link"} style={{ marginLeft: "10px" }} onClick={() =>  props.sendEmailConfirmationAgain(props.user._id).then(r => {
        if(r.success) toast.success("Confirmation resent, check your email!")
        else toast.error('There has been a problem')
      })}>
        Send confirmation email again
      </Button>}
  </span>;
};

export default EmailConfirmed;
