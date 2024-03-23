import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const Header = () => {
  return (
    <div>
      <div className="head">
        <div className="help">
          <ul className="help">
            <li>Help</li>
            <li>Order & returns</li>
            <li>
              <a href="/login">Login</a>
            </li>
          </ul>
        </div>
        <div className="nav">
          <div className="logo">Ecommerce</div>
          <div className="middle">
            <ul>
              <li>
                <a href="/categories" style={{ textDecoration: "none" }}>
                  Categories
                </a>
              </li>
              <li>
                <a href="" style={{ textDecoration: "none", color: "black" }}>
                  Sales
                </a>
              </li>
              <li>
                <a href="" style={{ textDecoration: "none", color: "black" }}>
                  Clearance
                </a>
              </li>
              <li>
                <a href="" style={{ textDecoration: "none", color: "black" }}>
                  New stock
                </a>
              </li>
              <li>
                <a href="" style={{ textDecoration: "none", color: "black" }}>
                  Trending
                </a>
              </li>
            </ul>
          </div>
          <div className="cart">
            <ul className="cart">
              <li>
                <SearchIcon />
              </li>
              <li>
                <AddShoppingCartIcon />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
