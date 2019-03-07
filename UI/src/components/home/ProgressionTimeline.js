import React from "react";
import { Bookmark, Timeline } from "react-vertical-timeline";
import "react-vertical-timeline/style.css";

const ProgressionTimeline = (props) => {
    return  props.modules.length > 0 ? (
        <Timeline height={550} progress={props.modules.filter(m => m.id === props.active)[0].progress} onSelect={props.changeSection}>
            {props.modules.map(m =>
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
    ) : null;
};

export default ProgressionTimeline;
