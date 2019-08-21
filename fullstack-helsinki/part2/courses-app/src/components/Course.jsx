import React from "react";
import Header from "./Header";
import Content from "./Content";
import ExerciseCount from "./ExerciseCount";

const Course = ({ course }) => {
  console.log("course props: ", course);
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <ExerciseCount parts={course.parts} />
    </div>
  );
};

export default Course;
