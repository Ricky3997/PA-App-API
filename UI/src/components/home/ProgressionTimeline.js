import React from "react";
import { Bookmark, Timeline } from "react-vertical-timeline";
import "react-vertical-timeline/style.css";

const ProgressionTimeline = (props) => {
    const activeModule = props.modules.filter(m => m.typeformID === props.activeId)[0];
    return (
        <Timeline height={550} progress={activeModule ? activeModule.progress : 0}>
            {props.modules.map(m =>
                <Bookmark key={m.typeformID} progress={m.progress} onSelect={() => props.changeSection(m)}>
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
