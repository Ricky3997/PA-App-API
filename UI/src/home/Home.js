import React from 'react';
import MentorHome from "./MentorHome";
import MenteeHome from "./MenteeHome";

const Home = (props) => {
    if(!props.user) return <div>Not Logged In</div>;
    else if(props.user.type === "mentor") return <MentorHome {...props} />
    else if(props.user.type === "mentee") return <MenteeHome {...props} />
    else return <div>Unrecognized user type</div>
};

export default Home;
