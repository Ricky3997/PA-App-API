import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";
import {ReactTypeformEmbed} from "react-typeform-embed";
import AgoraRTC from 'agora-rtc-sdk'
import Button from "react-bootstrap/es/Button";


class Call extends Component {
    constructor(props) {
        super(props);
        this.client = {};
        this.localStream = {};
        this.remoteStream = {};
        this.appId = 'e4fd139061fa4bf3886c4a3e8d04874b';
        this.channel = "test"; //TODO
        this.uid = "087gnv6ubfdg3nebf"; //TODO
        this.state = {
            joinCall: false
        };
        this.toggleMic = this.toggleMic.bind(this);
        this.toggleVideo = this.toggleVideo.bind(this);
        this.hangup = this.hangup.bind(this);
        this.startCall = this.startCall.bind(this);

    }

    //TODO https://github.com/AgoraIO-Community/OpenAgoraWeb-React/blob/master/src/components/AgoraVideoCall/index.jsx


    componentWillMount() {
        this.client = AgoraRTC.createClient({mode: 'live', codec: "h264"});
    }

    componentWillUnmount () {
        this.client && this.client.unpublish(this.localStream);
        this.localStream && this.localStream.close();
        this.client && this.client.leave(() => console.log('Client succeed to leave.'), () => console.log('Client failed to leave.'))
    }

    subscribeStreamEvents() {
        this.client.on('stream-added', (evt) => {
            this.client.subscribe(evt.stream, Call.logError);
        });

        this.client.on('stream-subscribed', (evt) => {
            this.remoteStream =  evt.stream;
            this.remoteStream.play("remote-canvas");
        });

        this.client.on("stream-removed", (evt) => {
            this.removeStream(evt.stream);
        });

        this.client.on('peer-leave', (evt) => {
            this.removeStream(evt.stream);
        });

        this.client.on("stream-published", (evt) => console.log("Publish local stream successful"));
    }

    removeStream(){
        this.remoteStream = null;
        const canvas = document.getElementById("remote-canvas");
        while (canvas.firstChild) {
            canvas.removeChild(canvas.firstChild);
        }
    }

    static logError = (err) => console.log(err);

    toggleMic(){
        this.localStream.isAudioOn() ? this.localStream.disableAudio() : this.localStream.enableAudio()
    }

    toggleVideo(){
        this.localStream.isVideoOn() ? this.localStream.disableVideo() : this.localStream.enableVideo()
    }

    hangup(){
        try {
            this.setState({joinCall: false})
            this.client && this.client.unpublish(this.localStream);
            this.localStream && this.localStream.close();
            this.client && this.client.leave(() => console.log('Client succeed to leave.'), () => console.log('Client failed to leave.'))
        }
        finally {
            this.client = {};
            this.localStream = {}
        }
    }

    startCall(){
        this.setState({joinCall: true});
        this.client.init(this.appId, () => {
            this.subscribeStreamEvents();
            this.client.join(this.appId, this.channel, this.uid, (uid) => {
                console.log("User " + uid + " join channel successfully");

                this.localStream = AgoraRTC.createStream({streamID: uid, audio: true, video: true, screen: false});
                this.localStream.init(() => {
                        this.client.publish(this.localStream, Call.logError);
                        this.localStream.play("local-canvas");
                    }, Call.logError
                )
            })
        })
    }


    render() {
        const typeformID = "MDHUre";

        return (
            <Row>
                <Col md={8}>

                    {this.state.joinCall ?
                    <div>
                        <div id="remote-canvas" style={{height: "600px"}}>
                            <div id="local-canvas" style={{position: "absolute", right: "0", bottom: "0", height: "130px", width: "130px", "z-index": "2"}}/>
                        </div>
                        <Button onClick={this.toggleMic}>Mic</Button>
                        <Button onClick={this.toggleVideo}>Video</Button>
                        <Button onClick={this.hangup}>Hangup</Button>
                    </div> : <div>
                            <Button onClick={this.startCall}>Join Call</Button>
                        </div>}


                </Col>
                <Col md={4} style={{backdropColor: "red"}}>
                    <Row>
                        {this.props.user ?
                            <ReactTypeformEmbed
                                url={`https://projectaccess.typeform.com/to/${typeformID}?` +
                                `mentorfirstname=${this.props.user.firstName}` +
                                `&uniqueid=${1532907125}&` +
                                `mentoremail=${this.props.user.email}&` +
                                `menteefirstname=${"Emil"}`}
                                style={{"minHeight": "600px"}}/> : null}
                    </Row>
                </Col>


            </Row>
        );
    }
}

export default Call;
