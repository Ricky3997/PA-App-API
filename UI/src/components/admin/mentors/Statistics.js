import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { scaleLinear } from "d3-scale";
import {
  HeatmapSeries,
  Highlight,
  HorizontalGridLines,
  LabelSeries,
  LineSeries,
  MarkSeries,
  VerticalGridLines,
  VerticalRectSeries,
  XAxis,
  XYPlot,
  YAxis
} from "react-vis";

class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            selectionStart: null,
            selectionEnd: null
        };
        this.API_URL = "https://nataliia-radina.github.io/react-vis-example/";
        this.DATA = [
            {x0: 0, x: 1, y: 1},
            {x0: 1, x: 2, y: 2},
            {x0: 2, x: 3, y: 10},
            {x0: 3, x: 4, y: 6},
            {x0: 4, x: 5, y: 5},
            {x0: 5, x: 6, y: 3},
            {x0: 6, x: 7, y: 1}
        ];
    }

    componentDidMount() {
        fetch(this.API_URL)
            .then(response => {
                if (response.ok) {
                    return  response.json()
                }
                else {
                    throw new Error ('something went wrong')
                }
            })
            .then(response => this.setState({
                    results: response.results.filter((r)=>{
                        return r.name === 'JavaScript';
                    })
                })
            )}



    render() {
        const {selectionStart, selectionEnd} = this.state;
        const updateDragState = area =>
            this.setState({
                selectionStart: area && area.left,
                selectionEnd: area && area.right
            });

        const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        const data = alphabet.reduce((acc, letter1, idx) => {
            return acc.concat(
                alphabet.map((letter2, jdx) => ({
                    x: `${letter1}1`,
                    y: `${letter2}2`,
                    color: (idx + jdx) % Math.floor(jdx / idx) || idx
                }))
            );
        }, []);
        const {min, max} = data.reduce(
            (acc, row) => ({
                min: Math.min(acc.min, row.color),
                max: Math.max(acc.max, row.color)
            }),
            {min: Infinity, max: -Infinity}
        );
        const exampleColorScale = scaleLinear()
            .domain([min, (min + max) / 2, max])
            .range(['orange', 'white', 'cyan']);

        return (
            <Container fluid>
                <Row>
                    <Col>
                        <XYPlot
                            xType="ordinal"
                            width={500}
                            height={300}>
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <XAxis title="Year" />
                            <YAxis title="Mentors" />
                            <LineSeries
                                data={this.state.results.map((d)=> {
                                    return {x: d.year.substring(2),
                                        y: parseFloat(d.count/1000)}
                                })}
                                style={{stroke: 'violet', strokeWidth: 3}}/>
                        </XYPlot>
                    </Col>
                    <Col>
                        <XYPlot width={300} height={300}>
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <XAxis />
                            <YAxis />
                            <MarkSeries
                                className="mark-series-example"
                                strokeWidth={2}
                                opacity="0.8"
                                sizeRange={[5, 15]}
                                data={[
                                    {x: 1, y: 10, size: 30},
                                    {x: 1.7, y: 12, size: 10},
                                    {x: 2, y: 5, size: 1},
                                    {x: 3, y: 15, size: 12},
                                    {x: 2.5, y: 7, size: 4}
                                ]}
                            />
                        </XYPlot>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <XYPlot width={500} height={300}>
                            <XAxis />
                            <YAxis />
                            <VerticalRectSeries
                                data={this.DATA}
                                stroke="white"
                                colorType="literal"
                                getColor={d => {
                                    if (selectionStart === null || selectionEnd === null) {
                                        return '#1E96BE';
                                    }
                                    const inX = d.x >= selectionStart && d.x <= selectionEnd;
                                    const inX0 = d.x0 >= selectionStart && d.x0 <= selectionEnd;
                                    const inStart = selectionStart >= d.x0 && selectionStart <= d.x;
                                    const inEnd = selectionEnd >= d.x0 && selectionEnd <= d.x;

                                    return inStart || inEnd || inX || inX0 ? '#12939A' : '#1E96BE';
                                }}
                            />

                            <Highlight
                                color="#829AE3"
                                drag
                                enableY={false}
                                onDrag={updateDragState}
                                onDragEnd={updateDragState}
                            />
                        </XYPlot>

                        <div>
                            <b>selectionStart:</b> {`${Math.floor(selectionStart * 100) / 100},`}
                            <b>selectionEnd:</b> {`${Math.floor(selectionEnd * 100) / 100},`}
                        </div>
                    </Col>
                    <Col>
                        <XYPlot
                            xType="ordinal"
                            xDomain={alphabet.map(letter => `${letter}1`)}
                            yType="ordinal"
                            yDomain={alphabet.map(letter => `${letter}2`).reverse()}
                            margin={50}
                            width={500}
                            height={500}
                        >
                            <XAxis orientation="top" />
                            <YAxis />
                            <HeatmapSeries
                                colorType="literal"
                                getColor={d => exampleColorScale(d.color)}
                                style={{
                                    stroke: 'white',
                                    strokeWidth: '2px',
                                    rectStyle: {
                                        rx: 10,
                                        ry: 10
                                    }
                                }}
                                className="heatmap-series-example"
                                data={data}
                            />
                            <LabelSeries
                                data={data}
                                labelAnchorX="middle"
                                labelAnchorY="baseline"
                                getLabel={d => `${d.color}`}
                            />
                        </XYPlot>
                    </Col>
                </Row>
            </Container>
        );
    }

};


export default Statistics;
