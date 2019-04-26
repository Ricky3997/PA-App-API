import React from 'react';
import { Icon } from 'react-fa';

const RecommendationTransparency = ({ criteriaMatched }) => {
  return Object.keys(criteriaMatched).map(c => {
    return <p key={c} style={{ color: criteriaMatched[c] ? "green" : "red" }}>
      {c} <Icon name={`fas fa-${criteriaMatched[c] ? "check" : "times-circle"}`}/>
    </p>;
  });

};


export default RecommendationTransparency;
