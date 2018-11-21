import React from 'react';
import {Timeline, Bookmark} from 'react-vertical-timeline'
import 'react-vertical-timeline/style.css'

const ProgressionTimeline = (props) => {
    return (
        <Timeline height={600} progress={props.progress} onSelect={props.changeSection}>
            {props.milestones.map(m =>
                <Bookmark key={m.id} progress={m.progress} onSelect={() => props.changeSection(m)}>
                    <div style={{cursor: 'pointer'}}>
                        <i>
                            {m.date}
                        </i>
                        <br/>
                        <b>
                        {m.title}
                        </b>
                    </div>
                </Bookmark>)}
        </Timeline>
    );
};

export default ProgressionTimeline;
