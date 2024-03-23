import React, { useState } from "react";
import axios from "axios";
import "./Form.css";
import { ToastContainer, toast } from "react-toastify";
import { Link, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import BASE_URL from "../Config/Config";

const Form = () => {
  //   const location = useLocation();
  const navigate = useNavigate();
  const [toggle, setToogle] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function isValidEmail(email) {
    // Regular expression pattern for basic email validation
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  const Signup = async (e) => {
    e.preventDefault();
    try {
      if (isValidEmail(email)) {
        const response = await axios.post(`${BASE_URL}/signup`, {
          name,
          email,
          password,
        });
        if (response.data.success === false) {
          toast.warning(response.data.message);
        } else {
          navigate("/verifyOTP", { state: { email } });
          // toast.success(response.data.message);
        }
        setMessage(response.data.message);
      } else {
        toast.error("Invalid email");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send OTP1");
      setMessage("Failed to send OTP");
    }
  };
  const Login = async () => {
    try {
      if (isValidEmail(email)) {
        const res = await axios.post(`${BASE_URL}/login`, {
          email,
          password,
        });

        if (res.data?.success === true) {
          localStorage.setItem(
            "auth",
            JSON.stringify({
              username: res.data.obj.name,
              email: res.data.obj.email,
              token: res.data.obj.token,
            })
          );
          toast.success("logged in successfully");
        } else {
          toast.error("something went wrong");
        }
      } else {
        toast.error("Invalid email");
      }
    } catch (error) {
      toast.error("User not found");
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container-f">
        <div className="form">
          {!toggle ? <h2>Please Login</h2> : <h2>Create Account</h2>}

          {toggle ? (
            <>
              <label className="title" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                name="name"
                id="name"
              />
            </>
          ) : (
            ""
          )}
          <label className="title" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
            id="email"
          />
          <label className="title" htmlFor="password">
            Password
          </label>
          <div style={{ position: "relative" }}>
            {!showPassword ? (
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="password"
                id="password"
              />
            ) : (
              <input
                type="text"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="password"
                id="visiblepassword"
              />
            )}
            <div
              className="show"
              style={{ position: "absolute", right: "8px", top: "8px" }}
            >
              <a
                style={{ cursor: "pointer" }}
                role="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {!showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
              </a>
            </div>
          </div>

          {toggle ? (
            <button onClick={Signup} className="create-button">
              CREATE ACCOUNT
            </button>
          ) : (
            <button onClick={Login} className="create-button">
              LOGIN ACCOUNT
            </button>
          )}
          {message && <p>{message}</p>}

          <div className="exist">
            <p className="exist">Have an Account?</p>
            {toggle ? (
              <a
                className="login-link"
                href="#"
                onClick={() => {
                  setToogle(!toggle);
                }}
              >
                LOGIN
              </a>
            ) : (
              <a
                className="login-link"
                href="#"
                onClick={() => {
                  setToogle(!toggle);
                }}
              >
                SIGNUP
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
