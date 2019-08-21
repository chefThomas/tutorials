import React from "react";

const Content = ({ parts }) => {
  console.log(parts);

  const renderParts = () => {
    return parts.map(part => {
      return (
        <>
          <p>
            {part.name} {part.exercises}
          </p>
        </>
      );
    });
  };
  //   return parts;
  return <>{renderParts()}</>;
};

export default Content;
