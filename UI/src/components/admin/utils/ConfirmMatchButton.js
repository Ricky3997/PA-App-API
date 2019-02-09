import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";

class ConfirmMatchButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            confirm: false
        }
    }

    confirmMatch(){
        alert("Will build matching!")
    }

    render() {
        return (
            <div>
                {this.state.confirm ?
                    <Row>
                        <Col>
                            <Button block variant="danger" onClick={() => this.setState({confirm: false})}>Cancel</Button>
                        </Col>
                        <Col>
                            <Button block variant="success" onClick={this.confirmMatch}>Confirm</Button>
                        </Col>
                    </Row>
                : <Button block onClick={() => this.setState({confirm: true})}>Match as Mentor</Button>}
            </div>
        );
    }
};

export default ConfirmMatchButton;
