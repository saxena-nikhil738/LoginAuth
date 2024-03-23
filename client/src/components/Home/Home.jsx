import React from "react";
import Header from "../Header/Header";
import Form from "../Form/Form";

const Home = () => {
  return (
    <div>
      <div className="container">
        <Header />
        <div
          className="offer"
          style={{ background: "grey", lineHeight: "30px" }}
        >
          Get 10% discount
        </div>
      </div>
    </div>
  );
};

export default Home;
