import React from 'react';
import { scaleLinear } from 'd3-scale';
import { HeatmapSeries, LabelSeries, XAxis, XYPlot, YAxis } from 'react-vis';
import * as _ from 'lodash';
import defaults from '../../../defaults/defaults';
import UniversityPicker from '../../various/forms/UniversityPicker';
import { Field, Form as FormikForm, Formik } from 'formik';
import { Button, Col, Row } from 'react-bootstrap';
import CoursePicker from '../../various/forms/CoursePicker';

const DataVisHeatMap = ({ mentors, mentees }) => {


  //TODO LOGOS ON AXES
  //TODO COLOR SCALE

  const initialVals = {
    universities: [...defaults.universities.UK, ...defaults.universities.US].map(u => u.name),
    courses: _.uniq([...mentors.map(m => m.subject), ...mentees.flatMap(m => m.coursesApplyingFor)])
  };


  return <span><Formik
    initialValues={initialVals}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
    }}
    render={({ values, touched, errors, isSubmitting, setFieldValue }) => {

      let xDomain, yDomain, data;

      xDomain = values.universities;
      yDomain = values.courses.sort((a, b) => b.localeCompare(a));
      data = values.universities.reduce((acc, uni) => {
        return acc.concat(
          values.courses.map((course) => {
            const mentorsAtUniStudyingArea = mentors.filter(m => {
              return m.university === uni && m.subject === course;
            }).length;

            const menteesInterestedInSubjectAtUni = mentees.filter(m => {
              return _.some(m.unisApplyingFor, u => u === uni) && _.some(m.coursesApplyingFor, s => s === course);
            }).length;

            return {
              x: uni,
              y: course,
              mentees: menteesInterestedInSubjectAtUni, //Math.floor(Math.random() * 100),
              mentors: mentorsAtUniStudyingArea //Math.floor(Math.random() * 100),
            };
          })
        );
      }, []);

      const { min, max } = data.reduce(
        (acc, row) => ({
          min: Math.min(acc.min, row.mentees - row.mentors),
          max: Math.max(acc.max, row.mentees - row.mentors)
        }),
        { min: Infinity, max: -Infinity }
      );


      const exampleColorScale = scaleLinear()
        .domain([max, 0, min])
        .range(["#e61c24",
          "#ffe97c",
          "#289b00"
        ]);


      return <FormikForm>

        <div>
          <Row>
            <Col md={6}>
              <h3>Ratio of mentees/mentors</h3>
            </Col>
            <Col md={{ offset: 5, span: 1 }}>
              <Button variant={"light"} block
                      onClick={() => Object.keys(initialVals).forEach(a => setFieldValue(a, initialVals[a]))}>Reset</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Field name="universities" render={({ field, form: { touched, errors } }) =>
                <UniversityPicker overrideLabel={"Filter by campus"} multiple
                                  setFieldValue={setFieldValue} field={field} touched={touched} errors={errors}/>}
              />
              <Field name="courses" render={({ field, form: { touched, errors } }) =>
                <CoursePicker multiple setFieldValue={setFieldValue} field={field} touched={touched} errors={errors}/>}
              />
              <div style={{ marginTop: "-100px", marginLeft: "-40px" }}>
                <XYPlot
                  xType="ordinal"
                  xDomain={xDomain}
                  yType="ordinal"
                  yDomain={yDomain}
                  margin={160}
                  width={1500}
                  height={_.uniq(_.map(data, u => u.y)).length * 70 < 500 ? 500 : _.uniq(_.map(data, u => u.y)).length * 70}>
                  <XAxis orientation="top"/>
                  <YAxis tickLabelAngle={-60}/>
                  <HeatmapSeries
                    colorType="literal"
                    getColor={d => exampleColorScale(d.mentees - d.mentors)}
                    style={{
                      textSize: "8px",
                      stroke: "white",
                      strokeWidth: "2px",
                      rectStyle: {
                        rx: 10,
                        ry: 10
                      }
                    }}
                    className="heatmap-series-example"
                    data={data}
                  />
                  <LabelSeries
                    animation
                    data={data}
                    labelAnchorX="middle"
                    labelAnchorY="baseline"
                    getLabel={d => `${d.mentees}/${d.mentors}`}
                  />
                </XYPlot>
              </div>
            </Col>
          </Row>
        </div>
      </FormikForm>;
    }
    }/>;
  </span>;
};


export default DataVisHeatMap;
