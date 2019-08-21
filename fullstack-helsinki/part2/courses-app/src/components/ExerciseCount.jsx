import React from "react";

const ExerciseCount = props => {
  console.log("in ex count", props);

  const calcTotal = props.parts.reduce((accum, el) => {
    return el.exercises + accum;
  }, 0);

  return <b>total of {calcTotal} exercises</b>;
};

export default ExerciseCount;
