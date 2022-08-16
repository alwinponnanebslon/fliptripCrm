/**
 * Signin Firebase
 */

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Applogo } from "../Entryfile/imagepath.jsx";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { alphaNumericPattern, emailrgx } from "../constant";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/features/auth/authSlice.js";

const schema = yup.object({
  email: yup.string().matches(emailrgx, "Email is required").required("Email is required").trim(),
  password: yup.string().required("Password is required").trim(),
});

const Loginpage = (props) => {
  const dispatch = useDispatch();
  const [eye, seteye] = useState(true);
  const [emailerror, setEmailError] = useState("");
  const [nameerror, setNameError] = useState("");
  const [passworderror, setPasswordError] = useState("");
  const [formgroup, setFormGroup] = useState("");
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // console.log("data", data);

    if (!data.password) {
      setError("password", {
        message: "Please Enter Password",
      });
    } else {
      clearErrors("password");
      dispatch(loginUser(data));
      // props.history.push('/app/main/dashboard')
    }
  };

  const onEyeClick = () => {
    seteye(!eye);
  };
  return (
    <>
      <Helmet>
        <title>Login - CRM created by Fliptrip</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="account-content">
        {/* <Link to="/applyjob/joblist" className="btn btn-primary apply-btn">
          Apply Job
        </Link> */}
        <div className="container">
          {/* Account Logo */}
          <div className="account-logo">
            <Link to="/app/main/dashboard">
              <img src={Applogo} alt="Dreamguy's Technologies" />
            </Link>
          </div>
          {/* /Account Logo */}
          <div className="account-box">
            <div className="account-wrapper">
              <h3 className="account-title">Login</h3>
              <p className="account-subtitle">Access to our dashboard</p>
              {/* Account Form */}
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label>Email Address</label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field: { value, onChange } }) => <input className={`form-control  ${errors?.email ? "error-input" : ""}`} type="text" value={value} onChange={onChange} autoComplete="false" />}
                    />
                    <small>{errors?.email?.message}</small>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col">
                        <label>Password</label>
                      </div>
                      <div className="col-auto">
                        <Link className="text-muted" to="/forgotpassword">
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <div className="pass-group">
                          <input type={eye ? "password" : "text"} className={`form-control  ${errors?.password ? "error-input" : ""}`} value={value} onChange={onChange} autoComplete="false" />
                          <span onClick={onEyeClick} className={`fa toggle-password" ${eye ? "fa-eye-slash" : "fa-eye"}`} />
                        </div>
                      )}
                    />
                    <small>{errors?.password?.message}</small>
                  </div>
                  <div className="form-group text-center">
                    <button className="btn btn-primary account-btn" type="submit">
                      Login
                    </button>
                  </div>
                </form>
                <div className="account-footer">
                  <p>
                    Don't have an account yet? <Link to="/register">Register</Link>
                  </p>
                </div>
              </div>
              {/* /Account Form */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
