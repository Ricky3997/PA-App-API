import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs'

class ProgressChart extends Component {
    render() {
        return (
            <Doughnut options={{percentageInnerCutout : 70}} data={[
                {
                value: this.props.completed,
                color: "#d64f29",
                highlight: "#993F23",
                label: "Completed"
                }, {
                value: (this.props.missing),
                color: "#4f84bc",
                highlight: "#3A5E86",
                label: "Missing"
            }]}
            />
        );
    }
}

export default ProgressChart;
