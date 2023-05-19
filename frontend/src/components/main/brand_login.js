import { useFormik } from "formik";
import React from "react";
import app_config from "../../config";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserProvider";

const BrandLogin = () => {
  const url = app_config.apiUrl;
  const navigate = useNavigate();
  const { themeColor, themeColorLight, title } = app_config;
  const {setLoggedIn} = useUserContext();

  const loginform = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const res = await fetch(`${url}/brand/auth`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.status);
      if (res.status === 201) {
        const data = (await res.json()).result;
        // console.log("Login Successful");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Login Successful!!",
        });
        setLoggedIn(true);
        if (data.role === "admin") {
          sessionStorage.setItem("admin", JSON.stringify(data));
          navigate("/admin/dashboard");
        } else {
          sessionStorage.setItem("brand", JSON.stringify(data));
          navigate("/brand/managejob");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Login Failed!!",
        });
      }
    },
  });

  return (
    <div className="login-container">
      <section className="vh-100" style={{ backgroundColor: themeColorLight }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://www.microbizmag.co.uk/wp-content/uploads/2021/03/Influencer_Marketing.jpg"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 px-lg-5 text-black">
                      <form onSubmit={loginform.handleSubmit}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          {/* <i
                      className="fas fa-cubes fa-2x me-3"
                      style={{ color: "#ff6219" }}
                    /> */}
                          <img
                            className="d-block mt-3"
                            style={{ height: 50 }}
                            src="/logo.png"
                            alt=""
                          />
                          &nbsp;&nbsp;&nbsp;
                          <p
                            className="h1 fw-bold m-0"
                            style={{ color: themeColor }}
                          >
                            Brand Login
                          </p>
                        </div>
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: 1 }}
                        >
                          Sign into your account
                        </h5>
                        <div className="d-flex flex-row align-items-center mb-4">
                          {/* <i className="fas fa-envelope fa-lg me-3 fa-fw" /> */}
                          <div className=" flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Your Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              onChange={loginform.handleChange}
                              value={loginform.values.email}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          {/* <i className="fas fa-lock fa-lg me-3 fa-fw" /> */}
                          <div className=" flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              id="password"
                              onChange={loginform.handleChange}
                              value={loginform.values.password}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            style={{ backgroundColor: themeColor }}
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                        <a className="small text-muted" href="#!">
                          Forgot password?
                        </a>
                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Don't have an account?{" "}
                          <Link to="/main/brandsignup" style={{ color: "#393f81" }}>
                            Register here
                          </Link>
                        </p>
                        <a href="#!" className="small text-muted">
                          Terms of use.
                        </a>
                        <a href="#!" className="small text-muted">
                          Privacy policy
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrandLogin;