import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";
import {ReactTypeformEmbed} from "react-typeform-embed";
import AgoraRTC from 'agora-rtc-sdk'


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
            displayMode: 'pip',
            readyState: false,
            mode: "video"
        };

    }

    // https://github.com/AgoraIO-Community/OpenAgoraWeb-React/blob/master/src/components/AgoraVideoCall/index.jsx

    componentWillMount() {
        this.client = AgoraRTC.createClient({mode: 'live', codec: "h264"});
        this.client.init(this.appId, () => {
            console.log("AgoraRTC client initialized");
            this.subscribeStreamEvents();
            this.client.join(this.appId, this.channel, this.uid, (uid) => {
                console.log("User " + uid + " join channel successfully");

                this.localStream = AgoraRTC.createStream({streamID: uid, audio: true, video: true, screen: false});
                this.localStream.init(() => {
                        this.client.publish(this.localStream, err => console.log("Publish local stream error: " + err));
                        this.localStream.play("local-canvas");
                        this.setState({readyState: true})
                    },
                    err => {
                        console.log("getUserMedia failed", err);
                        this.setState({readyState: true})
                    })
            })
        })
    }

    componentWillUnmount () {
        this.client && this.client.unpublish(this.localStream);
        this.localStream && this.localStream.close();
        this.client && this.client.leave(() => console.log('Client succeed to leave.'), () => console.log('Client failed to leave.'))
    }


    subscribeStreamEvents() {
        this.client.on('stream-added', (evt) => {
            let stream = evt.stream;
            console.log("New stream added: " + stream.getId());
            console.log('At ' + new Date().toLocaleTimeString());
            console.log("Subscribe ", stream);
            this.client.subscribe(stream, (err) => console.log("Subscribe stream failed", err));
        });

        this.client.on('stream-subscribed', (evt) => {
            let stream = evt.stream;
            console.log("Got stream-subscribed event");
            console.log(new Date().toLocaleTimeString());
            console.log("Subscribe remote stream successfully: " + stream.getId());
            console.log(evt);
            this.remoteStream = stream;
            this.remoteStream.play("remote-canvas");
        });

        this.client.on("stream-removed", (evt) => {
            let stream = evt.stream;
            console.log("Stream removed: " + stream.getId());
            console.log(new Date().toLocaleTimeString());
            console.log(evt);
            this.removeStream();
        });

        this.client.on('peer-leave', (evt) => {
            console.log("Peer has left: " + evt.uid);
            console.log(new Date().toLocaleTimeString());
            console.log(evt);
            this.removeStream();
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


    render() {
        const typeformID = "MDHUre";

        return (
            <Row>
                <Col md={8}>
                    <div id="remote-canvas" style={{height: "600px"}}>
                        <div id="local-canvas" style={{position: "absolute", right: "0", bottom: "0", height: "130px", width: "130px", "z-index": "2"}}/>
                    </div>
                </Col>
                <Col md={4} style={{backdropColor: "red"}}>
                    {/*<Row>*/}
                        {/*{this.props.user ?*/}
                            {/*<ReactTypeformEmbed*/}
                                {/*url={`https://projectaccess.typeform.com/to/${typeformID}?` +*/}
                                {/*`mentorfirstname=${this.props.user.firstName}` +*/}
                                {/*`&uniqueid=${1532907125}&` +*/}
                                {/*`mentoremail=${this.props.user.emailAddress}&` +*/}
                                {/*`menteefirstname=${"Emil"}`}*/}
                                {/*style={{"minHeight": "600px"}}/> : null}*/}
                    {/*</Row>*/}
                </Col>


            </Row>
        );
    }
}

export default Call;
