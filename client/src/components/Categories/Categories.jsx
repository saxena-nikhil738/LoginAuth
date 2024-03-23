import React from "react";
import "./Categories.css";
import Pagination from "../Pagination/Pagination";

const Categories = () => {
  const numberOfRecords = 5;
  const category = [
    "Movies",
    "Movies",
    "Movies",
    "Movies",
    "Movies",
    "Movies",
    "Tea",
    "Movies",
    "Movies",
    "Movies",
    "Movies",
    "Movies",
    "Movies",
    "Movies",
    "Movies",
    "Movies",
  ];
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="form-cat">
        <div className="heading">
          <h3>Place mark your interests</h3>
          <h5>We'll keep you notified</h5>
        </div>

        <div className="marks">
          <h4 style={{}}>My saved interests!</h4>

          {/* <div className=""> */}
          {console.log(numberOfRecords)}
          <Pagination e={{ category, numberOfRecords }} />
        </div>
      </div>
    </div>
  );
};

export default Categories;
